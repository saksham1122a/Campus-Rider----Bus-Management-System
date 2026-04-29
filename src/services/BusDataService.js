// Real-time Bus Data Service
import axios from 'axios';

class BusDataService {
  constructor() {
    this.subscribers = [];
    this.busData = [];
    this.routeData = [];
    this.realTimeUpdates = null;
    this.lastUpdate = null;
  }

  // Initialize with mock data from Buses.jsx and BusRoutes.jsx
  initializeMockData() {
    // Bus data from Buses.jsx
    this.busData = [
      {
        id: 1,
        name: "Bus 8 (1455)",
        route: "Kohade",
        destination: "PCTE Parking",
        supervisor: "Campus Operations",
        status: "active",
        capacity: 55,
        currentPassengers: 28,
        nextStop: "Kohade Road",
        arrivalTime: "07:30 AM",
        features: ["Camera", "GPS", "Tracking"],
        color: "#4FC3F7",
        driver: "Rajesh Kumar",
        lastUpdated: new Date()
      },
      {
        id: 2,
        name: "Bus 7 (9755)",
        route: "Veer Palace",
        destination: "PCTE Parking",
        supervisor: "Transport Manager",
        status: "active",
        capacity: 60,
        currentPassengers: 32,
        nextStop: "Veer Palace Junction",
        arrivalTime: "07:50 AM",
        features: ["WiFi", "AC", "USB Charging"],
        color: "#1F8FA3",
        driver: "Amit Sharma",
        lastUpdated: new Date()
      },
      {
        id: 3,
        name: "Bus 6 (1855)",
        route: "Police Colony",
        destination: "PCTE Parking",
        supervisor: "Fleet Manager",
        status: "active",
        capacity: 60,
        currentPassengers: 35,
        nextStop: "Police Colony Gate",
        arrivalTime: "07:55 AM",
        features: ["WiFi", "AC", "Security"],
        color: "#ff6b35",
        driver: "Vikram Singh",
        lastUpdated: new Date()
      },
      {
        id: 4,
        name: "Bus 16 (1155)",
        route: "Samrala Chowk",
        destination: "PCTE Parking",
        supervisor: "Operations Head",
        status: "active",
        capacity: 60,
        currentPassengers: 38,
        nextStop: "Samrala Chowk",
        arrivalTime: "08:04 AM",
        features: ["WiFi", "AC", "Live Tracking"],
        color: "#87CEEB",
        driver: "Anil Verma",
        lastUpdated: new Date()
      },
      {
        id: 5,
        name: "Bus 9 (9055)",
        route: "Sherpur",
        destination: "PCTE Parking",
        supervisor: "Route Coordinator",
        status: "active",
        capacity: 60,
        currentPassengers: 30,
        nextStop: "Sherpur Main",
        arrivalTime: "07:55 AM",
        features: ["WiFi", "AC", "Priority Seating"],
        color: "#4FC3F7",
        driver: "Mohan Das",
        lastUpdated: new Date()
      },
      {
        id: 6,
        name: "Bus 13 (7889)",
        route: "Vasti",
        destination: "PCTE Parking",
        supervisor: "Transport Supervisor",
        status: "active",
        capacity: 60,
        currentPassengers: 28,
        nextStop: "Vasti Center",
        arrivalTime: "07:55 AM",
        features: ["WiFi", "AC", "GPS"],
        color: "#134e4a",
        driver: "Ramesh Patel",
        lastUpdated: new Date()
      },
      {
        id: 7,
        name: "Bus 12 (1555)",
        route: "Kalash Nagar",
        destination: "PCTE Parking",
        supervisor: "Logistics Manager",
        status: "active",
        capacity: 60,
        currentPassengers: 40,
        nextStop: "Kalash Nagar",
        arrivalTime: "08:00 AM",
        features: ["WiFi", "AC", "USB"],
        color: "#4FC3F7",
        driver: "Suresh Kumar",
        lastUpdated: new Date()
      },
      {
        id: 8,
        name: "Bus 10 (0489)",
        route: "Kapoor",
        destination: "PCTE Parking",
        supervisor: "Operations Lead",
        status: "active",
        capacity: 60,
        currentPassengers: 25,
        nextStop: "Kapoor Junction",
        arrivalTime: "07:55 AM",
        features: ["WiFi", "AC", "Tracking"],
        color: "#1F8FA3",
        driver: "Prakash Singh",
        lastUpdated: new Date()
      },
      {
        id: 9,
        name: "Bus 18",
        route: "Dugri",
        destination: "PCTE Parking",
        supervisor: "Fleet Coordinator",
        status: "active",
        capacity: 60,
        currentPassengers: 35,
        nextStop: "Dugri Road",
        arrivalTime: "08:05 AM",
        features: ["WiFi", "AC", "GPS"],
        color: "#ff6b35",
        driver: "Deepak Kumar",
        lastUpdated: new Date()
      },
      {
        id: 10,
        name: "Bus 15 & 14 (5679, 3445)",
        route: "Jugraon",
        destination: "PCTE Parking",
        supervisor: "Transport Team Lead",
        status: "active",
        capacity: 60,
        currentPassengers: 65,
        nextStop: "Jugraon Junction",
        arrivalTime: "08:00 AM",
        features: ["WiFi", "AC", "Live Tracking"],
        color: "#87CEEB",
        driver: "Ravi Kumar & Arun Singh",
        lastUpdated: new Date()
      }
    ];

    // Route data from BusRoutes.jsx
    this.routeData = [
      {
        id: 1,
        name: "Bus 8",
        driver: "Rajesh Kumar",
        color: "#4FC3F7",
        stops: [
          { name: "Kohade", time: "07:30 AM", type: "start" },
          { name: "Kohade Main Stop", time: "07:32 AM", type: "stop" },
          { name: "Kohade Junction", time: "07:35 AM", type: "stop" },
          { name: "College Gate", time: "08:25 AM", type: "stop" },
          { name: "College", time: "08:30 AM", type: "end" }
        ]
      },
      {
        id: 2,
        name: "Bus 7",
        driver: "Amit Sharma",
        color: "#1F8FA3",
        stops: [
          { name: "Veer Palace", time: "07:50 AM", type: "start" },
          { name: "Veer Palace Junction", time: "07:53 AM", type: "stop" },
          { name: "Main Road", time: "07:56 AM", type: "stop" },
          { name: "College Entrance", time: "08:28 AM", type: "stop" },
          { name: "College", time: "08:30 AM", type: "end" }
        ]
      },
      {
        id: 3,
        name: "Bus 6",
        driver: "Vikram Singh",
        color: "#ff6b35",
        stops: [
          { name: "Police Colony", time: "07:55 AM", type: "start" },
          { name: "Police Colony Gate", time: "07:58 AM", type: "stop" },
          { name: "Police Station", time: "08:00 AM", type: "stop" },
          { name: "College Road", time: "08:20 AM", type: "stop" },
          { name: "College", time: "08:25 AM", type: "end" }
        ]
      },
      {
        id: 4,
        name: "Bus 16",
        driver: "Anil Verma",
        color: "#87CEEB",
        stops: [
          { name: "Samrala Chowk", time: "08:04 AM", type: "start" },
          { name: "Samrala Main", time: "08:07 AM", type: "stop" },
          { name: "Samrala Market", time: "08:10 AM", type: "stop" },
          { name: "College Avenue", time: "08:25 AM", type: "stop" },
          { name: "College", time: "08:35 AM", type: "end" }
        ]
      },
      {
        id: 5,
        name: "Bus 9",
        driver: "Mohan Das",
        color: "#4FC3F7",
        stops: [
          { name: "Sherpur", time: "07:55 AM", type: "start" },
          { name: "Sherpur Main", time: "07:58 AM", type: "stop" },
          { name: "Sherpur Center", time: "08:01 AM", type: "stop" },
          { name: "College Road", time: "08:24 AM", type: "stop" },
          { name: "College", time: "08:26 AM", type: "end" }
        ]
      },
      {
        id: 6,
        name: "Bus 13",
        driver: "Ramesh Patel",
        color: "#134e4a",
        stops: [
          { name: "Vasti", time: "07:55 AM", type: "start" },
          { name: "Vasti Center", time: "07:58 AM", type: "stop" },
          { name: "Vasti Market", time: "08:01 AM", type: "stop" },
          { name: "College Gate", time: "08:24 AM", type: "stop" },
          { name: "College", time: "08:26 AM", type: "end" }
        ]
      }
    ];

    this.notifySubscribers();
  }

