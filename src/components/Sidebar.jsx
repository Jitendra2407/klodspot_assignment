"use client";
import { Home, Maximize2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: Home, path: "/" },
    { name: "Crowd Entries", icon: Maximize2, path: "/entries" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#152e35] text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">Logo</div>
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                isActive
                  ? "bg-white/10 border-l-4 border-white"
                  : "hover:bg-white/5 border-l-4 border-transparent"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
