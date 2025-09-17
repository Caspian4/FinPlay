import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
//import {ThemeProvider} from "./ThemeContext";
import Navbar from "./Navbar";
import Dashboard from "./pages/Dashboard/DashBoard";
import CardsPro from "./pages/Card/CardsPro";
import Transactions from "./pages/Transaction/Transaction";
import UpiPay from "./pages/Upi/upi";
import Login from "./pages/Login/login";
import Splits from "./pages/Splits/splits";
import Jar from "./pages/Jar/Goals";


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
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/upi" element={<UpiPay />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/splits" element={<Splits />} />
                    <Route path="/jars" element={<Jar />} />
                </Routes>
            </main>
        </BrowserRouter>
        
    );
}
