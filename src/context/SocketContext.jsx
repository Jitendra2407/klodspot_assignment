"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const initialAlerts = [];

export const SocketProvider = ({ children }) => {
  const [occupancy, setOccupancy] = useState(0); // Start at 0, wait for live event
  const [alerts, setAlerts] = useState(initialAlerts);
  const [hasUnread, setHasUnread] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "https://hiring-dev.internal.kloudspot.com";
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
