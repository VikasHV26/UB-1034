import { useEffect, useState } from "react";
import { getStats } from "./AdminService";

interface CardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

function Card({ title, value, icon, color }: CardProps) {
  return (
    <div className="card-elevated">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
          <div className="text-4xl opacity-30">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <span className="text-4xl">⏳</span>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="alert alert-danger">
        <p className="font-semibold">Error loading statistics</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">👨‍💼 Admin Analytics Dashboard</h1>
        <p className="text-gray-600">System overview and user statistics</p>
      </div>

      {/* Primary Stats */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">User Statistics</h2>
        <div className="stats-grid">
          <Card 
            title="Total Patients" 
            value={stats.total_patients} 
            icon="👤"
            color="text-blue-600"
          />
          <Card 
            title="Total Hospitals" 
            value={stats.total_hospitals} 
            icon="🏥"
            color="text-green-600"
          />
          <Card 
            title="Total Blood Banks" 
            value={stats.total_bloodbanks} 
            icon="🩸"
            color="text-red-600"
          />
        </div>
      </div>

      {/* Request Statistics */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Request Statistics</h2>
        <div className="stats-grid">
          <Card 
            title="Total Requests" 
            value={stats.total_requests} 
            icon="📋"
            color="text-purple-600"
          />
          <Card 
            title="Pending Requests" 
            value={stats.pending_requests} 
            icon="⏳"
            color="text-yellow-600"
          />
          <Card 
            title="Approved Requests" 
            value={stats.approved_requests} 
            icon="✓"
            color="text-green-600"
          />
        </div>
      </div>

      {/* Summary Stats Card */}
      <div className="card-elevated">
        <div className="card-body">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">System Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {stats.total_patients + stats.total_hospitals + stats.total_bloodbanks}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Request Completion</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {stats.total_requests > 0 
                  ? Math.round((stats.approved_requests / stats.total_requests) * 100) 
                  : 0}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pending Rate</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {stats.total_requests > 0 
                  ? Math.round((stats.pending_requests / stats.total_requests) * 100) 
                  : 0}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Health Score</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {stats.total_requests > 0 ? '✓ Good' : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}