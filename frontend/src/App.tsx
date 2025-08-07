import { useEffect, useState } from "react";
import axios from "axios";

interface ServerData {
  date: string;
  time: string;
  iso: string;
}

interface ApiResponse {
  status: "success" | "error";
  message: string;
  data: ServerData | null;
  errors: Record<string, string> | string[] | null;
}

function App() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState<ServerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<ApiResponse>("/api")
      .then((res: { data: ApiResponse }) => {
        if (res.data.status === "success") {
          setMessage(res.data.message);
          setData(res.data.data);
          setError(null);
        } else {
          setError("Failed to fetch data from server.");
        }
      })
      .catch(() => {
        setError("Error: Could not connect to server.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-blue-600 mb-4">Server Response</h1>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && error && (
          <p className="text-red-600 font-semibold mb-4">{error}</p>
        )}

        {!loading && !error && (
          <>
            <p className="text-green-600 mb-6">{message}</p>
            {data ? (
              <ul className="text-left text-gray-700 space-y-2">
                <li><span className="font-semibold">Date:</span> {data.date}</li>
                <li><span className="font-semibold">Time:</span> {data.time}</li>
                <li><span className="font-semibold">ISO:</span> {data.iso}</li>
              </ul>
            ) : (
              <p className="text-gray-500">No data available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
