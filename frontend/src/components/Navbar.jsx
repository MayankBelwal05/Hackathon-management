import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <nav className="bg-blue-600 fixed w-full p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Hackathon Platform</Link>
                <div className="flex gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/create-hackathon" className="text-white hover:underline">
                                Create Hackathon
                            </Link>
                            <Link to="/profile" className="text-white hover:underline">
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:underline">Login</Link>
                            <Link to="/signup" className="text-white hover:underline">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
