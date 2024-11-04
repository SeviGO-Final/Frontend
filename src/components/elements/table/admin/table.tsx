import { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error: ", error));
  }, []);
  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
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
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Phone</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 border-b">{index + 1}</td>
                <td className="p-2 border-b">{item.name}</td>
                <td className="p-2 border-b">{item.email}</td>
                <td className="p-2 border-b">{item.phone}</td>
                <td className="p-2 border-b">
                  <span
                    className={
                      item.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {item.status}
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
