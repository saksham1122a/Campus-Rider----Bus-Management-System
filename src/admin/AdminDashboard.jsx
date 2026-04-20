import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/all-users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const grouped = users.reduce((acc, user) => {
    acc[user.busNumber] = acc[user.busNumber] || [];
    acc[user.busNumber].push(user);
    return acc;
  }, {});

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      {Object.keys(grouped).map((bus, i) => (
        <div key={i} className="bus-group">
          <h2>Bus: {bus}</h2>

          {grouped[bus].map((user, j) => (
            <p key={j}>{user.name} - {user.email}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;