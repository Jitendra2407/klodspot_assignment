"use client";
import React from "react";
import { X, AlertTriangle, AlertCircle, Info } from "lucide-react";

// Mock Data
const alerts = [
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

const AlertsDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Drawer Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Alerts</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto h-[calc(100%-80px)] p-4 space-y-4">
          {alerts.map((alert) => {
            // Determine styles based on severity type
            let bgClass = "bg-gray-50";
            let badgeClass = "bg-gray-100 text-gray-600";
            let borderClass = "border-gray-100";
            
            if (alert.type === "high") {
              bgClass = "bg-red-50";
              badgeClass = "bg-red-100 text-red-700";
              borderClass = "border-red-100";
            } else if (alert.type === "medium") {
              bgClass = "bg-orange-50";
              badgeClass = "bg-orange-100 text-orange-700";
              borderClass = "border-orange-100";
            } else if (alert.type === "low") {
              bgClass = "bg-teal-50";
              badgeClass = "bg-teal-100 text-teal-700";
              borderClass = "border-teal-100";
            }

            return (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border ${borderClass} ${bgClass}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-500 font-medium">{alert.time}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
                    {alert.type}
                  </span>
                </div>
                <h3 className="text-gray-900 font-semibold mb-1">{alert.title}</h3>
                <p className="text-sm text-gray-600">{alert.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AlertsDrawer;
