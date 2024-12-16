import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard.jsx";
import { Link } from "react-router-dom"; // Importamos Link para la navegación

export const Contact = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Llamamos a la acción para obtener los contactos al cargar el componente
        actions.getContactos();
    }, []);

    return (
        <div className="container mt-5">
            {/* Botón para añadir un nuevo contacto */}
            <div className="d-flex justify-content-end mb-3">
                <Link to="/AddContact" className="btn btn-success">
                    Add new contact
                </Link>
            </div>

            {/* Renderizar contactos */}
            {store.contactos && store.contactos.length > 0 ? (
                store.contactos.map((contact) => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        onEdit={() => console.log("Editar contacto:", contact.id)}
                        onDelete={() => console.log("Eliminar contacto:", contact.id)}
                    />
                ))
            ) : (
                <p className="text-center">No hay contactos disponibles.</p>
            )}
        </div>
    );
};
