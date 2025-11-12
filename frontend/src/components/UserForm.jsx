import React, { useState, useEffect } from "react";

export default function UserForm({ selectedUser, onSave }) {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (selectedUser) setUser(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
    setUser({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={user.phone} onChange={handleChange} placeholder="Teléfono" required />
      <button type="submit">Guardar</button>
    </form>
  );
}
