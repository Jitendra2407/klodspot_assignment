"use client";

const Header = () => {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-8 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
      <button className="text-gray-600 hover:text-gray-900 font-medium">
        Logout
      </button>
    </header>
  );
};

export default Header;
