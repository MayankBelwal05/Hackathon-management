import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative isolate px-6 pt-0 lg:px-8">
            <div className="mx-auto max-w-2xl py-24 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                        Welcome to the Hackathon Platform
                    </h1>
                    <p className="mt-8 text-lg leading-8 text-gray-700 sm:text-xl">
                        Participate in exciting challenges, connect with brilliant minds, and showcase your skills to the world.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Explore Hackathons
                        </Link>
                        <Link
                            to="/create-hackathon"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Host a Hackathon <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;