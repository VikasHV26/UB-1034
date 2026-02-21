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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blood Bank Dashboard</h1>

      {/* Add Inventory */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6 max-w-md">
        <h2 className="text-lg font-semibold mb-3">Add Inventory</h2>

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="w-full border p-2 rounded mb-3"
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

        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(Number(e.target.value))}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          onClick={handleAdd}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Add Units
        </button>
      </div>

      {/* Inventory List */}
      <div className="space-y-4">
        {inventory.length === 0 ? (
          <p>No inventory available.</p>
        ) : (
          inventory.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{item.blood_group}</p>
                <p>Units: {item.units_available}</p>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}