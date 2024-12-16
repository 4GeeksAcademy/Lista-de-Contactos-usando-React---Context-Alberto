import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ModContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 
    const { contactId } = useParams(); 

    // Estado local para los datos del contacto
    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    // Cargar los datos actuales del contacto
    useEffect(() => {
        const contactoActual = store.contactos.find(
            (contact) => contact.id === parseInt(contactId)
        );
        if (contactoActual) {
            setContact({
                name: contactoActual.name || "Nombre no disponible",
                phone: contactoActual.phone,
                email: contactoActual.email,
                address: contactoActual.address,
            });
        }
    }, [contactId, store.contactos]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    // Enviar los datos actualizados al servidor
    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.modificarContacto(contactId, contact); // Llama a la acción
        navigate("/contact"); // Redirige a la lista de contactos
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Modificar Contacto</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Update Contact
                </button>
            </form>
        </div>
    );
};
