// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div className="w-60 h-screen bg-gray-800 text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

      {role === "RECEPTIONIST" && (
        <>
            <Link to="/reception/dashboard" className="mb-3 hover:text-blue-400">Dashboard</Link>
            <Link to="/reception/add-patient" className="mb-3 hover:text-blue-400">Add Patient</Link>
            <Link to="/reception/assign-doctor" className="mb-3 hover:text-blue-400">Assign Doctor</Link>
            <Link to="/reception/billing" className="mb-3 hover:text-blue-400">Billing</Link>
        </>
        )}

      {role === "ADMIN" && (
        <>
          <Link to="/admin/dashboard" className="mb-3 hover:text-blue-400">Dashboard</Link>
          <Link to="/admin/add-user" className="mb-3 hover:text-blue-400">Add User</Link>
          <Link to="/admin/manage-lab" className="mb-3 hover:text-blue-400">Manage Lab</Link>
        </>
      )}
    </div>
  );
}
