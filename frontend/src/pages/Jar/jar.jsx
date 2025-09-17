import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import axios from "axios";
import * as THREE from "three";
import "./App.css";

const BASE_URL = "http://localhost:3000/api/jars"; // ✅ Correct backend endpoint

const Header = ({ goals }) => (
    <>
        <h1>🏴‍☠️ Pirate Savings Jars 💰</h1>
        <p className="tagline">
            {goals.length === 0
                ? "Start your treasure hunt! Add your first goal 🏴‍☠️💰"
                : "Your treasure map awaits!"}
        </p>
    </>
);

const Summary = ({ goals }) => {
    if (goals.length === 0) return null;
    const totalSaved = goals.reduce((acc, goal) => acc + goal.saved, 0);
    const totalTarget = goals.reduce((acc, goal) => acc + goal.target, 0);
    return (
        <div className="dashboard-summary">
            <div className="summary-card">
                <h3>Total Goals</h3>
                <p>{goals.length}</p>
            </div>
            <div className="summary-card">
                <h3>Total Saved</h3>
                <p>{totalSaved} 🪙</p>
            </div>
            <div className="summary-card">
                <h3>Total Remaining</h3>
                <p>{totalTarget - totalSaved} 🪙</p>
            </div>
        </div>
    );
};

const GoalForm = ({ addGoal }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !amount || amount <= 0) return;

        const goalData = { name, target: parseFloat(amount), saved: 0, image: null };

        if (image) {
            const reader = new FileReader();
            reader.onload = (e) => addGoal({ ...goalData, image: e.target.result });
            reader.readAsDataURL(image);
        } else {
            addGoal(goalData);
        }

        setName("");
        setAmount("");
        setImage(null);
        document.getElementById("goalImage").value = "";
    };

    return (
        <form className="add-goal-section" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Goal Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Target Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
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

const Goal = ({ goal, updateGoal, deleteGoal }) => {
    const [amount, setAmount] = useState("");
    const percent = ((goal.saved / goal.target) * 100).toFixed(1);

    const handleDeposit = () => {
        const depositAmount = parseFloat(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) return;
        updateGoal(goal._id, depositAmount, "deposit");
        setAmount("");
    };

    const handleWithdraw = () => {
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) return;
        updateGoal(goal._id, withdrawAmount, "withdraw");
        setAmount("");
    };

    return (
        <div className="goal" data-id={goal._id}>
            {goal.image && <img src={goal.image} alt="Goal" />}
            <h2>
                {goal.title} - {goal.saved}/{goal.target} 🪙 ({percent}%)
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
                <button onClick={handleDeposit}>Deposit</button>
                <button onClick={handleWithdraw}>Withdraw</button>
                <button onClick={() => deleteGoal(goal._id)}>Delete</button>
            </div>
        </div>
    );
};

const Jar = () => {
    const [goals, setGoals] = useState([]);
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    // Load VANTA background
    useEffect(() => {
        if (!vantaEffect.current) {
            vantaEffect.current = WAVES({
                el: vantaRef.current,
                THREE: THREE,
                waveHeight: 20,
                waveSpeed: 0.6,
                shininess: 50.0,
                waveColor: 0x0055aa,
                backgroundColor: 0x0a1a2f,
            });
        }
        return () => {
            if (vantaEffect.current) vantaEffect.current.destroy();
        };
    }, []);

    // Fetch goals from backend
    useEffect(() => {
        axios
            .get(BASE_URL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => setGoals(res.data))
            .catch((err) => console.error("Error fetching goals:", err));
    }, []);

    // Add goal
    const addGoal = async (newGoal) => {
        try {
            const res = await axios.post(
                BASE_URL,
                {
                    title: newGoal.name,
                    target: newGoal.target,
                    deadline: new Date(),
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setGoals((prevGoals) => [...prevGoals, res.data]);
        } catch (err) {
            console.error("Error adding goal:", err);
        }
    };

    // Update goal
    const updateGoal = async (id, amount, type) => {
        try {
            const res = await axios.patch(
                `${BASE_URL}/${id}/contribute`,
                { amount, type },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setGoals((prevGoals) =>
                prevGoals.map((goal) => (goal._id === id ? res.data : goal))
            );
            if (res.data.saved === res.data.target && type === "deposit") {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#FFD700", "#FF8C00", "#FFFF00"],
                });
            }
        } catch (err) {
            console.error("Error updating goal:", err);
        }
    };

    // Delete goal
    const deleteGoal = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== id));
        } catch (err) {
            console.error("Error deleting goal:", err);
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
                        <Goal
                            key={goal._id}
                            goal={goal}
                            updateGoal={updateGoal}
                            deleteGoal={deleteGoal}
                        />
                    ))}
                </div>
                <GoalForm addGoal={addGoal} />
            </div>
        </>
    );
};

export default Jar;
