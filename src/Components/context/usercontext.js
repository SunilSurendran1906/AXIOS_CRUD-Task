import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext({
  data: [],
  name: [],
  setData: () => {},
  setName: () => {},
  AddtoTable: () => {},
  deleteData: () => {},
});

const API = "https://jsonplaceholder.typicode.com/users";

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const AddtoTable = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const deleteData = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const UpdateData = data.filter((user) => user.id !== id);
        setData(UpdateData);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const value = {
    data,
    name,
    setName,
    setData,
    AddtoTable,
    deleteData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
