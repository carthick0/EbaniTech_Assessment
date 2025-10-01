import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";

export default function DoctorDashboard() {
  const { user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [treatment, setTreatment] = useState("");

  // Fetch patients
  const fetchPatients = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/doctor/patients`,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setPatients(res.data.data || []); // <-- fix here
  } catch (err) {
    console.error(err);
    alert("Failed to fetch patients");
  }
};


  useEffect(() => {
    fetchPatients();
  }, [search]);

  // Fetch patient details for treatment update
  const handleSelectPatient = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctor/patients/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSelectedPatient(res.data);
      setTreatment(res.data.treatment || "");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch patient details");
    }
  };

  // Update treatment
  const handleUpdateTreatment = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/doctor/patients/${selectedPatient.id}/treatment`,
        { treatment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Treatment updated successfully!");
      fetchPatients();
      setSelectedPatient(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update treatment");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="DOCTOR" />
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Doctor Dashboard</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search patients by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border rounded w-full mb-6"
        />

        {/* Patient List */}
        <div className="bg-white p-5 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Patients</h3>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length ? (
                patients.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.age}</td>
                    <td className="px-4 py-2">{p.gender}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleSelectPatient(p.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        View / Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Treatment Update */}
        {selectedPatient && (
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">
              Update Treatment for {selectedPatient.name}
            </h3>
            <textarea
              className="w-full p-3 border rounded mb-4"
              rows={5}
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            />
            <button
              onClick={handleUpdateTreatment}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Treatment
            </button>

            {/* Lab Reports */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Lab Reports</h4>
              {selectedPatient.labReports?.length ? (
                <ul className="list-disc pl-5">
                  {selectedPatient.labReports.map((lab) => (
                    <li key={lab.id}>
                      <a
                        href={`http://localhost:5000/${lab.reportUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        {lab.reportUrl.split("/").pop()}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No lab reports uploaded yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
