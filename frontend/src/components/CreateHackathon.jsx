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
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Hackathon</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                ></textarea>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Create Hackathon
                </button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
};

export default CreateHackathon;
