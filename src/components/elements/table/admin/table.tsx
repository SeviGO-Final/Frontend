import React, { useEffect, useState, useCallback } from "react";
import api from "../../../../services/api";
import { UserResponse } from "../../../../types/user-type";

const Table: React.FC = () => {
  const [data, setData] = useState<UserResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data pengguna dari API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      const usersData: UserResponse[] = response.data.data;
      setData(usersData);
      setFilteredUsers(usersData);
      setError(null);
    } catch (err) {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fungsi verifikasi pengguna
  const handleVerified = async (userId: string, isVerified: boolean) => {
    if (!userId) return;
    try {
      await api.patch(`/users/verify/${userId}`, {
        is_verified: !isVerified,
      });
      setData((prevData) =>
        prevData.map((user) =>
          user._id === userId ? { ...user, is_verified: !isVerified } : user
        )
      );
      setFilteredUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, is_verified: !isVerified } : user
        )
      );
    } catch (err) {
      console.error("Error verify:", err);
    }
  };

  // Fungsi pencarian dengan debounce untuk mengurangi frekuensi update saat mengetik
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      setSearchTerm(term);

      const filtered = data.filter(
        (user) =>
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.nik.includes(term) ||
          user.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    },
    [data]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow mt-16">
      {/* Input Pencarian */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-1/3"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select className="p-2 border rounded">
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>

      {/* Tabel Data Pengguna */}
      <table className="w-full text-left bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border-b">No</th>
            <th className="p-2 border-b">NIK</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Status</th>
            <th className="p-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{user.nik}</td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">
                  <span
                    className={`px-4 rounded-xl text-white ${
                      user.is_verified ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.is_verified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => handleVerified(user._id, user.is_verified)}
                    className="bg-orange-500 text-white px-4 py-1 rounded"
                  >
                    {user.is_verified ? "Unverify" : "Verify"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-2 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
