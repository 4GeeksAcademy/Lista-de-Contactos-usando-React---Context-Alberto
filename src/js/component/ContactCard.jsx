import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context); // Extrae las acciones del contexto
    const navigate = useNavigate(); // Hook para redirigir a otra vista

    return (
        <div className="card mb-3 shadow-sm" style={{ borderRadius: "15px" }}>
            <div className="row g-0">
                {/* Columna de la imagen */}
                <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="img-fluid rounded-circle p-2"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                </div>

                {/* Columna de la información y botones */}
                <div className="col-md-9">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                            {/* Nombre del contacto */}
                            <h5 className="card-title mb-3">{contact.name || "Nombre no disponible"}</h5>
                            {/* Botones arriba a la derecha */}
                            <div>
                                <button
                                    className="btn btn-outline-primary btn-sm me-2"
                                    onClick={() => navigate(`/ModContact/${contact.id}`)} // Redirige a ModContact
                                >
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => actions.borrarContacto(contact.id)} // Llama a borrarContacto
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>

                        {/* Información del contacto */}
                        <p className="card-text mb-1">
                            <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                            {contact.address}
                        </p>
                        <p className="card-text mb-1">
                            <i className="fas fa-phone me-2 text-muted"></i>
                            {contact.phone}
                        </p>
                        <p className="card-text mb-1">
                            <i className="fas fa-envelope me-2 text-muted"></i>
                            {contact.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.number.isRequired,
        full_name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
};
