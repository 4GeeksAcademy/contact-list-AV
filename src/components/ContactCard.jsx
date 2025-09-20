import React, { useState } from "react";


export const ContactCard = ({ id, name, address, phone, email, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({ name, address, phone, email })

    const handleSave = () => {
        onUpdate(id, form)
        setIsEditing(false)
    }

    return (
        <div className="d-flex justify-content-between align-items-center p-2">
            {isEditing ? (
                <div className="flex-grow-1">
                    <input
                        className="form-control mb-1"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="form-control mb-1"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <input
                        className="form-control mb-1"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        className="form-control mb-1"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                    <button className="btn btn-success btn-sm me-2" onClick={handleSave}>💾 Guardar</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>❌ Cancelar</button>
                </div>
            ) : (
                <div className="flex-grow-1">
                    <h5>{name}</h5>
                    <p>{phone}</p>
                    <p>{email}</p>
                    <p>{address}</p>
                </div>
            )}

            <div className="ms-2">
                {!isEditing && (
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setIsEditing(true)}>✏️ Editar</button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>🗑️ Borrar</button>
            </div>
        </div>
    )
}
