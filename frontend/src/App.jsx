import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateHackathon from "./components/CreateHackathon";
import Profile from "./components/Profile";
import Hackathons from "./components/Hackathons";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
    return (
        <div>
            <Navbar />
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<Hackathons />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                   
                    <Route
                        path="/create-hackathon"
                        element={
                            <PrivateRoute>
                                <CreateHackathon />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
