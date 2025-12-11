"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AlertsDrawer from "../../components/AlertsDrawer";

export default function DashboardLayout({ children }) {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col relative">
        <Header onNotificationClick={() => setIsAlertsOpen(true)} />
        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
        {/* Alerts Drawer */}
        <AlertsDrawer 
          isOpen={isAlertsOpen} 
          onClose={() => setIsAlertsOpen(false)} 
        />
      </div>
    </div>
  );
}
