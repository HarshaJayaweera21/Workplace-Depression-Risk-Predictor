from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load trained model
model = joblib.load('models/depression_model.pkl')

# Load scaler
scaler = joblib.load('models/scaler.pkl')

# Load encoders for respective feature encoding
# Label Encoders
le_gender = joblib.load('models/le_gender.pkl') # for Gender feature
le_suicidal = joblib.load('models/le_suicidal.pkl') # for suicidal thoughts feature
le_family = joblib.load('models/le_family.pkl') # for family mental health feature

# Ordinal Encoders
ordinal_dietary = joblib.load('models/ordinal_dietary.pkl') # for dietary habits feature
ordinal_sleep = joblib.load('models/ordinal_sleep.pkl') # for sleep duration feature

# BaseModel from Pydantic:
# Used to define structured input data for the API
# Automatically validates types, required fields, and ensures safe input
class DepressionInput(BaseModel):
    gender: str
    age: int
    work_pressure: int
    job_satisfaction: int
    sleep_duration: str
    dietary_habits: str
    suicidal_thoughts: str
    work_hours: int
    financial_stress: int
    family_mental_health: str

# Initialize FastAPI app
app = FastAPI()

# Enable CORS to allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175", "http://localhost:5174", "http://localhost:5173" ], # React dev server origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint to predict depression risk
@app.post("/predict")
def predict(data: DepressionInput):

    # Encode categorical variables using saved label encoders
    gender_encoded = le_gender.transform([data.gender])[0]
    suicidal_encoded = le_suicidal.transform([data.suicidal_thoughts])[0]
    family_encoded = le_family.transform([data.family_mental_health])[0]

    # Encode ordinal features using saved ordinal encoders
    dietary_encoded = ordinal_dietary.transform(pd.DataFrame([[data.dietary_habits]], columns=['Dietary Habits']))[0][0]
    sleep_encoded = ordinal_sleep.transform(pd.DataFrame([[data.sleep_duration]], columns=['Sleep Duration']))[0][0]

    # Create a DataFrame for the new input to match training format
    new_data = {
        'Gender': gender_encoded,
        'Age': data.age,
        'Work Pressure': data.work_pressure,
        'Job Satisfaction': data.job_satisfaction,
        'Sleep Duration': sleep_encoded,
        'Dietary Habits': dietary_encoded,
        'Suicidal Thoughts': suicidal_encoded,
        'Work Hours': data.work_hours,
        'Financial Stress': data.financial_stress,
        'Family Mental Health': family_encoded
    }

    df = pd.DataFrame([new_data])

    # Scale the numerical features using the saved StandardScaler
    scaling_cols = ['Age', 'Work Hours', 'Work Pressure', 'Job Satisfaction',
                  'Sleep Duration', 'Dietary Habits', 'Financial Stress']
    df[scaling_cols] = scaler.transform(df[scaling_cols])

    # Get predicted probability of depression
    prob = model.predict_proba(df)[:,1][0]
    percent = prob * 100

    # Function to categorize risk level based on probability
    def risk_level(a):
        if a >= 0.9:
            return "Very High Risk"
        elif a >= 0.75:
            return "High Risk"
        elif a >= 0.5:
            return "Moderate Risk"
        else:
            return "Low Risk"

    t_hold = risk_level(prob)

    # Return JSON response with risk level and probability
    return {
        "risk level": t_hold,
        "percentage": round(percent, 2)
    }

