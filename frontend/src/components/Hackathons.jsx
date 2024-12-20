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
    <div className="mt-16 p-6 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Explore & Join ✨ Amazing Hackathons
      </h1>
      <p className="text-xl text-gray-800 mb-12 text-center">
        Discover exciting opportunities to challenge your skills, innovate with peers, and compete for great prizes. Ready to make an impact?
      </p>
      
      {hackathons.length === 0 ? (
        <p className="text-gray-600 text-center">No hackathons available at the moment. Please check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon._id}
              className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{hackathon.name}</h2>
              <p className="text-gray-700 mb-4">{hackathon.description}</p>
              <p className="mb-2 text-sm text-gray-600">
                <strong>Start Date:</strong> {new Date(hackathon.startDate).toLocaleDateString()}
              </p>
              <p className="mb-4 text-sm text-gray-600">
                <strong>End Date:</strong> {new Date(hackathon.endDate).toLocaleDateString()}
              </p>
              <button
                onClick={() => participateInHackathon(hackathon._id, hackathon.name)}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
               Participate
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <p className="text-lg text-gray-700">Unlock your potential, collaborate with others, and build something amazing. Your journey starts here!</p>
      </div>
    </div>
  );
};

export default Hackathons;
