"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AlertsDrawer from "../../components/AlertsDrawer";
import ResponseViewer from "../../components/ResponseViewer";
import { SocketProvider, useSocket } from "../../context/SocketContext";
import { SiteProvider } from "../../context/SiteContext";

// Inner component that can safely use the context
const DashboardContent = ({ children }) => {
  const { hasUnread, markAllRead } = useSocket();
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleAlerts = () => {
    if (!isAlertsOpen) {
      markAllRead();
    }
    setIsAlertsOpen(!isAlertsOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header 
          onNotificationClick={toggleAlerts} 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-6 relative">
          {children}
        </main>
      </div>
      <AlertsDrawer 
        isOpen={isAlertsOpen} 
        onClose={() => setIsAlertsOpen(false)} 
      />
      <ResponseViewer />
    </div>
  );
};

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    if (!token) {
      // If no token, redirect to login
      router.push("/login");
    } else {
      // Token exists, authorized
      setIsAuthorized(true);
    }
  }, [router]);

  // Prevent flash of content by rendering nothing (or loader) until authorized
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-teal-600 font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <SiteProvider>
      <SocketProvider>
        <DashboardContent>{children}</DashboardContent>
      </SocketProvider>
    </SiteProvider>
  );
}
