// /pages/dashboard/Dashboard.js
import { useEffect, useState } from "react";
import "/App.css"; 
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const API=process.env.REACT_APP_API
  const [theme, setTheme] = useState("light"); // default theme
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // â Fetch transactions from backend (Option 1: full URL)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo")); // â
        const token = userInfo?.token;
          const res = await axios.get(`${ API }/api/transactions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

        
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // â Calculate stats dynamically
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = income - expenses;

  // â Expense categories
  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const totalExpense = Object.values(expenseByCategory).reduce(
    (sum, val) => sum + val,
    0
  );

  const expenseRations = Object.entries(expenseByCategory).map(
    ([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / totalExpense) * 100).toFixed(1),
    })
  );

  return (
    <div className="finplay-container">
    

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
  <Link to="/dash" className="btn-primary">
    â Set Sail
  </Link>
  <Link to="/cards-pro" className="btn-secondary">
    ðºï¸ View Your Cards
  </Link>
</div>
          </div>

          <div className="hero-cards">
            <div className="preview-card treasure">
              <div className="card-icon">ð°</div>
              <div className="card-title">Treasure Chest</div>
              <div className="card-label">Savings</div>
            </div>
            <div className="preview-card storm">
              <div className="card-icon">âï¸</div>
              <div className="card-title">Storm Card</div>
              <div className="card-label">Expenses</div>
            </div>
            <div className="preview-card artifact">
              <div className="card-icon">ð</div>
              <div className="card-title">Artifact</div>
              <div className="card-label">Achievements</div>
            </div>
          </div>
        </section>

        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <>
            {/* Ship's Ledger */}
            <section className="ledger-section">
              <h2>â Ship's Ledger</h2>
              <div className="ledger-cards">
                <div className="ledger-card income">
                  <div className="ledger-label">ð° Income</div>
                  <div className="ledger-value">â¹{income.toLocaleString()}</div>
                </div>
                <div className="ledger-card expenses">
                  <div className="ledger-label">âï¸ Expenses</div>
                  <div className="ledger-value">â¹{expenses.toLocaleString()}</div>
                </div>
                <div className="ledger-card savings">
                  <div className="ledger-label">ð´ââ ï¸ Savings</div>
                  <div className="ledger-value">â¹{savings.toLocaleString()}</div>
                </div>
              </div>
            </section>

            {/* Two Column Layout */}
            <div className="dashboard-columns">
              {/* Recent Voyages */}
              <section className="recent-voyages">
                <h3>ð¢ Recent Voyages</h3>
                <div className="voyages-list">
                  {transactions.slice(0, 5).map((voyage) => (
                    <div key={voyage._id} className="voyage-item">
                      <div className="voyage-info">
                        <div className="voyage-title">{voyage.description}</div>
                        <div className="voyage-category">
                          {voyage.category} â¢{" "}
                          {new Date(voyage.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div
                        className={`voyage-amount ${
                          voyage.type === "expense" ? "negative" : "positive"
                        }`}
                      >
                        {voyage.type === "expense" ? "-" : "+"}â¹
                        {voyage.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Expense Rations */}
              <section className="expense-rations">
                <h3>ð Expense Rations</h3>
                <div className="rations-list">
                  {expenseRations.map((item, index) => (
                    <div key={index} className="ration-item">
                      <div className="ration-info">
                        <div className="ration-category">{item.category}</div>
                        <div className="ration-bar">
                          <div
                            className="ration-fill"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ration-amount">
                        â¹{item.amount.toLocaleString()} ({item.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
