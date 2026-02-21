import { useEffect, useState } from "react";
import {
  getInventory,
  addInventory,
  deleteInventory,
} from "./BloodBankService";

interface InventoryItem {
  id: number;
  blood_group: string;
  units_available: number;
}

export default function BloodBankDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [units, setUnits] = useState(1);

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    try {
      await addInventory({
        blood_group: bloodGroup,
        units_available: units,
      });

      setUnits(1);
      fetchInventory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteInventory(id);
      fetchInventory();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🩸 Blood Bank Dashboard</h1>
        <p className="text-gray-600">Manage your blood inventory and stock levels</p>
      </div>

      {/* Inventory Summary */}
      <div className="card-elevated">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Total Inventory Items</p>
              <p className="text-4xl font-bold text-red-600">{inventory.length}</p>
            </div>
            <div className="text-5xl opacity-20">📦</div>
          </div>
        </div>
      </div>

      {/* Add Inventory Form */}
      <div className="card-elevated">
        <div className="card-header">
          <h2 className="text-2xl font-bold text-gray-900">Add Inventory</h2>
        </div>
        <div className="card-body space-y-4">
          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="form-select"
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Units to Add</label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="form-input"
              min="1"
              placeholder="Enter number of units"
            />
          </div>

          <button
            onClick={handleAdd}
            className="btn btn-primary w-full"
          >
            + Add Units
          </button>
        </div>
      </div>

      {/* Inventory List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Inventory</h2>
        {inventory.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-12">
              <p className="text-gray-500 text-lg">No inventory items. Add some blood units to get started!</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="card-body flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-red-100 rounded-lg p-3 ${
                      item.units_available < 5 ? 'ring-2 ring-red-500' : ''
                    }`}>
                      <span className="text-2xl">🩸</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900">{item.blood_group}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-gray-600 font-medium">{item.units_available} units</p>
                        {item.units_available < 5 && (
                          <span className="badge badge-danger text-xs">Low Stock</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}