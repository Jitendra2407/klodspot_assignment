"use client";
import React, { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../../../services/api";

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
];

const EntriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const result = await api.getEntries(currentPage);
        const entriesList = Array.isArray(result) ? result : (result.data || []);
        setEntries(entriesList.length > 0 ? entriesList : mockEntries); 
      } catch (error) {
        console.error("Failed to fetch entries", error);
        setEntries(mockEntries);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [currentPage]);

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
    const initials = (name || "Unknown")
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Crowd Entries</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Calendar size={16} className="text-gray-500" />
          <span>Today</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Sex</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Entry</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Exit</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Dwell Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading entries...</td>
                </tr>
              ) : entries.map((user) => (
                <tr key={user.id || Math.random()} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} image={user.image} />
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.sex}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.entry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.exit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.dwell}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EntriesPage;
