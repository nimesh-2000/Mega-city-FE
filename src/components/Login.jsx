import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../services/authService";
import { saveToken } from "../utils/jwt";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      saveToken(response.data.token);
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" className="form-control mb-2" />
        <p className="text-danger">{errors.email?.message}</p>

        <input {...register("password")} type="password" placeholder="Password" className="form-control mb-2" />
        <p className="text-danger">{errors.password?.message}</p>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="text-danger">{error}</p>
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  );
};

export default Login;
