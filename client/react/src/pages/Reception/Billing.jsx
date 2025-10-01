// src/pages/reception/Billing.jsx
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

export default function Billing() {
  const { user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user?.token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/reception/patients", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPatients(res.data);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      }
    };

    fetchPatients();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !amount) return alert("Select patient and enter amount");

    try {
      await axios.post(
        "http://localhost:5000/api/bills/create",
        { patientId: selectedPatient, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Bill created successfully!");
      setSelectedPatient("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Failed to create bill");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="RECEPTIONIST" />
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Billing & Invoice</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
        >
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - {p.doctorName || "No doctor assigned"}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Bill Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Create Bill
          </button>
        </form>
      </div>
    </div>
  );
}
