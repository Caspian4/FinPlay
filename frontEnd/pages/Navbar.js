import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {

    return (
        <header className="finplay-header">
            <div className="finplay-logo">âï¸ FinPlay</div>
            <nav className="finplay-nav" >
                <Link to="/" className="nav-link" >Dashboard</Link>
                <Link to="/cards-pro" className="nav-link">Cards</Link>
                <Link to="/splits" className="nav-link">Splits</Link>
                <Link to="/jars" className="nav-link">Jars</Link>
                <Link to="/dash" className="nav-link">Transactions</Link>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/upi" className="nav-link">UPI Pay</Link>
                
            </nav>

            {/* Theme Toggle Switch 
            <label className="theme-switch">
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider"></span>
            </label>*/}
        </header>
    );
}
