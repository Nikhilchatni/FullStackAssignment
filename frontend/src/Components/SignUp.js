import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../SignUp.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("/signup", {
                name: username,
                email,
                password,
            });
            alert(res.data.message);
            navigate("/"); 
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="signup-page">
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
                Homepage / <span>Signup Page</span>
            </div>

            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-title-bar">
                        <span>Signup</span>
                        <div className="title-icons">
                            <span className="circle red"></span>
                            <span className="circle yellow"></span>
                            <span className="circle green"></span>
                        </div>
                    </div>

                    <h2 className="signup-heading">Sign up</h2>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleSignup}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <div className="button-group">
                            <button type="submit" className="btn register-btn">
                                Register
                            </button>
                            <Link to="/" className="btn login-btn">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
