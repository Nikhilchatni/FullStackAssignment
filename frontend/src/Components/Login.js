import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_name", response.data.user.user_name);
            localStorage.setItem("user_id", response.data.user.user_id);
            localStorage.setItem("user_email", response.data.user.user_email);

            setSuccess("Login successful!");
            setEmail("");
            setPassword("");
            navigate("/HomePage");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || "Login failed");
            } else {
                setError("Server not reachable");
            }
        }
    };

    return (
        <div className="login-page">
            <header className="header">
                <div className="logo">Keep Notes</div>
                <nav>
                    <Link to="/about">About</Link>
                    <Link to="/notes">Notes</Link>
                    <Link to="/account">Account</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </header>

            <div className="breadcrumb">
                Homepage / <span>Login Page</span>
            </div>

            <div className="login-container">
                <div className="login-box">
                    <div className="login-title-bar">
                        <span>Login</span>
                        <div className="title-icons">
                            <span className="circle red"></span>
                            <span className="circle yellow"></span>
                            <span className="circle green"></span>
                        </div>
                    </div>
                    <form onSubmit={handleLogin}>
                        <h2 className="login-heading">Login</h2>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>}

                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="btn-group">
                            <button type="submit" className="login-btn">
                                Login
                            </button>
                            <button
                                type="button"
                                className="btn register-btn"
                                onClick={() => navigate("/signup")}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;
