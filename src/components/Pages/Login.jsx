import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles2.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = "http://localhost:8080/api/users/login";
        const { data: res } = await axios.post(url, data);

        console.log(res.email);
        console.log(res.firstName);
        console.log(res.id);

        localStorage.setItem("userId", res.id); // Store userId separately if needed
        localStorage.setItem("firstName", res.firstName); // Store firstName
        localStorage.setItem("email", res.email); // Store email

        navigate("/"); // Redirect to homepage or desired route
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message); // Display error message
        } else {
            setError("An unexpected error occurred."); // Handle unexpected errors
        }
    }
};

  useEffect(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <div className={`${styles.login_container} ${isTransitioning ? styles.form_container_transition : ""}`}>
      <div className={`${styles.login_form_container} ${isTransitioning ? styles.form_container_transition_reverse : ""}`}>
        <div className={`${styles.left} ${isTransitioning ? styles.slideOut : styles.slideIn}`}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={`${styles.right} ${isTransitioning ? styles.slideOut : styles.slideIn}`}>
          <h1>New Here?</h1>
          <Link to="/signup" onClick={() => setIsTransitioning(true)}>
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
