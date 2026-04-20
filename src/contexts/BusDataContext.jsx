import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import busDataService from '../services/BusDataService';

const BusDataContext = createContext();

export const useBusData = () => {
  const context = useContext(BusDataContext);
  if (!context) {
    throw new Error('useBusData must be used within a BusDataProvider');
  }
  return context;
};

export const BusDataProvider = ({ children }) => {
  const [busData, setBusData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Initialize mock data
        busDataService.initializeMockData();
        
        // Subscribe to real-time updates
        unsubscribeRef.current = busDataService.subscribe((buses, routes) => {
          setBusData(buses);
          setRouteData(routes);
          setStatistics(busDataService.getBusStatistics());
          setLoading(false);
        });

        // Start real-time updates
        busDataService.startRealTimeUpdates();

      } catch (err) {
        console.error('Error initializing bus data:', err);
        setError(err.message || 'Failed to load bus data');
        setLoading(false);
      }
    };

    initializeData();

    // Cleanup
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      busDataService.stopRealTimeUpdates();
    };
  }, []);

  // Get user's bus information
  const getUserBusInfo = (userBusNumber) => {
    return busDataService.getUserBusInfo(userBusNumber);
  };

  // Get bus by number
  const getBusByNumber = (busNumber) => {
    return busDataService.getBusByNumber(busNumber);
  };

  // Get bus passengers
  const getBusPassengers = (busNumber) => {
    return busDataService.getBusPassengers(busNumber);
  };

  // Get bus location
  const getBusLocation = (busId) => {
    return busDataService.getBusLocation(busId);
  };

  // Refresh data
  const refreshData = () => {
    busDataService.simulateRealTimeUpdate();
  };

  const value = {
    busData,
    routeData,
    loading,
    error,
    statistics,
    getUserBusInfo,
    getBusByNumber,
    getBusPassengers,
    getBusLocation,
    refreshData
  };

  return (
    <BusDataContext.Provider value={value}>
      {children}
    </BusDataContext.Provider>
  );
};

export default BusDataContext;
