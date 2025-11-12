import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/sgu-api/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  const handleSave = async (user) => {
    if (user.id) {
      await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    }
    fetchUsers();
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>CRUD Usuarios SGU</h1>
      <UserForm selectedUser={selectedUser} onSave={handleSave} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
