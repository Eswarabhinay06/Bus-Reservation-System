import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {

      await api.post("/auth/register", form);

      alert("Registration Successful 🎉");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Registration Failed");

    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h2>🚌 Bus Reservation</h2>

        <h4>Create Account</h4>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label>Full Name</label>

            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-success register-btn"
          >
            Register
          </button>

        </form>

        <p className="login-link mt-4">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;