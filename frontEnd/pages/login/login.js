import { useState ,useEffect} from "react";
import axios from "axios";
import "./login.css";

export default function Login() {
    const API=process.env.REACT_APP_API
    const backendURL =`${API}/api/auth`;
    const [activeForm, setActiveForm] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
 // change if your backend URL is different
    useEffect(() => {
        // Check localStorage on component load
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) setUserInfo(JSON.parse(storedUser));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const { data } = await axios.post(`${backendURL}/login`, {
                email: formData.email,
                password: formData.password,
            });
            console.log("Login Success:", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUserInfo(data); 
            // Redirect or update UI after login
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const { data } = await axios.post(`${backendURL}/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "user", // default role
            });
            console.log("Registration Success:", data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setActiveForm("login"); // switch to login after register
        } catch (err) {
            console.error("Full error:", err); // always print in console

            let message = "Unknown error";

            if (err.response && err.response.data) {
                // Error returned from backend
                message = JSON.stringify(err.response.data, null, 2);
            } else if (err.message) {
                // Network error or other
                message = err.message;
            }

            setError(message);
        }

        finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">

            {/* Auth Section */}
            <section className="auth">
                <div className="auth-container">
                    {error && <p className="error">{error}</p>}

                    {/* Login Form */}
                    <form
                        className={`form ${activeForm === "login" ? "active" : ""}`}
                        onSubmit={handleLogin}
                    >
                        <h2>Login</h2>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <i
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                                title={showPassword ? "Hide Password" : "Show Password"}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <p>
                            Donât have an account?{" "}
                            <span onClick={() => setActiveForm("register")}>Register</span>
                        </p>
                    </form>

                    {/* Register Form */}
                    <form
                        className={`form ${activeForm === "register" ? "active" : ""}`}
                        onSubmit={handleRegister}
                    >
                        <h2>Register</h2>
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <i
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                                title={showPassword ? "Hide Password" : "Show Password"}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                        <p>
                            Already have an account?{" "}
                            <span onClick={() => setActiveForm("login")}>Login</span>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
}


