import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyBus.css';

const MyBus = () => {
  const [busData, setBusData] = useState(null);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const busRes = await axios.get(
          `http://localhost:5000/api/auth/bus/${userRes.data.busNumber}`
        );

        setBusData({
          busNumber: userRes.data.busNumber,
          passengers: busRes.data.length
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchBus();
  }, []);

  if (!busData) return <h2>Loading...</h2>;

  return (
    <div className="bus">
      <h1>My Bus</h1>
      <p>Bus Number: {busData.busNumber}</p>
      <p>Total Passengers: {busData.passengers}</p>
    </div>
  );
};

export default MyBus;