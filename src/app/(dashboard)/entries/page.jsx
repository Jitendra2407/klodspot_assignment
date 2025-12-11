"use client";
import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const mockEntries = [
  {
    id: 1,
    name: "Esther Howard",
    image: "https://i.pravatar.cc/150?u=1",
    sex: "Male",
    entry: "09:00 AM",
    exit: "10:30 AM",
    dwell: "1h 30m",
  },
  {
    id: 2,
    name: "Floyd Miles",
    image: null,
    sex: "Female",
    entry: "09:15 AM",
    exit: "10:30 AM",
    dwell: "1h 15m",
  },
  {
    id: 3,
    name: "Ronald Richards",
    image: "https://i.pravatar.cc/150?u=3",
    sex: "Male",
    entry: "09:30 AM",
    exit: "10:30 AM",
    dwell: "1h 00m",
  },
  {
    id: 4,
    name: "Marvin McKinney",
    image: null,
    sex: "Female",
    entry: "10:00 AM",
    exit: "11:30 AM",
    dwell: "1h 30m",
  },
  {
    id: 5,
    name: "Leslie Alexander",
    image: "https://i.pravatar.cc/150?u=5",
    sex: "Male",
    entry: "10:15 AM",
    exit: "11:30 AM",
    dwell: "1h 15m",
  },
];

const EntriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Avatar Component
  const Avatar = ({ name, image }) => {
    if (image) {
      return (
        <img
          src={image}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />
      );
    }
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
    return (
      <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
        {initials}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Crowd Entries</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Calendar size={16} className="text-gray-500" />
          <span>Today</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Sex
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Entry
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Exit
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Dwell Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockEntries.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} image={user.image} />
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.sex}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.entry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.exit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.dwell}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center p-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50">
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-teal-50 text-teal-600 font-bold text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50 text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-50 text-sm">
              3
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntriesPage;
