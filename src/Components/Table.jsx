import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [users, setUsers] = useState([]);



  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        console.log(response.data,'test')
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

 
  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      let filtered = users;

      if (searchId) {
        filtered = filtered.filter((user) =>
          user.id.toString().includes(searchId)
        );
      }

      if (searchName) {
        filtered = filtered.filter((user) =>
          user.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      setFilteredUsers(filtered);

    }, 300); 

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout); 
  }, [searchId, searchName, users]);

 
  const handleDelete = (id) => {
    const updatedUsers = filteredUsers.filter((user) => user.id !== id);
    setFilteredUsers(updatedUsers);
  };


  const handleReset = () => {
    setFilteredUsers(users); 
    setSearchId(""); 
    setSearchName(""); 
  };

  return (
    <div>
      <h1>User Table</h1>

      <div>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleReset}>Reset</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
                { console.log(user.id,'test')}
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
