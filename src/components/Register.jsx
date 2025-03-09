import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().required("Role is required"),
});

const Register = () => {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="Username" className="form-control mb-2" />
        <p className="text-danger">{errors.username?.message}</p>

        <input {...register("email")} placeholder="Email" className="form-control mb-2" />
        <p className="text-danger">{errors.email?.message}</p>

        <input {...register("phone")} placeholder="Phone" className="form-control mb-2" />
        <p className="text-danger">{errors.phone?.message}</p>

        <input {...register("password")} type="password" placeholder="Password" className="form-control mb-2" />
        <p className="text-danger">{errors.password?.message}</p>

        <input {...register("role")} placeholder="Role" className="form-control mb-2" />
        <p className="text-danger">{errors.role?.message}</p>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p>{message}</p>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};

export default Register;
