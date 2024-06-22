import React, { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Assuming 'user' as default role
    errors: {},
    loading: false,
  });

  // Function to handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = state;
    const newErrors = {};

    // Frontend validation
    if (!name) newErrors.name = "Name is required.";
    if (!validator.isEmail(email))
      newErrors.email = "Please enter a valid email.";
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minSymbols: 1,
        minLowercase: 1,
        minUppercase: 1,
      })
    ) {
      newErrors.password =
        "Password must contain 1 special character, 1 Uppercase, 1 Lowercase.";
    }

    // If there are validation errors, update the state and return
    if (Object.keys(newErrors).length > 0) {
      setState({ ...state, errors: newErrors });
      return;
    }

    // Start the registration process, set loading to true
    setState({ ...state, loading: true });

    try {
      // Send a POST request to the signup endpoint
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
        name,
        email,
        password,
        role,
      });

      // Handle successful signup
      console.log(response.data);

      // Display success toast notification
      toast.success("User registered successfully!");

      // Reset form fields after successful registration
      setState({
        name: "",
        email: "",
        password: "",
        role: "user",
        errors: {},
        loading: false,
      });
    } catch (error) {
      // Handle error and display error message using toast
      console.log(
        "Error in catch block:",
        error.response?.data?.error || error.message
      );

      if (error.response && error.response.data) {
        // Update state with form error
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            form: error.response.data.error,
          },
        }));
        toast.error(error.response.data.error);
      } else {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            form: "Something went wrong. Please try again.",
          },
        }));
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      // Set loading to false after the registration process completes
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div className="register-form-container">
      <Toaster /> {/* This will show the toast notifications */}
      <div className="loader">
        <div className="loader_cube loader_cube--color"></div>
        <div className="loader_cube loader_cube--glowing"></div>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Registration</h1>
        {state.errors.form && <div className="error">{state.errors.form}</div>}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
          {state.errors.name && (
            <div className="error">{state.errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {state.errors.email && (
            <div className="error">{state.errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          {state.errors.password && (
            <div className="error">{state.errors.password}</div>
          )}
        </div>
        <button className="button" type="submit" disabled={state.loading}>
          {state.loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to={"/"}>
            <u>Login Here</u> 
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
