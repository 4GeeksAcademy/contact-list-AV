import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const getAgendas = async () => {
    await fetch(store.baseURL + "/agendas")
      .then((response) => response.json())
      .then((data) => {
        if (!data.agendas.some((agenda) => agenda.slug === "Angy")) {
          postAgenda();
        } else {
          console.log("Este usuario ya existe");
        }
      });
  };

  const postAgenda = async () => {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: "Angy" })
    };
    await fetch(store.baseURL + "/agendas", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Nueva agenda: ", data);
      });
  };
 
  const getContacts = async () => {
    try {
      const response = await fetch(store.baseURL + "/agendas/Angy/contacts");
      const data = await response.json();
      console.log(data);

      localStorage.setItem("contacts", JSON.stringify(data.contacts));

      dispatch({
        type: "setContacts", 
        payload: data.contacts
      });
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    }
  };

  const postContact = async () => {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form) 
    };
    await fetch(store.baseURL + "/agendas/Angy/contacts", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Nuevo contacto: ", data);
        setForm({ name: "", phone: "", email: "", address: "" }); 
        getContacts(); 
      });
  };

const deleteContact = async (contactId) => {
    try {
        const response = await fetch(`${store.baseURL}/agendas/Angy/contacts/${contactId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Error borrando contacto:", text);
            return;
        }

        dispatch({
            type: "setContacts",
            payload: store.contacts.filter(c => c.id !== contactId)
        });

        console.log("Contacto eliminado:", contactId);

    } catch (err) {
        console.error("Error en el fetch deleteContact:", err);
    }
};


  const updateContact = async (contactId, updatedData) => {
    let options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedData)
    };
    await fetch(`${store.baseURL}/agendas/Angy/contacts/${contactId}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Contacto actualizado: ", data);
        dispatch({
          type: "setContacts",
          payload: store.contacts.map((c) =>
            c.id === contactId ? { ...c, ...updatedData } : c
          )
        });
      });
  };

  useEffect(() => {
    getAgendas();
    getContacts();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>¡Holiiiii!</h1>
      <Link to="/profile">Profile</Link>

      <div className="card p-3 m-3">
        <h3>Nuevo Contacto</h3>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <button className="btn btn-success" onClick={postContact}>
          Guardar
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-8">
          <ul className="list-group">
            {Array.isArray(store.contacts) &&
              store.contacts.map((contact, index) => {
                return (
                  <li className="list-group-item row" key={index}>
                    <ContactCard
                      id={contact.id}
                      name={contact.name}
                      address={contact.address}
                      phone={contact.phone}
                      email={contact.email}
                      onDelete={deleteContact} 
                      onUpdate={updateContact} 
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

