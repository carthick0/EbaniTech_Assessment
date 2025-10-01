import Sidebar from "../../components/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar role="ADMIN" />
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-5 rounded shadow">Total Doctors: 10</div>
          <div className="bg-white p-5 rounded shadow">Total Patients: 35</div>
          <div className="bg-white p-5 rounded shadow">Total Lab Reports: 20</div>
        </div>

        {/* Example table for users */}
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">All Users</h3>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Dr. Alice</td>
                <td className="px-4 py-2">alice@hospital.com</td>
                <td className="px-4 py-2">Doctor</td>
                <td className="px-4 py-2">2025-09-30</td>
              </tr>
              {/* Map your API data here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
