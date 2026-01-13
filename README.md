# 🧠 Workplace Depression Risk Predictor

*A machine learning–powered web application for early identification of workplace depression risk.*

---

## 📸 Application Interface

### 📝 Input Form

<img width="700" alt="Screenshot 2026-01-13 013950" src="https://github.com/user-attachments/assets/2e51bef7-28a2-44cf-be8b-c67f7a7b6dda" />
<img width="700" alt="Screenshot 2026-01-13 014017" src="https://github.com/user-attachments/assets/e5d91cfa-176b-4c34-8259-4fa24411fd0f" />

### 📊 Prediction Result

<img width="700" alt="Screenshot 2026-01-13 014354" src="https://github.com/user-attachments/assets/6b2c79fd-8a68-4a95-bc6e-4e2ce14e61ac" />

---

## 📌 Overview

This project presents a machine learning–based system to predict **workplace depression risk** using anonymized demographic, lifestyle, and work-related survey data. The primary objective is to identify employees who may be at risk of depression at an early stage, enabling **timely and proactive interventions**.

By leveraging supervised **binary classification**, the system analyzes factors such as:

- Work pressure  
- Job satisfaction  
- Sleep duration  
- Dietary habits  
- Financial stress  
- Work hours  
- Family mental health history  

The model outputs a **risk classification** along with a **probability score**, supporting ethical and informed decision-making to improve employee well-being.

---

## 🎯 Problem Motivation

Depression in the workplace often remains undetected until it significantly affects:

- Employee productivity  
- Absenteeism  
- Job performance  
- Staff turnover  

This project addresses a critical gap in **occupational health psychology** by providing a **data-driven and interpretable** solution for early risk detection. The system is designed for integration into **HR analytics platforms** or **Employee Assistance Programs (EAPs)**, with strong emphasis on:

- Ethical handling of sensitive data  
- Fairness and bias awareness  
- Practical deployment readiness  

---

## 🧪 Machine Learning Approach

- **Model:** Logistic Regression  
- **Problem Type:** Binary Classification  
- **Target Variable:** Depression Risk (Yes / No)  

### Why Logistic Regression?

- High interpretability for healthcare-related use cases  
- Produces meaningful probability estimates  
- Lower risk of overfitting compared to complex models  
- Suitable for ethical and transparent decision support systems  

---

## 🔧 Data Preprocessing

The following preprocessing techniques are applied consistently during training and inference:

- Label Encoding for binary categorical features  
- Ordinal Encoding for ordered categorical variables  
- Feature scaling using `StandardScaler`  
- Unified preprocessing pipeline to ensure prediction consistency  

---

## 🏗️ System Architecture

This project follows a **full-stack architecture**:

### 🔹 Backend — FastAPI
- Serves the trained ML model through an API
- Handles preprocessing, validation, and inference
- Technologies used:
  - Python
  - FastAPI
  - scikit-learn
  - Pydantic

### 🔹 Frontend — React
- Interactive web interface for entering employee data
- Displays depression risk classification and probability
- Technologies used:
  - React
  - Vite
  - JavaScript
  - CSS

---

## 📁 Project Structure

```text
Workplace-Depression-Risk-Predictor/
│
├── predictor-api/          # FastAPI backend
│   ├── main.py
│   ├── models/
│   ├── requirements.txt
│   └── .gitignore
│
├── predictor-ui/           # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── dataset/                # Dataset used for training
├── notebooks/              # Model training & evaluation notebook
└── README.md
```
---

## ▶️ How to Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/HarshaJayaweera21/Workplace-Depression-Risk-Predictor.git
cd Workplace-Depression-Risk-Predictor
```

### 2️⃣ Run the Predictor API (FastAPI)

```bash
cd predictor-api
python -m venv .venv
.venv\Scripts\activate      # On Windows
# source .venv/bin/activate # On Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```
- Backend will be available at: http://127.0.0.1:8000

### 3️⃣ Run the Predictor UI (React)

```bash
cd predictor-ui
npm install
npm run dev
```
- Frontend will be available at: http://localhost:5173

---
### ⚠️ Ethical Considerations

- This system **does not diagnose depression**  
- Predictions are **probabilistic** and intended for **early risk awareness only**  
- Designed to **support human decision-making**, not replace it  
- Emphasizes **fairness, transparency, and responsible use** of mental health data

