import axios from "axios";

const API_URL = "https://server-paltech.onrender.com/contacts";

export const getContacts = () => axios.get(API_URL);
export const getContact = (id) => axios.get(`${API_URL}${id}/`);
export const createContact = (data) => axios.post(API_URL, data);
export const updateContact = (id, data) => axios.put(`${API_URL}${id}/`, data);
export const deleteContact = (id) => axios.delete(`${API_URL}${id}/`);

