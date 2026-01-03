import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";



const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    rollNo: "",
    class: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.rollNo || !form.class) {
      alert("Name, Roll No and Class are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/student/login", form);

      localStorage.setItem("studentToken", res.data.token);

      navigate("/student/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Student Login
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="name"
            placeholder="Student Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            name="fatherName"
            placeholder="Father Name (optional)"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            name="rollNo"
            placeholder="Roll No"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            name="class"
            placeholder="Class (e.g. 10A)"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 New Era School
        </p>
      </div>
    </div>
  );
};

export default Login;
