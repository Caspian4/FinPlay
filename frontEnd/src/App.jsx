import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
//import {ThemeProvider} from "./ThemeContext";
import Navbar from "./pages/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import CardsPro from "./pages/card/CardsPro";
import Transactions from "./pages/Transaction/Transaction";
import UpiPay from "./pages/upi/UpiPay";
import Login from "./pages/login/login";
import Splits from "./pages/splits/splits";
import Jar from "./pages/Jar/Goal";
import Logout from "./pages/login/logout";

export default function App() {
    const [theme, setTheme] = useState("light");
    
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (

        <BrowserRouter>
            <Navbar theme={theme} setTheme={setTheme} />
            <main>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/cards-pro" element={<CardsPro />} />
                    <Route path="/dash" element={<Transactions />} />
                    <Route path="/upi" element={<UpiPay />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/splits" element={<Splits />} />
                    <Route path="/jars" element={<Jar />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>
        </BrowserRouter>

    );
}