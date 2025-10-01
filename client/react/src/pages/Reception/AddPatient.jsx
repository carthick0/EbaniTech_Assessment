import { useState, useContext } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

export default function AddPatient() {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    doctorId: "",
  });

 const handleAddPatient = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      ...form,
      age: Number(form.age),          
      doctorId: Number(form.doctorId)
    };

    await axios.post(
      "http://localhost:5000/api/reception/create",
      payload,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert("Patient added successfully!");
    setForm({
      name: "",
      age: "",
      gender: "Male",
      contact: "",
      doctorId: "",
    });
  } catch (err) {
    console.error(err);
    alert("Failed to add patient");
  }
};

  return (
    <div className="flex">
      <Sidebar role="RECEPTIONIST" />
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Add Patient</h2>
        <form
          onSubmit={handleAddPatient}
          className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="p-3 border rounded-lg"
            required
          />
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className="p-3 border rounded-lg"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="p-3 border rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Doctor ID"
            value={form.doctorId}
            onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            className="p-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition col-span-full"
          >
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
}
