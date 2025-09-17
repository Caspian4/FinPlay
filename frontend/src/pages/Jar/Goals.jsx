import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

// Header Component
const Header = ({ goals }) => {
    return (
        <>
            <h1>🏴‍☠️ Pirate Savings Jars 💰</h1>
            <p className="tagline">
                {goals.length === 0 ? "Start your treasure hunt! Add your first goal 🏴‍☠️💰" : "Your treasure map awaits!"}
            </p>
        </>
    );
};

// Summary Component
const Summary = ({ goals }) => {
    if (goals.length === 0) {
        return null;
    }
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

// GoalForm Component
const GoalForm = ({ addGoal }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !amount || amount <= 0) {
            return;
        }

        if (image) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addGoal({ name, target: parseFloat(amount), saved: 0, image: e.target.result });
            };
            reader.readAsDataURL(image);
        } else {
            addGoal({ name, target: parseFloat(amount), saved: 0, image: null });
        }

        setName('');
        setAmount('');
        setImage(null);
        document.getElementById("goalImage").value = "";
    };

    return (
        <form className="add-goal-section" onSubmit={handleSubmit}>
            <input 
                type="text" 
                id="goalName"
                placeholder="Goal Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="number" 
                id="goalAmount"
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

// Goal Component
const Goal = ({ goal, updateGoal, deleteGoal }) => {
    const [amount, setAmount] = useState('');
    const percent = ((goal.saved / goal.target) * 100).toFixed(1);

    const handleDeposit = () => {
        const depositAmount = parseFloat(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) return;
        updateGoal(goal.id, depositAmount, 'deposit');
        setAmount('');
        animateCoin();
    };

    const handleWithdraw = () => {
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) return;
        updateGoal(goal.id, withdrawAmount, 'withdraw');
        setAmount('');
    };

    const handleDelete = () => {
        deleteGoal(goal.id);
    };

    const animateCoin = () => {
        const chest = document.querySelector(`.goal[data-id="${goal.id}"] .chest`);
        if (!chest) return;

        const coin = document.createElement("div");
        coin.classList.add('floating-coin');
        chest.appendChild(coin);
        setTimeout(() => {
            coin.style.bottom = "0px";
            coin.style.transform = "translateX(-50%) scale(0.5)";
        }, 10);
        setTimeout(() => coin.remove(), 1100);
    };

    return (
        <div className="goal" data-id={goal.id}>
            {goal.image && <img src={goal.image} alt="Goal" />}
            <h2>{goal.name} - {goal.saved}/{goal.target} 🪙 ({percent}%)</h2>
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
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

// Main App Component
const Jar = () => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const vantaEffect = window.VANTA.WAVES({
            el: "#vanta-bg",
            waveHeight: 20,
            waveSpeed: 0.6,
            shininess: 50.0,
            waveColor: 0x0055aa,
            backgroundColor: 0x0a1a2f
        });
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    const addGoal = (newGoal) => {
        setGoals(prevGoals => [...prevGoals, { ...newGoal, id: Date.now() }]);
    };

    const updateGoal = (id, amount, type) => {
        setGoals(prevGoals =>
            prevGoals.map(goal => {
                if (goal.id === id) {
                    let newSaved = goal.saved;
                    if (type === 'deposit') {
                        newSaved = Math.min(goal.target, goal.saved + amount);
                    } else if (type === 'withdraw') {
                        newSaved = Math.max(0, goal.saved - amount);
                    }
                    if (newSaved === goal.target && type === 'deposit') {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#FFD700', '#FF8C00', '#FFFF00']
                        });
                    }
                    return { ...goal, saved: newSaved };
                }
                return goal;
            })
        );
    };

    const deleteGoal = (id) => {
        setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
    };

    return (
        <>
            <div id="vanta-bg"></div>
            <div className="main-container">
                <Header goals={goals} />
                <Summary goals={goals} />
                <div className="goal-container">
                    {goals.map(goal => (
                        <Goal
                            key={goal.id}
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