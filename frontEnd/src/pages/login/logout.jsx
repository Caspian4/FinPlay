import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear stored user info
    localStorage.removeItem("userInfo");

    // Optionally clear any other app data
    // localStorage.clear();

    // Redirect to login
    navigate("/login");
  }, [navigate]);

  return (
    <div className="logout-message">
      <p>Logging you out...</p>
    </div>
  );
}
