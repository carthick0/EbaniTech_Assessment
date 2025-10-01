import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

export default function ReceptionDashboard() {
  const { user } = useContext(AuthContext); 
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user?.token) return; 

      try {
        const res = await axios.get(
          "http://localhost:5000/api/reception/patients",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setPatients(res.data);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      }
    };

    fetchPatients();
  }, [user]); 

  return (
    <div className="flex">
      <Sidebar role="RECEPTIONIST" />
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Receptionist Dashboard</h2>
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-5 rounded shadow">Total Patients: {patients.length}</div>
          <div className="bg-white p-5 rounded shadow">
            Assigned Patients: {patients.filter(p => p.doctorId).length}
          </div>
          <div className="bg-white p-5 rounded shadow">
            Pending Bills: {patients.filter(p => !p.billPaid).length}
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Patients</h3>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Assigned Doctor</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.age}</td>
                  <td className="px-4 py-2">{p.gender}</td>
                  <td className="px-4 py-2">{p.doctorName || "Not assigned"}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition mr-2">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
