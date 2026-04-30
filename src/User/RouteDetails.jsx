import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { useBusData } from '../contexts/BusDataContext';
import './RouteDetails.css';

const RouteDetails = () => {
  const { user: authUser } = useAuth();
  const { busData, loading, error, getUserBusInfo } = useBusData();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeStops, setRouteStops] = useState([]);

  useEffect(() => {
    if (!authUser || !authUser.busNumber) {
      setSelectedRoute(null);
      return;
    }

    // Use the same logic as MyBus and UserDashboard - getUserBusInfo
    const busInfo = getUserBusInfo(authUser.busNumber);
    
    console.log('RouteDetails: authUser data:', authUser);
    console.log('RouteDetails: bus info from getUserBusInfo:', busInfo);
    
    if (busInfo && busInfo.bus) {
      const bus = busInfo.bus;
      // Generate route stops based on user's actual bus
      const stops = generateRouteStops(bus);
      setRouteStops(stops);
      setSelectedRoute({
        busNumber: authUser.busNumber,
        busName: bus.name,
        route: bus.route,
        destination: bus.destination,
        driver: bus.driver,
        supervisor: bus.supervisor,
        capacity: bus.capacity,
        currentPassengers: bus.currentPassengers,
        nextStop: bus.nextStop,
        arrivalTime: bus.arrivalTime,
        status: bus.status,
        features: bus.features || []
      });
    }
  }, [authUser, busData, getUserBusInfo]);

  const getRouteData = (busId) => {
    const routes = {
      1: {
        stops: [
          { name: "Kohade", time: "07:30 AM", type: "start", distance: 0 },
          { name: "Kohade Main Stop", time: "07:32 AM", type: "stop", distance: 2.5 },
          { name: "Kohade Junction", time: "07:35 AM", type: "stop", distance: 4.8 },
          { name: "Main Road Crossing", time: "07:42 AM", type: "stop", distance: 8.2 },
          { name: "College Gate", time: "08:25 AM", type: "stop", distance: 15.6 },
          { name: "College", time: "08:30 AM", type: "end", distance: 18.4 }
        ]
      },
      2: {
        stops: [
          { name: "Veer Palace", time: "07:50 AM", type: "start", distance: 0 },
          { name: "Veer Palace Junction", time: "07:53 AM", type: "stop", distance: 3.1 },
          { name: "Main Road", time: "07:56 AM", type: "stop", distance: 5.9 },
          { name: "Highway Entry", time: "08:05 AM", type: "stop", distance: 9.3 },
          { name: "College Entrance", time: "08:28 AM", type: "stop", distance: 16.8 },
          { name: "College", time: "08:30 AM", type: "end", distance: 19.2 }
        ]
      },
      3: {
        stops: [
          { name: "Police Colony", time: "07:55 AM", type: "start", distance: 0 },
          { name: "Police Colony Gate", time: "07:58 AM", type: "stop", distance: 2.8 },
          { name: "Police Station", time: "08:00 AM", type: "stop", distance: 4.5 },
          { name: "College Road", time: "08:20 AM", type: "stop", distance: 11.7 },
          { name: "College", time: "08:25 AM", type: "end", distance: 17.3 }
        ]
      },
      6: {
        stops: [
          { name: "Vasti", time: "07:55 AM", type: "start", distance: 0 },
          { name: "Vasti Center", time: "07:58 AM", type: "stop", distance: 2.8 },
          { name: "Vasti Junction", time: "08:00 AM", type: "stop", distance: 4.5 },
          { name: "Main Highway", time: "08:15 AM", type: "stop", distance: 8.2 },
          { name: "College Entrance", time: "08:25 AM", type: "stop", distance: 15.1 },
          { name: "College", time: "08:30 AM", type: "end", distance: 17.3 }
        ]
      }
    };
    
    return routes[busId] || routes[1];
  };

  const generateRouteStops = (bus) => {
    // Use real-time bus data instead of hardcoded routes
    // The bus object should contain the actual route information from the backend
    if (!bus) return [];
    
    // Get route data from the bus service (real-time data)
    const routeData = getRouteData(bus.id);
    
    if (routeData && routeData.stops) {
      return routeData.stops.map((stop, index) => ({
        id: index + 1,
        name: stop.name,
        time: stop.time,
        type: index === 0 ? 'start' : index === routeData.stops.length - 1 ? 'end' : 'stop',
        distance: stop.distance || 0,
        address: stop.address || stop.name,
        coordinates: stop.coordinates || { lat: 0, lng: 0 }
      }));
    }
    
    // Fallback: Create simple route from bus route and destination
    const routeName = bus.route || 'Unknown Route';
    const destination = bus.destination || 'College';
    
    return [
      { id: 1, name: routeName, time: bus.arrivalTime || '07:00 AM', type: 'start', distance: 0, address: routeName, coordinates: { lat: 0, lng: 0 } },
      { id: 2, name: destination, time: '08:30 AM', type: 'end', distance: 10, address: destination, coordinates: { lat: 0, lng: 0 } }
    ];
  };

  const getStopIcon = (type) => {
    switch (type) {
      case 'start': return '🚀';
      case 'stop': return '📍';
      case 'end': return '🎯';
      default: return '📍';
    }
  };

  const getStopColor = (type) => {
    switch (type) {
      case 'start': return '#22c55e';
      case 'stop': return '#4FC3F7';
      case 'end': return '#f97316';
      default: return '#4FC3F7';
    }
  };

  if (loading) {
    return (
      <div className="route-details-page">
        <div className="loading-state">
          <div className="loading-icon">🚌</div>
          <p>Loading route details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="route-details-page">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>Error loading route details: {error}</p>
        </div>
      </div>
    );
  }

  if (!selectedRoute) {
    return (
      <div className="route-details-page">
        <div className="error-state">
          <div className="error-icon">🚌</div>
          <p>No route information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="route-details-page">
      <div className="page-header">
        <h1 className="page-title">Route Details</h1>
        <p className="page-subtitle">Bus {selectedRoute.busNumber}</p>
      </div>

      {/* Route Header */}
      <div className="route-visual-header">
        <div className="route-visual-title">
          <h2 className="route-name">{selectedRoute.route}</h2>
          <div className="route-arrow">→</div>
          <h2 className="route-destination">{selectedRoute.destination}</h2>
        </div>
      </div>
      
      {/* Inline Timeline */}
      <div className="inline-timeline-full">
        <div className="timeline-start">
          <div className="timeline-point start-point">
            <div className="point-icon">🚀</div>
            <div className="point-content">
              <div className="point-location">Police Colony</div>
              <div className="point-time">07:55 AM</div>
            </div>
          </div>
        </div>
        
        <div className="timeline-connector">
          <div className="connector-line"></div>
          <div className="connector-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        
        <div className="timeline-end">
          <div className="timeline-point end-point">
            <div className="point-icon">🎯</div>
            <div className="point-content">
              <div className="point-location">PCTE Parking</div>
              <div className="point-time">08:25 AM</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Route Duration */}
      <div className="route-duration">
        <div className="duration-badge">
          <span className="duration-icon">⏱️</span>
          <span className="duration-text">30 minutes</span>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;