  // Subscribe to data updates
  subscribe(callback) {
    this.subscribers.push(callback);
    callback(this.busData, this.routeData);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Notify all subscribers
  notifySubscribers() {
    this.subscribers.forEach(callback => {
      callback(this.busData, this.routeData);
    });
  }

  // Get bus by number
  getBusByNumber(busNumber) {
    return this.busData.find(bus => 
      bus.name.toLowerCase().includes(busNumber.toLowerCase()) ||
      bus.name.includes(busNumber)
    );
  }

  // Get bus by ID
  getBusById(busId) {
    return this.busData.find(bus => bus.id === busId);
  }

  // Get route by bus ID
  getRouteByBusId(busId) {
    return this.routeData.find(route => route.id === busId);
  }

  // Get passengers for a specific bus
  getBusPassengers(busNumber) {
    const bus = this.getBusByNumber(busNumber);
    if (!bus) return [];

    // Simulate passenger data
    const passengers = [];
    const passengerCount = bus.currentPassengers;
    
    for (let i = 0; i < passengerCount; i++) {
      passengers.push({
        id: i + 1,
        name: `Student ${i + 1}`,
        email: `student${i + 1}@campus.com`,
        busNumber: bus.name,
        status: 'active',
        boardedTime: `${7 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} AM`
      });
    }
    
    return passengers;
  }

  // Get current location of bus
  getBusLocation(busId) {
    const bus = this.getBusById(busId);
    const route = this.getRouteByBusId(busId);
    
    if (!bus || !route) return null;

    // Simulate current location based on time
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    // Find current stop based on time
    let currentStopIndex = 0;
    route.stops.forEach((stop, index) => {
      const [stopHour, stopMinute] = stop.time.split(':').map(t => parseInt(t));
      const stopTimeInMinutes = stopHour * 60 + stopMinute;
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      
      if (currentTimeInMinutes >= stopTimeInMinutes) {
        currentStopIndex = index;
      }
    });

    return {
      busId: bus.id,
      busName: bus.name,
      currentStop: route.stops[Math.min(currentStopIndex, route.stops.length - 1)],
      nextStop: route.stops[Math.min(currentStopIndex + 1, route.stops.length - 1)],
      progress: (currentStopIndex / (route.stops.length - 1)) * 100,
      lastUpdated: new Date()
    };
  }

  // Start real-time updates
  startRealTimeUpdates() {
    if (this.realTimeUpdates) return;

    this.realTimeUpdates = setInterval(() => {
      this.simulateRealTimeUpdate();
    }, 30000); // Update every 30 seconds for maximum performance
  }

  // Stop real-time updates
  stopRealTimeUpdates() {
    if (this.realTimeUpdates) {
      clearInterval(this.realTimeUpdates);
      this.realTimeUpdates = null;
    }
  }

  // Simulate real-time data updates
  simulateRealTimeUpdate() {
    // Update passenger counts randomly
    this.busData = this.busData.map(bus => {
      const passengerChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const newPassengerCount = Math.max(0, Math.min(bus.capacity, bus.currentPassengers + passengerChange));
      
      // Update next stop randomly
      const nextStops = ["Main Gate", "Library", "Science Block", "Engineering Block", "Cafeteria", "Sports Complex"];
      const randomNextStop = nextStops[Math.floor(Math.random() * nextStops.length)];
      
      return {
        ...bus,
        currentPassengers: newPassengerCount,
        nextStop: randomNextStop,
        lastUpdated: new Date()
      };
    });

    this.lastUpdate = new Date();
    this.notifySubscribers();
  }

  // Get bus statistics
  getBusStatistics() {
    const totalBuses = this.busData.length;
    const activeBuses = this.busData.filter(bus => bus.status === 'active').length;
    const totalCapacity = this.busData.reduce((sum, bus) => sum + bus.capacity, 0);
    const totalPassengers = this.busData.reduce((sum, bus) => sum + bus.currentPassengers, 0);
    const averageOccupancy = totalCapacity > 0 ? (totalPassengers / totalCapacity) * 100 : 0;

    return {
      totalBuses,
      activeBuses,
      totalCapacity,
      totalPassengers,
      averageOccupancy: Math.round(averageOccupancy),
      lastUpdated: this.lastUpdate
    };
  }

  // Get user's bus information
  getUserBusInfo(userBusNumber) {
    const bus = this.getBusByNumber(userBusNumber);
    const route = this.getRouteByBusId(bus?.id);
    const passengers = this.getBusPassengers(userBusNumber);
    const location = this.getBusLocation(bus?.id);

    return {
      bus,
      route,
      passengers,
      location,
      lastUpdated: new Date()
    };
  }
}

// Create singleton instance
const busDataService = new BusDataService();

export default busDataService;
