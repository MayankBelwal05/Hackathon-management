import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      return payload.userId; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/hackathon/getAll");
        setHackathons(response.data);
      } catch (error) {
        console.error("Error fetching hackathons", error);
      }
    };
    fetchHackathons();
  }, []);


  const participateInHackathon = async (hackathonId, hackathonName) => {
    if (!userId) {
      alert("You need to log in to participate!");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/hackathon/hackathonregister", {
        hackathonId,
        userId,
        hackathonName,
      });

      console.log("Successfully registered:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error registering for hackathon:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="mt-16 p-4">
      <h1 className="text-3xl font-bold mb-6">Available Hackathons</h1>
      {hackathons.length === 0 ? (
        <p className="text-gray-600">No hackathons available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon._id}
              className="p-6 border rounded shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{hackathon.name}</h2>
              <p className="text-gray-700 mb-2">{hackathon.description}</p>
              <p className="mb-2">
                <strong>Start Date:</strong>{" "}
                {new Date(hackathon.startDate).toLocaleDateString()}
              </p>
              <p className="mb-4">
                <strong>End Date:</strong>{" "}
                {new Date(hackathon.endDate).toLocaleDateString()}
              </p>
              <button
                onClick={() => participateInHackathon(hackathon._id, hackathon.name)}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Participate Here
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hackathons;
