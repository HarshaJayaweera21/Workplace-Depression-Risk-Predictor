import {
    User, Briefcase, Moon, HeartPulse, Brain,
    Meh, AlertTriangle, ChevronDown, Smile
} from 'lucide-react'
import './App.css'
import reactLogo from './assets/react.svg'
import React, {useState} from "react";

function App() {

    // state variables for all inputs
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [workPressure, setWorkPressure] = useState('')
    const [jobSatisfaction, setJobSatisfaction] = useState('')
    const [sleepDuration, setSleepDuration] = useState('')
    const [dietaryHabits, setDietaryHabits] = useState('')
    const [suicidalThoughts, setSuicidalThoughts] = useState('')
    const [workHours, setWorkHours] = useState('')
    const [financialStress, setFinancialStress] = useState('')
    const [familyMentalHealth, setFamilyMentalHealth] = useState('')

    const [prediction, setPrediction] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [toast, setToast] = useState({ show: false, message: '' })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowModal(true);
        setPrediction(null);

        const requestData = {
            gender,
            age: Number(age),
            work_pressure: Number(workPressure),
            job_satisfaction: Number(jobSatisfaction),
            sleep_duration: sleepDuration,
            dietary_habits: dietaryHabits,
            suicidal_thoughts: suicidalThoughts,
            work_hours: Number(workHours),
            financial_stress: Number(financialStress),
            family_mental_health: familyMentalHealth
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            setPrediction({
                riskLevel: data["risk level"],
                percentage: data.percentage
            });

        } catch (error) {
            console.error("Error calling API:", error);
            // Show toast notification instead of dummy data
            setShowModal(false);
            setToast({ show: true, message: 'Failed to get prediction from backend !' });
            // Auto-hide toast after 5 seconds
            setTimeout(() => {
                setToast({ show: false, message: '' });
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid =
        gender && age && workPressure && jobSatisfaction &&
        sleepDuration && dietaryHabits && suicidalThoughts &&
        workHours && financialStress && familyMentalHealth;

    const getRiskDetails = (level) => {
        switch (level) {
            case "Low Risk":
                return { color: "#22c55e", icon: <Smile size={48} />, label: "Low Risk", description: "Your mental health indicators appear stable." };
            case "Moderate Risk":
                return { color: "#eab308", icon: <Meh size={48} />, label: "Moderate Risk", description: "Some indicators suggest stress, Consider proactive care." };
            case "High Risk":
            case "Very High Risk":
            default:
                return { color: "#ef4444", icon: <AlertTriangle size={48} />, label: "Very High Risk", description: "Urgent attention recommended, Please seek help immediately." };
        }
    };

    // Generate multiple background icons using a GRID system
    const floatingIcons = React.useMemo(() => {

        return Array.from({ length: 10 }).map((_, i) => {

            // Size range
            const size = Math.random() * (140 - 90) + 90;

            // Even Grid Logic: 5 Columns x 2 Rows for 10 items
            const cols = 5;
            const col = i % cols;
            const row = Math.floor(i / cols);


            const baseLeft = (col * 20) + 2;

            const baseTop = (row * 35) + 25;

            // Restrict random movement to stay within cell
            const randomLeft = baseLeft + Math.random() * 10;
            const randomTop = baseTop + Math.random() * 20;

            const style = {
                left: `${randomLeft}vw`,
                top: `${randomTop}vh`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${Math.random() * 2 + 2.5}s`,
                animationDelay: `${Math.random() * -3}s`,
                opacity: 0.12,
                filter: 'brightness(0) saturate(100%) invert(37%) sepia(96%) saturate(2592%) hue-rotate(256deg) brightness(91%) contrast(101%)' // True purple filter
            };

            return (
                <img
                    key={i}
                    src={reactLogo}
                    className="float-icon float-brain"
                    alt=""
                    style={style}
                />
            );
        });
    }, []);

    return (
        <div className="app-container">
            {/* Multiple Floating Background Icons */}
            <div className="floating-background">
                {floatingIcons}
            </div>

            {/* Header */}
            <header className="app-header">
                <div className="logo">
                    <HeartPulse color="#6366f1" size={32} />
                    <span>MindCheck</span>
                </div>

                <h1 className="gradient-title">WORKPLACE DEPRESSION RISK PREDICTOR</h1>
                <p className="subtitle">
                    This tool estimates mental health risk based on workplace and lifestyle factors,
                    Your responses remain private and confidential.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="main-form">

                {/* Section 1: Personal Information */}
                <div className="form-section">
                    <div className="section-header">
                        <User size={20} />
                        <h3>PERSONAL INFORMATION</h3>
                    </div>
                    <div className="grid-2">
                        <div className="input-group">
                            <label>Gender</label>
                            <div className="select-wrapper">
                                <select value={gender} onChange={e => setGender(e.target.value)}>
                                    <option value="" disabled hidden>Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <ChevronDown className="select-icon" size={16} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Age</label>
                            <input type="number" min="17" max="70" placeholder="17-70"
                                   value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Section 2: Work Environment */}
                <div className="form-section">
                    <div className="section-header">
                        <Briefcase size={20} />
                        <h3>WORK ENVIRONMENT</h3>
                    </div>
                    <div className="grid-2">
                        <div className="input-group">
                            <label>Work Pressure (1-5)</label>
                            <input type="number" min="1" max="5" placeholder="1-5"
                                   value={workPressure} onChange={e => setWorkPressure(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Job Satisfaction (1-5)</label>
                            <input type="number" min="1" max="5" placeholder="1-5"
                                   value={jobSatisfaction} onChange={e => setJobSatisfaction(e.target.value)} />
                        </div>
                        <div className="input-group full-width">
                            <label>Work Hours Per Day</label>
                            <input type="number" min="0" max="24" placeholder="e.g., 8"
                                   value={workHours} onChange={e => setWorkHours(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Section 3: Lifestyle Factors */}
                <div className="form-section">
                    <div className="section-header">
                        <Moon size={20} />
                        <h3>LIFESTYLE FACTORS</h3>
                    </div>
                    <div className="grid-2">
                        <div className="input-group">
                            <label>Sleep Duration</label>
                            <div className="select-wrapper">
                                <select value={sleepDuration} onChange={e => setSleepDuration(e.target.value)}>
                                    <option value="" disabled hidden>Select hours</option>
                                    <option value="Less than 5 hours">Less than 5 hours</option>
                                    <option value="5-6 hours">5-6 hours</option>
                                    <option value="7-8 hours">7-8 hours</option>
                                    <option value="More than 8 hours">More than 8 hours</option>
                                </select>
                                <ChevronDown className="select-icon" size={16} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Dietary Habits</label>
                            <div className="select-wrapper">
                                <select value={dietaryHabits} onChange={e => setDietaryHabits(e.target.value)}>
                                    <option value="" disabled hidden>Select habits</option>
                                    <option value="Healthy">Healthy</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Unhealthy">Unhealthy</option>
                                </select>
                                <ChevronDown className="select-icon" size={16} />
                            </div>
                        </div>
                        <div className="input-group full-width">
                            <label>Financial Stress (1-5)</label>
                            <input type="number" min="1" max="5" placeholder="1-5"
                                   value={financialStress} onChange={e => setFinancialStress(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Section 4: Health & Family */}
                <div className="form-section">
                    <div className="section-header">
                        <HeartPulse size={20} />
                        <h3>HEALTH & FAMILY</h3>
                    </div>
                    <div className="grid-2">
                        <div className="input-group">
                            <label>Family Mental Health History ?</label>
                            <div className="select-wrapper">
                                <select value={familyMentalHealth} onChange={e => setFamilyMentalHealth(e.target.value)}>
                                    <option value="" disabled hidden>Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                <ChevronDown className="select-icon" size={16} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Had Suicidal Thoughts ?</label>
                            <div className="select-wrapper">
                                <select value={suicidalThoughts} onChange={e => setSuicidalThoughts(e.target.value)}>
                                    <option value="" disabled hidden>Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                <ChevronDown className="select-icon" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={!isFormValid || loading} className="submit-btn">
                    {loading ? "Processing..." : "Predict Risk"}
                </button>
            </form>

            <p className="crisis-note">
                If you're in crisis, please contact a mental health helpline in your area.
            </p>

            {/* Modal Overlay */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {loading ? (
                            <div className="loading-state">
                                <Brain className="spinning-brain" size={64} color="#6366f1" />
                                <p>Analyzing your data...</p>
                            </div>
                        ) : prediction && (
                            <div className="result-state">
                                {(() => {
                                    const details = getRiskDetails(prediction.riskLevel);
                                    return (
                                        <>
                                            <div className="risk-icon" style={{ color: details.color }}>
                                                {details.icon}
                                            </div>
                                            <h2 style={{ color: details.color }}>{prediction.riskLevel}</h2>
                                            <p className="risk-desc">{details.description}</p>

                                            <div className="risk-meter-container">
                                                <div className="risk-bar-bg">
                                                    <div className="risk-bar-fill"
                                                         style={{
                                                             height: `${prediction.percentage}%`,
                                                             backgroundColor: details.color
                                                         }}>
                                                    </div>
                                                </div>
                                                <span className="risk-percentage">{prediction.percentage}%</span>
                                            </div>

                                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                                Close
                                            </button>
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast.show && (
                <div className="toast-notification">
                    <AlertTriangle size={20} />
                    <span>{toast.message}</span>
                </div>
            )}

        </div>
    )
}

export default App
