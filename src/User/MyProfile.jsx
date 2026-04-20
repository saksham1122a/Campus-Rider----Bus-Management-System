import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';

const MyProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUserData(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) return <h2>Loading...</h2>;

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Bus: {userData.busNumber}</p>
    </div>
  );
};

export default MyProfile;