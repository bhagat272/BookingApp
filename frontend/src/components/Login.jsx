import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/slices/LoginSlice";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
    loading: false,
  });

  const {token , role} = useSelector((state)=>state.login)

  useEffect(() => {
    
    // const token = localStorage.getItem("authToken");
    // const role = localStorage.getItem("userRole");
    console.log(token, role);
    if (role === "admin") {
      navigate("/dashboard");
    } else if (role === "user") {
      navigate("/homepage");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    const newErrors = {};

    // Validate email and password
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

    if (Object.keys(newErrors).length > 0) {
      setState({ ...state, errors: newErrors });
      return;
    }

    setState({ ...state, loading: true });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password }
      );

      // Enhanced logging
      console.log("API Response:", response);

      if (response.status === 200) {
        const { token, role , profile } = response.data;
        console.log("Login successful, token received:", token);
        console.log("Role:", role);
        
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("profile", profile);


        toast.success("Login successful", {
          duration: 1200,
        });

        setTimeout(() => {
          if (role === "admin") {
            navigate("/dashboard");
          } else if (role === "user") {
            navigate("/homepage");
          }
        }, 1300);
      } else {
        console.log("Unexpected response status:", response.status);
        toast.error("Invalid Credentials", {
          duration: 1200,
        });
      }
    } catch (error) {
      // Enhanced logging
      console.log("Error during login:", error);

      // Check if error.response is defined and inspect it
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);

        // Handle specific status codes
        if (error.response.status === 401) {
          toast.error("Invalid Credentials", {
            duration: 1200,
          });
        } else if (error.response.status === 404) {
          toast.error("User Not Found", {
            duration: 1200,
          });
        } else {
          toast.error(
            error.response.data.error || "An error occurred during login.",
            {
              duration: 1200,
            }
          );
        }
      } else {
        toast.error(error.message || "An unexpected error occurred.", {
          duration: 1200,
        });
      }

      setState({
        ...state,
        errors: {
          ...state.errors,
          form: error.response?.data?.error || error.message,
        },
      });
    } finally {
      setState({ ...state, loading: false });
    }
  };

  return (
    <div className="login-form-container">
      <Toaster />
      <div class="loader">
        <div class="loader_cube loader_cube--color"></div>
        <div class="loader_cube loader_cube--glowing"></div>
      </div>
      {/* Conditional rendering: Show loader if state.loading is true */}
      {state.loading ? (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              className="animate-ping"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
            </svg>
          </div>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {state.errors.form && (
            <div className="error">{state.errors.form}</div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
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
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              placeholder="Enter your password"
            />
            {state.errors.password && (
              <div className="error">{state.errors.password}</div>
            )}
          </div>
          <button className="button" type="submit" disabled={state.loading}>
            {state.loading ? "Logging..." : "Log in"}
          </button>
          <p className="mt-2 mb-3 text">
            New User?{" "}
            <Link to={"/register"}>
              <u>Create an account</u>
            </Link>
          </p>
          <p className="mt-2 mb-3 text">
            Forgot Password?{" "}
            <Link to={"/forgot-password"}>
              <u>Reset it here</u>
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
