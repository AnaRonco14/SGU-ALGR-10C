import React from "react";

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
            <td>
              <button onClick={() => onEdit(u)}>Editar</button>
              <button onClick={() => onDelete(u.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
