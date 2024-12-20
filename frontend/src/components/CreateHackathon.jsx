import { useState } from "react";
import axios from "axios";

const CreateHackathon = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/hackathon/create", formData);

            if (response.status === 201) {
                setMessage("Hackathon created successfully!");
                console.log("API Response:", response.data);
            } else {
                setMessage("Failed to create Hackathon.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Create Your Amazing Hackathon 🚀</h1>
                <p className="text-lg text-gray-600 text-center mb-6">
                    Start your journey to building incredible projects and changing the world. Fill in the details below to create a new hackathon event.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg font-medium text-gray-700" htmlFor="name">Hackathon Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter the name of your hackathon"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700" htmlFor="description">Hackathon Description</label>
                        <textarea
                            name="description"
                            placeholder="Describe your hackathon"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create Hackathon 🎉
                        </button>
                    </div>
                </form>

                {message && <p className="mt-6 text-center text-lg font-semibold text-gray-700">{message}</p>}
            </div>
        </div>
    );
};

export default CreateHackathon;
