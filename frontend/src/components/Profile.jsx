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
    <div className="container mx-auto p-6 bg-gradient-to-b from-blue-400 to-teal-300 min-h-screen">
      <div className="flex flex-col items-center mb-8 mt-12">
        {userDetails && (
          <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-300">
            <div className="flex items-center justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center border-4 border-black">
                <span className="text-3xl text-gray-800 font-bold">{userDetails.authors?.slice(0, 1)}</span>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">WELCOME | 👋<br />{userDetails.authors}</h2>
            <p className="text-lg text-gray-600"><strong>User ID:</strong> {userDetails.userId}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-8 mb-8">
        <button
          onClick={fetchCreatedHackathons}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transform transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Created Hackathons
        </button>
        <button
          onClick={fetchParticipatedHackathons}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full shadow-lg hover:from-green-700 hover:to-teal-700 transform transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Participated Hackathons
        </button>
      </div>

      {hackathons.length === 0 ? (
        <p className="text-center text-xl text-gray-700 mb-8">No hackathons found.</p>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-gray-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Hackathons</h3>
          <ul className="space-y-6">
            {hackathons.map((hackathon) => (
              <li key={hackathon._id} className="p-4 bg-gray-100 rounded-lg border-l-4 border-purple-600 shadow-md transform transition duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                <div className="flex justify-between items-center">
                  <strong className="text-lg text-gray-800">{hackathon.name}</strong>
                  <p className="text-sm text-gray-600">{hackathon.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
