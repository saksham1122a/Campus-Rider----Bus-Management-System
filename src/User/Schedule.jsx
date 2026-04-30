import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { useBusData } from '../contexts/BusDataContext';
import './Schedule.css';

const Schedule = () => {
  const { user: authUser } = useAuth();
  const { getUserBusInfo } = useBusData();
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('today');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser || !authUser.busNumber) {
      setScheduleData([]);
      setLoading(false);
      return;
    }

    // Generate schedule data based on user's bus
    const busInfo = getUserBusInfo(authUser.busNumber);
    const schedule = generateScheduleData(busInfo);
    setScheduleData(schedule);
    setLoading(false);
  }, [authUser, getUserBusInfo]);

  const generateScheduleData = (busInfo) => {
    const today = new Date();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    // Base schedule times for different buses
    const baseSchedules = {
      1: [ // Kohade
        { time: '07:30 AM', stop: 'Kohade', type: 'departure', status: 'completed' },
        { time: '07:45 AM', stop: 'Kohade Main Stop', type: 'stop', status: 'completed' },
        { time: '08:00 AM', stop: 'Kohade Junction', type: 'stop', status: 'completed' },
        { time: '08:15 AM', stop: 'Main Road Crossing', type: 'stop', status: 'completed' },
        { time: '08:30 AM', stop: 'College Gate', type: 'stop', status: 'active' },
        { time: '08:45 AM', stop: 'College', type: 'arrival', status: 'upcoming' }
      ],
      2: [ // Veer Palace
        { time: '07:45 AM', stop: 'Veer Palace', type: 'departure', status: 'completed' },
        { time: '08:00 AM', stop: 'Veer Palace Junction', type: 'stop', status: 'completed' },
        { time: '08:15 AM', stop: 'Main Road', type: 'stop', status: 'completed' },
        { time: '08:30 AM', stop: 'Highway Entry', type: 'stop', status: 'active' },
        { time: '08:45 AM', stop: 'College Entrance', type: 'stop', status: 'upcoming' },
        { time: '09:00 AM', stop: 'College', type: 'arrival', status: 'upcoming' }
      ],
      3: [ // Police Colony
        { time: '07:55 AM', stop: 'Police Colony', type: 'departure', status: 'completed' },
        { time: '08:10 AM', stop: 'Police Colony Gate', type: 'stop', status: 'completed' },
        { time: '08:25 AM', stop: 'Police Station', type: 'stop', status: 'active' },
        { time: '08:40 AM', stop: 'College Road', type: 'stop', status: 'upcoming' },
        { time: '08:55 AM', stop: 'College', type: 'arrival', status: 'upcoming' }
      ],
      6: [ // Vasti
        { time: '07:40 AM', stop: 'Vasti', type: 'departure', status: 'completed' },
        { time: '07:55 AM', stop: 'Vasti Center', type: 'stop', status: 'completed' },
        { time: '08:10 AM', stop: 'Vasti Junction', type: 'stop', status: 'completed' },
        { time: '08:25 AM', stop: 'Main Highway', type: 'stop', status: 'active' },
        { time: '08:40 AM', stop: 'College Entrance', type: 'stop', status: 'upcoming' },
        { time: '08:55 AM', stop: 'College', type: 'arrival', status: 'upcoming' }
      ]
    };

    const busId = busInfo?.bus?.id || 3;
    return baseSchedules[busId] || baseSchedules[3];
  };

  const getDaySchedule = (day) => {
    // For now, return the same schedule for all days
    // In a real app, this would vary based on the day
    return scheduleData;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'active': return '#4FC3F7';
      case 'upcoming': return '#f97316';
      case 'delayed': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'departure': return '🚀';
      case 'arrival': return '🎯';
      case 'stop': return '📍';
      default: return '📍';
    }
  };

  const getStopTypeLabel = (type) => {
    switch (type) {
      case 'departure': return 'Departure';
      case 'arrival': return 'Arrival';
      case 'stop': return 'Stop';
      default: return 'Stop';
    }
  };

  if (loading) {
    return (
      <div className="schedule-page">
        <div className="loading-state">
          <div className="loading-icon">⏰</div>
          <p>Loading schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="page-header">
        <h1 className="page-title">Bus Schedule</h1>
        <p className="page-subtitle">Bus {authUser?.busNumber} - Today's Route</p>
      </div>

      {/* Day Selector */}
      <div className="day-selector">
        <div className="day-tabs">
          {['today', 'tomorrow', 'weekend'].map((day) => (
            <button
              key={day}
              className={`day-tab ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="schedule-timeline">
        <div className="timeline-header">
          <h3 className="timeline-title">Route Schedule</h3>
          <div className="timeline-legend">
            <div className="legend-item">
              <div className="legend-dot completed"></div>
              <span>Completed</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot active"></div>
              <span>Active</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot upcoming"></div>
              <span>Upcoming</span>
            </div>
          </div>
        </div>

        <div className="timeline-content">
          {getDaySchedule(selectedDay).map((stop, index) => (
            <div key={index} className={`schedule-item ${stop.status}`}>
              <div className="schedule-time">
                <div className="time-badge">
                  <span className="time-text">{stop.time}</span>
                </div>
              </div>
              
              <div className="schedule-connector">
                <div className="connector-line"></div>
                <div className="connector-dot" style={{ backgroundColor: getStatusColor(stop.status) }}></div>
              </div>
              
              <div className="schedule-content">
                <div className="schedule-stop">
                  <div className="stop-header">
                    <div className="stop-icon">{getStatusIcon(stop.type)}</div>
                    <div className="stop-info">
                      <h4 className="stop-name">{stop.stop}</h4>
                      <span className="stop-type">{getStopTypeLabel(stop.type)}</span>
                    </div>
                  </div>
                  
                  <div className="stop-status">
                    <span className={`status-badge ${stop.status}`}>
                      {stop.status.charAt(0).toUpperCase() + stop.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                {stop.status === 'active' && (
                  <div className="active-indicator">
                    <div className="pulse-dot"></div>
                    <span>Bus is here</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Summary */}
      <div className="schedule-summary">
        <div className="summary-card">
          <h3 className="summary-title">Today's Summary</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <div className="stat-icon">📍</div>
              <div className="stat-content">
                <div className="stat-number">{scheduleData.length}</div>
                <div className="stat-label">Total Stops</div>
              </div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-number">{scheduleData.filter(s => s.status === 'completed').length}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <div className="stat-number">30 min</div>
                <div className="stat-label">Total Duration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;