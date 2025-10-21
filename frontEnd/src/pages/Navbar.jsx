import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {

    return (
        <header className="finplay-header">
            <div className="finplay-logo">{'\uD83D\uDCB0'} FinPlay</div>
            <nav className="finplay-nav" >
                <Link to="/" className="nav-link" >Dashboard</Link>
                <Link to="/cards-pro" className="nav-link">Cards</Link>
                <Link to="/splits" className="nav-link">Splits</Link>
                <Link to="/jars" className="nav-link">Jars</Link>
                <Link to="/dash" className="nav-link">Transactions</Link>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/upi" className="nav-link">UPI Pay</Link>
                <Link to="/logout" className="nav-link">Logout</Link>
                
            </nav>

        </header>
    );
}
