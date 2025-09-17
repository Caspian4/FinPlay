import React from "react";
import { Link } from "react-router-dom";
//import { ThemeContext } from "./ThemeContext";
import "./App.css";

export default function Navbar() {
    //const { darkMode, setDarkMode } = useContext(ThemeContext);

    return (
        <header className="finplay-header">
            <div className="section-title">⚔️ FinPlay</div>
            <nav className="finplay-nav">
                <Link to="/" className="nav-link">Dashboard</Link>
                <Link to="/cards-pro" className="nav-link">Cards</Link>
                <Link to="/jars" className="nav-link">Jars</Link>
                <Link to="/transactions" className="nav-link">Transactions</Link>
                <Link to="/splits" className="nav-link">Splits</Link>
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
