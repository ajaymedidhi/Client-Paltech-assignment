import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../../api"; 
import './style.css';

const EditContact = () => {
    const { id } = useParams(); // Get the contact ID from URL params
    const navigate = useNavigate(); // To navigate back to the contact list

    // Initialize the form state
    const [form, setForm] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        companyName: "",
        position: "",
        notes: "",
    });

    const [loading, setLoading] = useState(true); // Loading state to show loading message

    useEffect(() => {
        fetchContact(); // Fetch contact data on component mount
    }, []);

    // Fetch contact details by ID from the backend
    const fetchContact = async () => {
        try {
            const response = await getContact(id);
            setForm(response.data); // Populate form state with fetched data
            setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
            console.error("Error fetching contact details:", error.message || error);
            setLoading(false);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Handle form submission to update the contact
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateContact(id, form); // Call updateContact API
            navigate("/"); // Navigate back to the contact list after successful update
        } catch (error) {
            console.error("Error updating contact:", error.message || error);
        }
    };

    if (loading) {
        return <div className="container mt-4">Loading contact details...</div>;
    }

    return (
        <div className="edit-contact-container">
            <h2>Edit Contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={form.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        className="form-control"
                        value={form.companyName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Position</label>
                    <input
                        type="text"
                        name="position"
                        className="form-control"
                        value={form.position}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Notes</label>
                    <textarea
                        name="notes"
                        className="form-control"
                        value={form.notes}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Contact
                </button>
            </form>
        </div>
    );
};

export default EditContact;
