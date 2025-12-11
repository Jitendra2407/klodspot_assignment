"use client";
import { Home, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: Home, path: "/" },
    { name: "Crowd Entries", icon: ExternalLink, path: "/entries" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1e293b] text-white flex flex-col z-20">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6">
        <span className="text-2xl font-bold tracking-tight">Kloudspot</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 mt-2">
        {menuItems.map((item) => {
          // Check for active state: Logic is simple exact match for now, or startsWith if nested
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-6 py-3 transition-colors text-sm font-medium ${
                isActive
                  ? "bg-white/5 border-l-4 border-teal-500 text-white"
                  : "hover:bg-white/5 border-l-4 border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
