// /pages/dashboard/Dashboard.js
import { useEffect, useState } from "react";
import "/src/App.css"; 

export default function Dashboard() {
    const [theme, setTheme] = useState("light"); // default theme

    // Apply theme class to <html>
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    // Example dashboard data
    const stats = { income: 120000, expenses: 68000, savings: 52000 };
    const recentVoyages = [
        { id: 1, title: "Grog & Supplies", category: "Food & Beverage", amount: -1200, date: "9/9/2025" },
        { id: 2, title: "Crew Payment", category: "Transfers", amount: -5500, date: "9/9/2025" },
        { id: 3, title: "Side Quest Income", category: "Income", amount: 8500, date: "9/9/2025" },
    ];
    const expenseRations = [
        { category: "Food & Beverage", amount: 12000, percentage: 18 },
        { category: "Transport", amount: 8000, percentage: 12 },
        { category: "Shopping", amount: 15000, percentage: 22 },
        { category: "Bills & Utilities", amount: 18000, percentage: 26 },
        { category: "Entertainment", amount: 15000, percentage: 22 },
    ];

    return (
        <div className="finplay-container">
            {/* Theme Toggle */}
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>


            {/* Hero Section */}
            <main className="dashboard-main">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Loot the seas but bury your savings.</h1>
                        <p className="hero-subtitle">
                            Turn every expense, saving, and payment into collectible pirate cards.
                            Fill your treasure chests, weather the storms, and chart your path to financial freedom.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn-primary">⚓ Set Sail</button>
                            <button className="btn-secondary">🗺️ View Your Cards</button>
                        </div>
                    </div>

                    <div className="hero-cards">
                        <div className="preview-card treasure">
                            <div className="card-icon">💰</div>
                            <div className="card-title">Treasure Chest</div>
                            <div className="card-label">Savings</div>
                        </div>
                        <div className="preview-card storm">
                            <div className="card-icon">⛈️</div>
                            <div className="card-title">Storm Card</div>
                            <div className="card-label">Expenses</div>
                        </div>
                        <div className="preview-card artifact">
                            <div className="card-icon">🏆</div>
                            <div className="card-title">Artifact</div>
                            <div className="card-label">Achievements</div>
                        </div>
                    </div>
                </section>

                {/* Ship's Ledger */}
                <section className="ledger-section">
                    <h2>⚓ Ship's Ledger</h2>
                    <div className="ledger-cards">
                        <div className="ledger-card income">
                            <div className="ledger-label">💰 Income</div>
                            <div className="ledger-value">₹{stats.income.toLocaleString()}</div>
                        </div>
                        <div className="ledger-card expenses">
                            <div className="ledger-label">⛈️ Expenses</div>
                            <div className="ledger-value">₹{stats.expenses.toLocaleString()}</div>
                        </div>
                        <div className="ledger-card savings">
                            <div className="ledger-label">🏴‍☠️ Savings</div>
                            <div className="ledger-value">₹{stats.savings.toLocaleString()}</div>
                        </div>
                    </div>
                </section>

                {/* Two Column Layout */}
                <div className="dashboard-columns">
                    {/* Recent Voyages */}
                    <section className="recent-voyages">
                        <h3>🚢 Recent Voyages</h3>
                        <div className="voyages-list">
                            {recentVoyages.map((voyage) => (
                                <div key={voyage.id} className="voyage-item">
                                    <div className="voyage-info">
                                        <div className="voyage-title">{voyage.title}</div>
                                        <div className="voyage-category">
                                            {voyage.category} • {voyage.date}
                                        </div>
                                    </div>
                                    <div className={`voyage-amount ${voyage.amount < 0 ? "negative" : "positive"}`}>
                                        {voyage.amount < 0 ? "-" : "+"}₹{Math.abs(voyage.amount).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Expense Rations */}
                    <section className="expense-rations">
                        <h3>📊 Expense Rations</h3>
                        <div className="rations-list">
                            {expenseRations.map((item, index) => (
                                <div key={index} className="ration-item">
                                    <div className="ration-info">
                                        <div className="ration-category">{item.category}</div>
                                        <div className="ration-bar">
                                            <div className="ration-fill" style={{ width: `${item.percentage}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="ration-amount">
                                        ₹{item.amount.toLocaleString()} ({item.percentage}%)
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
