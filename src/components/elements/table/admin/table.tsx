import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { UserResponse } from "../../../../types/user-type";

const Table = () => {
  const [data, setData] = useState<UserResponse[]>([]); // Data pengguna dari API
  const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]); // Pengguna setelah difilter
  const [searchTerm, setSearchTerm] = useState(""); // Input pencarian

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setData(response.data.data);
        setFilteredUsers(response.data.data);
      })
      .catch((error) => {
        console.log("Error when getting all users: ", error);
      });
  }, []);

  // Fungsi untuk menangani verifikasi pengguna
  const handleVerified = (userId: string, isVerified: boolean) => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    api
      .patch(`/users/verify/${userId}`, {
        is_verified: !isVerified,
      })
      .then((response) => {
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
      })
      .catch((error) => {
        console.log("Error verify: ", error);
      });
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    // Filter data pengguna berdasarkan input pencarian
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.nik.includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered); // Update hasil pencarian
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow mt-16">
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
            filteredUsers.map((user: UserResponse, index) => (
              <tr key={user._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{user.nik}</td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">
                  <span
                    className={
                      user.is_verified
                        ? "bg-green-500 text-white px-4 rounded-xl"
                        : "bg-red-500 text-white px-4 rounded-xl"
                    }
                  >
                    {user.is_verified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => handleVerified(user._id, user.is_verified)} // pastikan user._id yang dikirim
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
