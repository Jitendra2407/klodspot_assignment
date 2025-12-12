"use client";
import React, { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../../../services/api";
import { useSite } from "../../../context/SiteContext";

// Mock entries removed. Relying on API.

const EntriesPage = () => {
  const { selectedSiteId, fromUtc, toUtc, anchorDate, shiftDay, setToday } = useSite();
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!selectedSiteId || !fromUtc) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const result = await api.getEntries({ page: currentPage, limit: 10, siteId: selectedSiteId, fromUtc, toUtc }, token); // Pass token handling pagination args
        // API returns { records: [], totalRecords: N, ... }
        let entriesList = [];
        if (result && Array.isArray(result.records)) {
             entriesList = result.records.map(r => ({
                 id: r.personId || r.visitorId || Math.random(),
                 name: r.personName || r.name || "Unknown",
                 sex: r.gender || r.sex || "-",
                 entry: r.entryLocal ? new Date(r.entryLocal).toLocaleTimeString() : "-",
                 exit: r.exitLocal ? new Date(r.exitLocal).toLocaleTimeString() : "-",
                 dwell: r.dwellMinutes ? `${Math.round(r.dwellMinutes)}m` : "-"
             }));
        } else if (Array.isArray(result)) {
             entriesList = result;
        } else if (result && result.data) {
             entriesList = result.data;
        }
        setEntries(entriesList); 
      } catch (error) {
        console.error("Failed to fetch entries", error);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [currentPage, selectedSiteId, fromUtc, toUtc]);

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
        <div className="flex items-center gap-2">
            <button 
                onClick={() => shiftDay(-1)}
                className="p-2 border border-gray-200 rounded-lg shadow-sm text-gray-600 hover:bg-gray-50 transition-colors"
                title="Yesterday"
            >
                <ChevronLeft size={16} />
            </button>
            <button 
                onClick={setToday}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                title="Go to Today"
            >
              <Calendar size={16} className="text-gray-500" />
              <span>{anchorDate.toLocaleDateString()}</span>
            </button>
             <button 
                onClick={() => shiftDay(1)}
                className="p-2 border border-gray-200 rounded-lg shadow-sm text-gray-600 hover:bg-gray-50 transition-colors"
                title="Tomorrow"
            >
                <ChevronRight size={16} />
            </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Sex</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Entry</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Exit</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Dwell Time</th>
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
        
        {/* Pagination Logic */}
        <div className="flex items-center justify-center p-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button 
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1 || loading}
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Hardcoded visual pagination to match design 1 2 3 ... 5 */}
            <button 
              className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm ${currentPage === 1 ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`} 
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button 
              className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm ${currentPage === 2 ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`} 
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button 
              className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm ${currentPage === 3 ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`} 
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            
            <span className="text-gray-400 text-sm">...</span>

             <button 
              className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm ${currentPage === 5 ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'}`} 
              onClick={() => setCurrentPage(5)}
            >
              5
            </button>

            <button 
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={loading}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntriesPage;
