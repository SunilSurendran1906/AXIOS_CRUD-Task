import React, { useState } from "react";
import { useUserContext } from "./context/usercontext";
import axios from "axios";

function ListPages() {
  const { data, deleteData, setData } = useUserContext();
  const [editingUser, setEditingUser] = useState(null);

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleSaveClick = () => {
    const {
      id,
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
    } = editingUser;

    axios
      .patch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        name: editedName,
        email: editedEmail,
        phone: editedPhone,
      })
      .then((res) => {
        console.log(res);

        const updatedData = data.map((user) =>
          user.id === id
            ? {
                ...user,
                name: editedName,
                email: editedEmail,
                phone: editedPhone,
              }
            : user
        );
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setEditingUser(null);
  };

  const handleCancelClick = () => {
    setEditingUser(null);
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
          {data.map((user, index) => {
            const isEditing = editingUser && editingUser.id === user.id;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editingUser.phone}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          phone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteData(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListPages;
