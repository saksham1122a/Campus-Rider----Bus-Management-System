import { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { useBusData } from '../contexts/BusDataContext';
import './MyBus.css';

const MyBus = () => {
  const { user: authUser } = useAuth();
  const { busData, loading, error, getUserBusInfo } = useBusData();
  const [userBusData, setUserBusData] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Enhanced bus data with more creative information
  const getEnhancedBusData = (busInfo) => {
    const routeData = getRouteData(busInfo?.bus?.id || 6);
    const bus = busInfo?.bus || {};
    
    return {
      ...busInfo,
      // Use actual bus data from getUserBusInfo
      busNumber: authUser?.busNumber || busInfo?.bus?.id || 6,
      busName: bus?.name || `Bus ${authUser?.busNumber || busInfo?.bus?.id || 6}`,
      driver: bus?.driver || 'Transport Supervisor',
      capacity: bus?.capacity || 60,
      currentPassengers: bus?.currentPassengers || 0,
      nextStop: bus?.nextStop || 'Main Stop',
      route: bus?.route ? `${bus.route} → ${bus.destination || 'College'}` : 'Campus Route',
      status: 'On Time', // Always show On Time
      busType: bus?.features?.includes('AC') ? 'AC' : 'Non-AC',
      registrationNumber: bus?.name?.match(/\(([^)]+)\)/)?.[1] || 'PB10-7889',
      arrivalTime: bus?.arrivalTime || '07:55 AM',
      features: bus?.features || [],
      // Enhanced route information
      fullRoute: routeData?.stops || [],
      totalStops: routeData?.stops?.length || 5,
      estimatedArrival: calculateETA(routeData?.stops),
      currentProgress: calculateProgress(routeData?.stops),
      // Enhanced passenger information
      occupancyRate: bus?.capacity ? Math.round((bus.currentPassengers / bus.capacity) * 100) : 0,
      availableSeats: bus?.capacity ? bus.capacity - bus.currentPassengers : 0,
      crowdLevel: getCrowdLevel(bus?.currentPassengers || 0, bus?.capacity || 60),
      // Enhanced timing information
      delayStatus: calculateDelay(bus?.arrivalTime),
      // Weather and conditions
      weatherCondition: getWeatherCondition(),
      trafficCondition: getTrafficCondition(),
      // Safety features
      safetyFeatures: ['GPS Tracking', 'Emergency Button', 'CCTV', 'Fire Extinguisher'],
      lastMaintenance: getLastMaintenanceDate(),
      nextMaintenance: getNextMaintenanceDate()
    };
  };

  // Mock API functions for enhanced data
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

  const calculateETA = (stops) => {
    if (!stops || stops.length === 0) return "Calculating...";
    const nextStopIndex = Math.floor(Math.random() * (stops.length - 1)) + 1;
    return stops[nextStopIndex]?.time || "Unknown";
  };

  const calculateProgress = (stops) => {
    if (!stops || stops.length === 0) return 0;
    const totalDistance = stops[stops.length - 1]?.distance || 100;
    const currentDistance = Math.floor(Math.random() * totalDistance * 0.8);
    return Math.round((currentDistance / totalDistance) * 100);
  };

  const getCrowdLevel = (passengers, capacity) => {
    const percentage = (passengers / capacity) * 100;
    if (percentage < 30) return { level: 'Low', color: '#22c55e', icon: '🟢' };
    if (percentage < 60) return { level: 'Moderate', color: '#facc15', icon: '🟡' };
    if (percentage < 90) return { level: 'High', color: '#f97316', icon: '🟠' };
    return { level: 'Full', color: '#ef4444', icon: '🔴' };
  };

  const calculateDelay = (scheduledTime) => {
    // Always return "On Time" status
    return { minutes: 0, status: 'On Time', color: '#22c55e' };
  };

  const getWeatherCondition = () => {
    const conditions = ['Clear', 'Partly Cloudy', 'Sunny', 'Light Rain'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  const getTrafficCondition = () => {
    const conditions = ['Light', 'Moderate', 'Heavy', 'Clear'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  const getLastMaintenanceDate = () => {
    const days = Math.floor(Math.random() * 30) + 1;
    return `${days} days ago`;
  };

  const getNextMaintenanceDate = () => {
    const days = Math.floor(Math.random() * 60) + 30;
    return `In ${days} days`;
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setRealTimeData({
        timestamp: new Date(),
        temperature: Math.floor(Math.random() * 10) + 20, // 20-30°C
        humidity: Math.floor(Math.random() * 30) + 40, // 40-70%
        gpsCoordinates: {
          lat: (30.7 + Math.random() * 0.1).toFixed(6),
          lng: (76.7 + Math.random() * 0.1).toFixed(6)
        }
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('MyBus: authUser:', authUser);
    console.log('MyBus: busData from context:', busData);
    
    if (!authUser || !authUser.busNumber) {
      setUserBusData(null);
      return;
    }
  
    const busInfo = getUserBusInfo(authUser.busNumber);
    console.log('=== MY BUS DATA FETCH ===');
    console.log('Auth user data:', authUser);
    console.log('User bus number from auth:', authUser?.busNumber);
    console.log('Bus info from getUserBusInfo:', busInfo);
    console.log('Bus object inside busInfo:', busInfo?.bus);
    console.log('Available buses:', busData);
    console.log('=== END DEBUG ===');
  
    if (busInfo) {
      const enhancedData = getEnhancedBusData(busInfo);
      console.log('Enhanced bus data:', enhancedData);
      setUserBusData(enhancedData);
    }
  }, [authUser, busData]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'on time': return '#22c55e';
      case 'delayed': return '#ef4444';
      case 'arrived': return '#facc15';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'on time': return '🟢';
      case 'delayed': return '🔴';
      case 'arrived': return '🟡';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="my-bus-page">
        <div className="loading-state">
          <div className="loading-spinner">🚌</div>
          <p>Loading bus information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-bus-page">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>Error loading bus information: {error}</p>
        </div>
      </div>
    );
  }

  if (!userBusData) {
    return (
      <div className="my-bus-page">
        <div className="error-state">
          <div className="error-icon">🚌</div>
          <p>No bus data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bus-page enhanced">
      <div className="page-header">
        <h1 className="page-title">My Bus</h1>
        <p className="page-subtitle">Real-time Bus Information</p>
        {lastUpdate && (
          <div className="last-update">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Real-time Status Banner */}
      <div className="status-banner">
        <div className="status-item">
          <span className="status-icon">🚌</span>
          <span className="status-text">Bus {userBusData?.busNumber}</span>
        </div>
        <div className="status-item">
          <span className="status-icon" style={{ color: userBusData?.delayStatus?.color }}>
            {userBusData?.delayStatus?.status === 'On Time' ? '✅' : userBusData?.delayStatus?.status === 'Early' ? '🟢' : '⚠️'}
          </span>
          <span className="status-text">{userBusData?.delayStatus?.status}</span>
        </div>
        <div className="status-item">
          <span className="status-icon">⏱️</span>
          <span className="status-text">ETA: {userBusData?.estimatedArrival}</span>
        </div>
      </div>

      
      {/* Enhanced Bus Details Grid */}
      <div className="bus-details-grid enhanced">

        {/* Passenger Information Card */}
        <div className="detail-card passenger-card">
          <div className="card-header">
            <span className="card-icon">👥</span>
            <h3>Passenger Information</h3>
          </div>
          <div className="card-content">
            <div className="passenger-stats">
              <div className="stat-item">
                <span className="stat-number">{userBusData?.currentPassengers}</span>
                <span className="stat-label">Current</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userBusData?.capacity}</span>
                <span className="stat-label">Capacity</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userBusData?.availableSeats}</span>
                <span className="stat-label">Available</span>
              </div>
            </div>
            <div className="occupancy-bar">
              <div className="occupancy-label">Occupancy Rate</div>
              <div className="occupancy-progress">
                <div 
                  className="occupancy-fill" 
                  style={{ 
                    width: `${userBusData?.occupancyRate || 0}%`,
                    backgroundColor: userBusData?.crowdLevel?.color
                  }}
                ></div>
              </div>
              <div className="occupancy-text">
                {userBusData?.crowdLevel?.icon} {userBusData?.occupancyRate}% ({userBusData?.crowdLevel?.level})
              </div>
            </div>
          </div>
        </div>

        {/* Conditions Card */}
        <div className="detail-card conditions-card">
          <div className="card-header">
            <span className="card-icon">🌤️</span>
            <h3>Conditions</h3>
          </div>
          <div className="card-content">
            <div className="condition-item">
              <span className="condition-icon">☀️</span>
              <span className="condition-label">Weather</span>
              <span className="condition-value">{userBusData?.weatherCondition}</span>
            </div>
            <div className="condition-item">
              <span className="condition-icon">🚦</span>
              <span className="condition-label">Traffic</span>
              <span className="condition-value">{userBusData?.trafficCondition}</span>
            </div>
            {realTimeData && (
              <>
                <div className="condition-item">
                  <span className="condition-icon">🌡️</span>
                  <span className="condition-label">Temperature</span>
                  <span className="condition-value">{realTimeData.temperature}°C</span>
                </div>
                <div className="condition-item">
                  <span className="condition-icon">💧</span>
                  <span className="condition-label">Humidity</span>
                  <span className="condition-value">{realTimeData.humidity}%</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Safety Features Card */}
        <div className="detail-card safety-card">
          <div className="card-header">
            <span className="card-icon">🛡️</span>
            <h3>Safety Features</h3>
          </div>
          <div className="card-content">
            <div className="safety-features">
              {userBusData?.safetyFeatures?.map((feature, index) => (
                <div key={index} className="safety-feature">
                  <span className="feature-icon">✅</span>
                  <span className="feature-name">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="route-section">
        <h3 className="section-title">Route Information</h3>
        <div className="route-simple">
          <div className="route-item">
            <span className="route-icon">📍</span>
            <span className="route-text">{userBusData?.route || 'Campus Route'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBus;