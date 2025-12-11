"use client";
import { Bell, ChevronDown } from "lucide-react";

const Header = ({ onNotificationClick }) => {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm z-10 sticky top-0">
      {/* Left: Branding / Context */}
      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-gray-500 font-medium">Crowd Solutions</span>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1 font-semibold cursor-pointer hover:text-black">
          <span>Avenue Mall</span>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
          <span>En</span>
          <ChevronDown size={14} />
        </div>

        {/* Notifications */}
        <button 
          onClick={onNotificationClick}
          className="text-gray-500 hover:text-gray-700 relative outline-none focus:text-gray-900"
        >
          <Bell size={20} />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white transform translate-x-1/2 -translate-y-1/2"></span>
        </button>

        {/* User Avatar */}
        <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:ring-2 hover:ring-gray-200 hover:ring-offset-2 transition-all">
          JS
        </div>
      </div>
    </header>
  );
};

export default Header;
