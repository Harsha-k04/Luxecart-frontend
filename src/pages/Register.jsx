import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/users/register", form);

            toast.success("Account created!");
            navigate("/login");
        } catch (err) {
            toast.error("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-xl"
            >
                <h1 className="font-serif text-3xl mb-6 text-center">
                    Create Account
                </h1>

                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none"
                />

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none"
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full mb-6 px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none"
                />

                <button className="w-full py-3 bg-primary text-black font-semibold rounded-lg hover:scale-105 transition">
                    Register
                </button>

                <p className="text-sm text-muted mt-4 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-primary cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Register;