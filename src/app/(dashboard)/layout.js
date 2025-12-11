"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AlertsDrawer from "../../components/AlertsDrawer";
import { SocketProvider, useSocket } from "../../context/SocketContext";

// Inner component to consume Context
const DashboardContent = ({ children }) => {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const { markAllRead } = useSocket();

  const handleOpenAlerts = () => {
    setIsAlertsOpen(true);
    markAllRead();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative">
        <Header onNotificationClick={handleOpenAlerts} />
        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
        <AlertsDrawer 
          isOpen={isAlertsOpen} 
          onClose={() => setIsAlertsOpen(false)} 
        />
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <SocketProvider>
      <DashboardContent>{children}</DashboardContent>
    </SocketProvider>
  );
}
