import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import ViewContact from "./components/ViewContact";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/add" element={<AddContact />} />
                <Route path="/edit/:id" element={<EditContact />} />
                <Route path="/view/:id" element={<ViewContact />} />
            </Routes>
        </Router>
    );
};

export default App;
