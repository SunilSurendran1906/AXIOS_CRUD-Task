import React, { useState } from "react";
import { useUserContext } from "./context/usercontext";
import axios from "axios";

function ListPages() {
  const { data, handleDelete, handleUpdate } = useUserContext();
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedPhone(user.phone);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingUserId) {
      handleUpdate(editingUserId, {
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
      });
      setEditingUserId(null);
    }
  };

  return (
    <div className="table-list px-2">
      <table className="table-list px-2">
        <thead>
          <tr className="table-row">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={updatedPhone}
                    onChange={(e) => setUpdatedPhone(e.target.value)}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleEditSubmit}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPages;
