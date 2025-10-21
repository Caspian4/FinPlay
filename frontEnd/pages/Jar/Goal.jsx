import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import axios from "axios";
import "./App.css";

const API = process.env.REACT_APP_API;
const BASE_URL = `${API}/api/jars`;

// Header Component
const Header = ({ goals }) => (
    <>
        <h1>ð´ââ ï¸ Pirate Savings Jars ð°</h1>
        <p className="tagline">
            {goals.length === 0
                ? "Start your treasure hunt! Add your first goal ð´ââ ï¸ð°"
                : "Your treasure map awaits!"}
        </p>
    </>
);

// Summary Component
const Summary = ({ goals }) => {
    if (!goals.length) return null;

    const totalSaved = goals.reduce((acc, goal) => acc + goal.currentAmount, 0);
    const totalTarget = goals.reduce((acc, goal) => acc + goal.goalAmount, 0);

    return (
        <div className="dashboard-summary">
            <div className="summary-card">
                <h3>Total Goals</h3>
                <p>{goals.length}</p>
            </div>
            <div className="summary-card">
                <h3>Total Saved</h3>
                <p>{totalSaved} ðª</p>
            </div>
            <div className="summary-card">
                <h3>Total Remaining</h3>
                <p>{totalTarget - totalSaved} ðª</p>
            </div>
        </div>
    );
};

// Goal Form Component
const GoalForm = ({ addGoal }) => {
    const [title, setTitle] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [category, setCategory] = useState("saving");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !goalAmount || goalAmount <= 0) return;

        const goalData = {
            title,
            goalAmount: parseFloat(goalAmount),
            currentAmount: 0,
            category,
            image: null,
        };

        if (image) {
            const reader = new FileReader();
            reader.onload = (event) => {
                addGoal({ ...goalData, image: event.target.result });
            };
            reader.readAsDataURL(image);
        } else {
            addGoal(goalData);
        }

        setTitle("");
        setGoalAmount("");
        setCategory("saving");
        setImage(null);
        const fileInput = document.getElementById("goalImage");
        if (fileInput) fileInput.value = "";
    };

    return (
        <form className="add-goal-section" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Goal Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Target Amount"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="saving">Saving</option>
                <option value="investment">Investment</option>
                <option value="achievement">Achievement</option>
            </select>
            <input
                type="file"
                id="goalImage"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Add Goal</button>
        </form>
    );
};

// Goal Component
const Goal = ({ goal, updateGoal, deleteGoal }) => {
    const [amount, setAmount] = useState("");
    const percent = ((goal.currentAmount / goal.goalAmount) * 100).toFixed(1);

    const handleDeposit = () => {
        const depositAmount = parseFloat(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) return;
        updateGoal(goal._id, depositAmount);
        setAmount("");
    };

    return (
        <div className="goal" data-id={goal._id}>
            {goal.image && <img src={goal.image} alt="Goal" />}
            <h2>
                {goal.title} - {goal.currentAmount}/{goal.goalAmount} ðª ({percent}%)
            </h2>
            <div className="chest">
                <div className="coins" style={{ height: `${percent}%` }}></div>
            </div>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${percent}%` }}></div>
            </div>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <div className="goal-actions">
                <button type="button" onClick={handleDeposit}>
                    Deposit
                </button>
                <button type="button" onClick={() => deleteGoal(goal._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

// Main Jar Component
const Jar = () => {
    const [goals, setGoals] = useState([]);
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    // Retrieve token from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    // Initialize Vanta Waves background
    useEffect(() => {
        if (!vantaEffect.current && vantaRef.current) {
            vantaEffect.current = WAVES({
                el: vantaRef.current,
                THREE,
                waveHeight: 20,
                waveSpeed: 0.6,
                shininess: 50.0,
                waveColor: 0x0055aa,
                backgroundColor: 0x0a1a2f,
            });
        }
        return () => vantaEffect.current && vantaEffect.current.destroy();
    }, []);

    // Fetch goals from backend
    useEffect(() => {
        if (!token) return console.error("No token found");

        const fetchGoals = async () => {
            try {
                const res = await axios.get(BASE_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Goals fetched:", res.data);
                setGoals(res.data);
            } catch (err) {
                console.error("Error fetching goals:", err.response?.data || err.message);
            }
        };

        fetchGoals();
    }, [token]);

    const addGoal = async (newGoal) => {
        try {
            const res = await axios.post(BASE_URL, newGoal, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals((prev) => [...prev, res.data]);
        } catch (err) {
            console.error("Error adding goal:", err.response?.data || err.message);
        }
    };

    const updateGoal = async (id, amount) => {
        try {
            const res = await axios.patch(`${BASE_URL}/${id}/contribute`, { amount }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals((prev) => prev.map((goal) => (goal._id === id ? res.data : goal)));

            // Trigger confetti if goal is completed
            if (res.data.currentAmount >= res.data.goalAmount) {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        } catch (err) {
            console.error("Error updating goal:", err.response?.data || err.message);
        }
    };

    const deleteGoal = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals((prev) => prev.filter((goal) => goal._id !== id));
        } catch (err) {
            console.error("Error deleting goal:", err.response?.data || err.message);
        }
    };

    return (
        <>
            <div ref={vantaRef} id="vanta-bg"></div>
            <div className="main-container">
                <Header goals={goals} />
                <Summary goals={goals} />
                <div className="goal-container">
                    {goals.map((goal) => (
                        <Goal key={goal._id} goal={goal} updateGoal={updateGoal} deleteGoal={deleteGoal} />
                    ))}
                </div>
                <GoalForm addGoal={addGoal} />
            </div>
        </>
    );
};

export default Jar;
