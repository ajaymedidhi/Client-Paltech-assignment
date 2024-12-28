import React, { useState, useEffect } from "react";
import { getContacts, deleteContact, getContact } from "../../api";
import { Link } from "react-router-dom";
import "./style.css";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(5);

    // Fetch contacts on component mount
    useEffect(() => {
        fetchContacts();
    }, []);

    // Update filtered contacts when contacts or search term changes
    useEffect(() => {
        applyFilters();
    }, [contacts, search]);

    // Fetch contacts from the API
    const fetchContacts = async () => {
        try {
            const response = await getContacts();
            console.log("Fetched contacts:", response.data); // Debugging
            setContacts(response.data);
            setFilteredContacts(response.data); // Initialize filteredContacts
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    // Apply filters based on search input
    const applyFilters = () => {
        const filtered = contacts.filter(contact => {
            const name = contact.fullName || ""; // Ensure default value
            return name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredContacts(filtered);
    };

    // Handle deleting a contact
    const handleDelete = async id => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            try {
                await deleteContact(id);
                fetchContacts();
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        }
    };

    // Handle viewing contact details in a modal
    const handleView = async id => {
        try {
            const response = await getContact(id);
            setSelectedContact(response.data);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching contact details:", error);
        }
    };

    // Close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    // Pagination logic
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredContacts.length / contactsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-4">
            <h2>Contact List</h2>
            <input
                type="text"
                placeholder="Search by Name"
                className="input-form-control mb-3"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContacts.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No contacts available</td>
                        </tr>
                    ) : (
                        currentContacts.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.fullName}</td>
                                <td>{contact.phoneNumber}</td>
                                <td>{contact.email}</td>
                                <td>{contact.companyName}</td>
                                <td>{contact.position}</td>
                                <td>
                                    <button
                                        onClick={() => handleView(contact._id)}
                                        className="btn btn-info btn-sm"
                                    >
                                        View
                                    </button>
                                    <Link
                                        to={`/edit/${contact._id}`}
                                        className="btn btn-warning btn-sm mx-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button
                                onClick={() => paginate(number)}
                                className="page-link"
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Modal */}
            {showModal && selectedContact && (
                <div className="custom-modal-overlay" onClick={handleCloseModal}>
                    <div className="custom-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="custom-modal-header">
                            <h5 className="custom-modal-title">Contact Details</h5>
                            <button
                                type="button"
                                className="custom-close-btn"
                                onClick={handleCloseModal}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="custom-modal-body">
                            <div className="custom-details">
                                <p><strong>Full Name:</strong> {selectedContact.fullName}</p>
                                <p><strong>Phone Number:</strong> {selectedContact.phoneNumber}</p>
                                <p><strong>Email:</strong> {selectedContact.email}</p>
                                <p><strong>Company:</strong> {selectedContact.companyName}</p>
                                <p><strong>Position:</strong> {selectedContact.position}</p>
                                <p><strong>Address:</strong> {selectedContact.address}</p>
                                <p><strong>Notes:</strong> {selectedContact.notes}</p>
                            </div>
                        </div>
                        <div className="custom-modal-footer">
                            <button
                                type="button"
                                className="custom-btn"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactList;
