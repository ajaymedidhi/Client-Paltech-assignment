import React from "react";
import { Link } from "react-router-dom";
import './index.css';  // Ensure the CSS file is imported

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Contacts</Link>
                <div>
                    <Link className="btn btn-primary" to="/add">Add Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
