import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [hackathons, setHackathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in.");
      navigate("/login");
    } else {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserDetails(payload); 
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate]);

  const fetchCreatedHackathons = async () => {
    try {
      const response = await axios.get("http://localhost:8080/hackathon/created");
      setHackathons(response.data);
    } catch (error) {
      console.error("Error fetching created hackathons:", error.message);
      alert("Error fetching created hackathons.");
    }
  };

 const fetchParticipatedHackathons = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in.");
      navigate("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    const response = await axios.get("http://localhost:8080/hackathon/participated", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "userId": userId 
      },
    });

    setHackathons(response.data);
  } catch (error) {
    console.error("Error fetching participated hackathons:", error.message);
    alert("Error fetching participated hackathons.");
  }
};

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center mb-6">
        {userDetails && (
          <div className="border p-4 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {userDetails.authors}</p>
            <p><strong>User ID:</strong> {userDetails.userId}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mb-4">
        <button
          onClick={fetchCreatedHackathons}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Created Hackathons
        </button>
        <button
          onClick={fetchParticipatedHackathons}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Participated Hackathons
        </button>
      </div>

      {hackathons.length === 0 ? (
        <p>No hackathons found.</p>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">Hackathons:</h3>
          <ul>
            {hackathons.map((hackathon) => (
              <li key={hackathon._id} className="mb-2">
                <strong>{hackathon.name}</strong>: {hackathon.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
