import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <nav
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 fixed w-full p-4 shadow-md z-50 font-poppins"
        >
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/home"
                    className="text-white text-3xl font-semibold tracking-wide"
                >
                    💻 Hackathons
                </Link>
                <div className="flex gap-6">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/"
                                className="text-white text-lg hover:text-blue-200 transition duration-300"
                            >
                                Available Hackathons
                            </Link>
                            <Link
                                to="/create-hackathon"
                                className="text-white text-lg hover:text-blue-200 transition duration-300"
                            >
                                ✏️ Create Hackathon
                            </Link>
                            <Link
                                to="/profile"
                                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition duration-300"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
