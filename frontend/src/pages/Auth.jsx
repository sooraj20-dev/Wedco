import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  Mail,
  Lock,
  User,
  Check,
  Eye,
  EyeOff
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ ...errors, email: "Invalid email" });
    } else if (name === "password" && value.length < 6) {
      setErrors({ ...errors, password: "Minimum 6 characters" });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(`${BACKEND_URL}${endpoint}`, formData);
      console.log("✅ Success:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success(response.data.message);
      navigate("/");
      
    } catch (err) {
      console.error("❌ Axios error:", err);
      setApiError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "" });
    setErrors({});
    setApiError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-purple-600 mb-4">
            {isLogin ? "Login" : "Create an Account"}
          </h1>

          {apiError && (
            <p className="text-sm text-red-500 text-center mb-2">{apiError}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300"
                  />
                </div>
              </motion.div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full p-3 pl-10 rounded-lg border border-gray-300"
              />
              {formData.email && !errors.email && (
                <Check className="absolute right-3 top-3 text-green-500" size={18} />
              )}
              {errors.email && (
                <p className="text-xs text-red-500 pl-2 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full p-3 pl-10 pr-10 rounded-lg border border-gray-300"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 pl-2 mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                </svg>
              )}
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="border-t border-gray-300"></div>
            <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
              or
            </span>
          </div>

          <p className="text-center mt-6 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-purple-600 font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
