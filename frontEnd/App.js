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


export default function App() {
    const [theme, setTheme] = useState("light");
    {/*useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.180.0/three.tsl.js";
        script.integrity =
            "sha512-pVsOWriwN/5X/FWYhtqqQLnD+3cm8W1YqGrNrfkKgp+GMykFl7fZ0vorWpckUlZOVIG1tNVnI3D7T8DSea5TQg==";
        script.crossOrigin = "anonymous";
        script.referrerPolicy = "no-referrer";
        script.async = true;

        document.body.appendChild(script);

       
          
script.onload = () => {
                    console.log("Three.js loaded:", window.THREE);
                };

            return () => {
                document.body.removeChild(script);
            };
        }, []);*/}
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
                </Routes>
            </main>
        </BrowserRouter>

    );
}import { BrowserRouter, Routes, Route } from "react-router-dom";
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


export default function App() {
    const [theme, setTheme] = useState("light");
    {/*useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.180.0/three.tsl.js";
        script.integrity =
            "sha512-pVsOWriwN/5X/FWYhtqqQLnD+3cm8W1YqGrNrfkKgp+GMykFl7fZ0vorWpckUlZOVIG1tNVnI3D7T8DSea5TQg==";
        script.crossOrigin = "anonymous";
        script.referrerPolicy = "no-referrer";
        script.async = true;

        document.body.appendChild(script);

       
          
script.onload = () => {
                    console.log("Three.js loaded:", window.THREE);
                };

            return () => {
                document.body.removeChild(script);
            };
        }, []);*/}
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
                </Routes>
            </main>
        </BrowserRouter>

    );
}import { BrowserRouter, Routes, Route } from "react-router-dom";
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


export default function App() {
    const [theme, setTheme] = useState("light");
    {/*useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.180.0/three.tsl.js";
        script.integrity =
            "sha512-pVsOWriwN/5X/FWYhtqqQLnD+3cm8W1YqGrNrfkKgp+GMykFl7fZ0vorWpckUlZOVIG1tNVnI3D7T8DSea5TQg==";
        script.crossOrigin = "anonymous";
        script.referrerPolicy = "no-referrer";
        script.async = true;

        document.body.appendChild(script);

       
          
script.onload = () => {
                    console.log("Three.js loaded:", window.THREE);
                };

            return () => {
                document.body.removeChild(script);
            };
        }, []);*/}
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
                </Routes>
            </main>
        </BrowserRouter>

    );
}