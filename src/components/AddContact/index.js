import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContact } from "../../api"; // Assuming you have a function for API call
import './style.css';

const AddContact = () => {
    const [form, setForm] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        companyName: "",
        position: "",
        notes: "",
    });

    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            fullName: form.fullName,
            phoneNumber: form.phoneNumber,
            email: form.email,
            address: form.address,
            companyName: form.companyName,
            position: form.position,
            notes: form.notes,
        };

        try {
            console.log("Submitting form data:", formData); // Debugging line

            // Call the API to create the contact
            const response = await createContact(formData); // Assuming createContact makes an API call
            console.log("API response:", response); // Debugging line

            setMessage("Contact added successfully!");
            setMessageType("success");
            window.alert("Contact added successfully!");

            setTimeout(() => {
                navigate("/"); // Redirect after success
            }, 3000); // 3-second delay for user to see the message
        } catch (error) {
            console.error("Error creating contact:", error.response?.data || error.message);

            setMessage("Failed to add contact. Please try again.");
            setMessageType("error");
            window.alert("Failed to add contact. Please try again.");
        }
    };

    return (
        <div className="add-contact-container">
            <h2>Add Contact</h2>

            {message && (
                <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        className="form-control"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="form-control"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address">Address</label>
                    <textarea
                        name="address"
                        id="address"
                        className="form-control"
                        value={form.address}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="form-control"
                        value={form.companyName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        name="position"
                        id="position"
                        className="form-control"
                        value={form.position}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        name="notes"
                        id="notes"
                        className="form-control"
                        value={form.notes}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
