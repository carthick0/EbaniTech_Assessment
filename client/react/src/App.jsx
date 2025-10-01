import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ReceptionDashboard from "./pages/Reception/ReceptionDashboard";
import AddPatient from "./pages/Reception/AddPatient";
import { AuthProvider } from "./context/AuthContext";
import Billing from "./pages/Reception/Billing";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/reception/dashboard" element={<ReceptionDashboard />} />
        <Route path="/reception/add-patient" element={<AddPatient />} />
        <Route path="/reception/billing" element={<Billing />} />
        <Route path='/doctor/dashboard' element={<DoctorDashboard />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
