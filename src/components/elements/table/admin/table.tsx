import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { UserResponse } from "../../../../types/user-type";

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("/data.json")
    //   .then((response) => response.json())
    //   .then((jsonData) => setData(jsonData))
    //   .catch((error) => console.error("Error: ", error));
    api.get('/users')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log('Error when get all users: ', error);
      });
  }, []);

  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <div className="flex justify-between users-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded w-1/3"
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
            {data.map((user: UserResponse, index) => (
              <tr key={user._id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{user.nik}</td>
                <td className="p-2 border-b">{user.name}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">
                  <span
                    className={
                      user.is_verified === true
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {user.is_verified ? "Verified" : "Unverified" }
                  </span>
                </td>
                <td className="p-2 border-b">
                  <button className="bg-orange-500 text-white px-4 py-1 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
