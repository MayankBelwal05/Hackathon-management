import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateHackathon from "./components/CreateHackathon";
import Profile from "./components/Profile";
import Hackathons from "./components/Hackathons";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./components/Home";

const App = () => {
    return (
        <div>
            <Navbar />
            <div className="p-4">
                <Routes>
                <Route path="/" element={<Navigate to="/home" />}/>
                <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                              <Hackathons />
                            </PrivateRoute>
                        }
                    />
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
