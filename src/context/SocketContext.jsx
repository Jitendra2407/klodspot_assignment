"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const initialAlerts = [
  {
    id: 1,
    time: "March 03 10:12",
    title: "Ahmad Entered",
    subtitle: "Zone A",
    type: "high",
  },
  {
    id: 2,
    time: "March 03 10:05",
    title: "Overcrowding Detected",
    subtitle: "Zone B - Capacity > 90%",
    type: "medium",
  },
  {
    id: 3,
    time: "March 03 09:45",
    title: "System Maintenance",
    subtitle: "Scheduled for tonight",
    type: "low",
  },
  {
    id: 4,
    time: "March 03 09:30",
    title: "Unauthorized Access",
    subtitle: "Zone C - Back Gate",
    type: "high",
  },
];

export const SocketProvider = ({ children }) => {
  const [occupancy, setOccupancy] = useState(452); // Default mock value
  const [alerts, setAlerts] = useState(initialAlerts);
  const [hasUnread, setHasUnread] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      autoConnect: true,
    });

    setSocket(newSocket);

    // Event Listeners
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("live_occupancy", (data) => {
      // Assuming data is { value: 123 } or just number
      const newVal = typeof data === "object" ? data.value : data;
      setOccupancy(newVal);
    });

    newSocket.on("alert", (newAlert) => {
      setAlerts((prev) => [newAlert, ...prev]);
      setHasUnread(true);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const markAllRead = () => {
    setHasUnread(false);
  };

  const value = {
    occupancy,
    alerts,
    hasUnread,
    markAllRead,
    socket,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
