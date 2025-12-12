"use client";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { useSocket } from "../context/SocketContext";

const Header = ({ onNotificationClick, onMenuClick, isSidebarOpen }) => {
  const { hasUnread } = useSocket();
  const { sites, selectedSiteId, setSelectedSiteId } = useSite();

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm z-10 sticky top-0">
      {/* Left: Branding / Context */}
      <div className="flex items-center gap-4 text-gray-700">
        {!isSidebarOpen && (
          <button onClick={onMenuClick} className="p-1 hover:bg-gray-100 rounded-md transition-colors outline-none focus:ring-2 focus:ring-teal-500">
            <Menu size={20} className="text-gray-500" />
          </button>
        )}
        <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">Crowd Solutions</span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1 font-semibold cursor-pointer hover:text-black relative">
              <select 
                value={selectedSiteId}
                onChange={(e) => setSelectedSiteId(e.target.value)}
                className="appearance-none bg-transparent pr-6 py-1 focus:outline-none cursor-pointer font-semibold text-gray-700 hover:text-black"
              >
                {sites.map(site => (
                   <option key={site.id || site.siteId || site._id} value={site.id || site.siteId || site._id}>
                      {site.name || site.siteName || "Unknown Site"}
                   </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-0 pointer-events-none text-gray-500" />
            </div>
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
          {hasUnread && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white transform translate-x-1/2 -translate-y-1/2"></span>
          )}
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
