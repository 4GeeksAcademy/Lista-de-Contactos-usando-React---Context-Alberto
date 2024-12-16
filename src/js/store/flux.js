const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactos: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			crearAgenda: async () => {
				try {
				  const resp = await fetch('https://playground.4geeks.com/contact/agendas/ASG', {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
				  });
				  
				  if (!resp.ok) throw new Error('error');
			  
				  
				  const data = await resp.json();
				  console.log(data);
				} catch (error) {
				  console.error("Error al añadir la tarea:", error.message);
				}
			},

			crearContacto: async (contact) => {
				try {
					const resp = await fetch("https://playground.4geeks.com/contact/agendas/ASG/contacts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: `${contact.full_name}`,
							phone:`${contact.phone}`,
							email: `${contact.email}`,
							address: `${contact.address}`
						  }),
					});
			
					if (resp.ok) {
						const nuevoContacto = await resp.json(); // Parseamos la respuesta
			
						// Agregamos el nuevo contacto al estado global
						setStore({ contactos: [...store.contactos, nuevoContacto] });
					} else {
						console.error("Error al crear el contacto:", resp.status);
					}
				} catch (error) {
					console.error("Error en la solicitud: ", error);
				}
			},

			getContactos: async () => {
				try {
				  const resp = await fetch('https://playground.4geeks.com/contact/agendas/ASG/contacts', {
					method: 'GET', // POST, PUT, DELETE
				  });
				  
				  if (!resp.ok) throw new Error('error');
			  
				  // SIEMPRE vamos a pasar nuestra respuesta a JSON
				  const data = await resp.json();
				  setStore({contactos: data.contacts});
				} catch (error) {
				  console.error("Error al añadir la tarea:", error.message);
				}
			},

			borrarContacto: async (contactId) => {
				const store = getStore();
				try {
					// Realizamos la solicitud DELETE
					const resp = await fetch(`https://playground.4geeks.com/contact/agendas/ASG/contacts/${contactId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					});
			
					if (resp.ok) {
						// Filtramos el contacto eliminado del estado global
						const contactosActualizados = store.contactos.filter(
							(contact) => contact.id !== contactId
						);
			
						// Actualizamos el estado global con los contactos restantes
						setStore({ contactos: contactosActualizados });
			
						console.log(`Contacto con ID ${contactId} eliminado correctamente`);
					} else {
						console.error("Error al eliminar el contacto:", resp.status);
					}
				} catch (error) {
					console.error("Error en la solicitud DELETE:", error.message);
				}
			},

			modificarContacto: async (contactId, updatedContact) => {
				const store = getStore();
				try {
					const resp = await fetch(
						`https://playground.4geeks.com/contact/agendas/ASG/contacts/${contactId}`,
						{
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								name: updatedContact.name,
								phone: updatedContact.phone,
								email: updatedContact.email,
								address: updatedContact.address,
							}),
						}
					);
			
					if (resp.ok) {
						const contactoActualizado = await resp.json();
						const contactosActualizados = store.contactos.map((contact) =>
							contact.id === parseInt(contactId) ? contactoActualizado : contact
						);
						setStore({ contactos: contactosActualizados });
					}
				} catch (error) {
					console.error("Error al actualizar el contacto:", error.message);
				}
			},
			

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
