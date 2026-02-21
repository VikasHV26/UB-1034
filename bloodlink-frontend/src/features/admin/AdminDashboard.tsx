import { useEffect, useState } from "react";
import { getStats } from "./AdminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Analytics Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Total Patients" value={stats.total_patients} />
        <Card title="Total Hospitals" value={stats.total_hospitals} />
        <Card title="Total Blood Banks" value={stats.total_bloodbanks} />
        <Card title="Total Requests" value={stats.total_requests} />
        <Card title="Pending Requests" value={stats.pending_requests} />
        <Card title="Approved Requests" value={stats.approved_requests} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-red-600">{value}</p>
    </div>
  );
}