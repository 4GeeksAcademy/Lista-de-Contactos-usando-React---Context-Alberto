import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
    const { actions } = useContext(Context); // Obtenemos las acciones del contexto
    const navigate = useNavigate(); 

    // Estado local para manejar los valores del formulario
    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Manejamos los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llamamos a la acción para crear un contacto
        await actions.crearContacto(contact);
        navigate("/contact");
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Add a new contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="full_name"
                        name="full_name"
                        placeholder="Full Name"
                        value={contact.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Enter address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Save
                </button>
            </form>
            <div className="text-center mt-3">
                <a href="/contact" className="text-decoration-none">
                    or get back to contacts
                </a>
            </div>
        </div>
    );
};
