import axios from "axios";
import "./loginSignup.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();

  //useState is react hook that creates and mangaes state(the tool) +> what holds your data so react can keep track of it b/n re-render
  //form state is the data representing your forms value(what the took us holding) => the actual values
  const [isLogin, setIsLogin] = useState(true);
  // every keystroke updates our state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
    institution: "",
  });
  //handle the input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth")
      .then((res) => {
        console.log("baceknd response:", res.data);
      })
      .catch((err) => {
        console.error("Error connecting the backend: ", err.message);
      });
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault(); // prevent refresh

    if (!isLogin && formData.password !== formData.confirm_password) {
      alert("password do not match!");
      return;
    }

    try {
      const endpoint = isLogin
        ? "http://localhost:3000/api/auth/login"
        : "http://localhost:3000/api/auth/register";
      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            institution: formData.institution
,
          };

      const res = await axios.post(endpoint, payload);
      console.log("success:", res.data);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong, try again!");

    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isLogin ? "Welcome Back!" : "Secure your documents"}
        </h2>
        <p className="auth-subtitle">
          {isLogin
            ? "Log in to own account"
            : "Sign up to start securing documents"}
        </p>

        <form className="auth-form" onSubmit={handlesubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="auth-input"
              onChange={handleChange}
              value={formData.name}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            onChange={handleChange}
            value={formData.password}
          />

          {!isLogin && (
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="auth-input"
              onChange={handleChange}
              value={formData.confirm_password}
            />
          )}
          {!isLogin && (
            <input
              type="text"
              name="role"
              placeholder="role"
              className="auth-input"
              onChange={handleChange}
              value={formData.role}
            />
          )}
          {!isLogin && (
            <input
              type="text"
              name="institution"
              placeholder="instituion"
              className="auth-input"
              onChange={handleChange}
              value={formData.instituion}
            />
          )}

          <button className="auth-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleForm}>{isLogin ? "Sign up" : "Log in"}</span>
        </p>
      </div>
    </div>
  );
}
