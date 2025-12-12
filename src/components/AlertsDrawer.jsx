"use client";
import React from "react";
import { X, MapPin } from "lucide-react";
import { useSocket } from "../context/SocketContext";

const AlertsDrawer = ({ isOpen, onClose }) => {
  const { alerts } = useSocket();

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
                className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                 {/* Left Status Bar based on type */}
                 <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      alert.type === 'high' ? 'bg-red-500' : 
                      alert.type === 'medium' ? 'bg-orange-500' : 'bg-teal-500'
                 }`}></div>

                {/* Time */}
                <div className="text-[11px] text-gray-400 font-medium mb-1">
                    {alert.time || "Today, 10:00 AM"}
                </div>
                
                {/* Title */}
                <h3 className="text-gray-900 font-bold text-sm mb-3">
                    {alert.title || "Alert Title"}
                </h3>

                {/* Bottom Row: Location + Badge */}
                <div className="flex items-center justify-between">
                    {/* Location */}
                    <div className="flex items-center gap-1 text-gray-500">
                        <MapPin size={12} />
                        <span className="text-xs">{alert.subtitle || "Unknown Zone"}</span>
                    </div>

                    {/* Badge */}
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md text-white capitalize ${
                        alert.type === 'high' ? 'bg-red-500' : 
                        alert.type === 'medium' ? 'bg-orange-400' : 'bg-teal-500'
                    }`}>
                        {alert.type || "Info"}
                    </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AlertsDrawer;
