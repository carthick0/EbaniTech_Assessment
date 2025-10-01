// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-lg rounded-xl p-10 space-y-6 text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800">Hospital Management System</h1>
        <p className="text-gray-600">Please choose an option to continue</p>

        <button
          onClick={() => navigate("/register")}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Register
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
