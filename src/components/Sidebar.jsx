"use client";
import { Home, ExternalLink, Power, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, onToggle }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: Home, path: "/" },
    { name: "Crowd Entries", icon: ExternalLink, path: "/entries" },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-teal-900 to-slate-900 text-white flex flex-col z-20 shadow-xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-teal-900 font-bold">K</div>
          <span className="text-xl font-bold tracking-tight">kloudspot</span>
        </div>
        <button onClick={onToggle} className="text-gray-400 hover:text-white transition-colors outline-none">
           <Menu size={20} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname && (pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)));
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium ${
                isActive
                  ? "bg-white/10 text-white shadow-sm border-l-4 border-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors text-sm font-medium"
        >
          <Power size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
