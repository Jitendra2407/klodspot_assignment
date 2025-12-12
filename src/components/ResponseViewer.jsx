"use client";
import React, { useEffect, useState, useRef } from "react";
import { onApiResponse } from "../services/api";
import { X, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

const ResponseViewer = () => {
  const [logs, setLogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Subscribe to API logs
    const unsubscribe = onApiResponse((log) => {
      setLogs((prev) => [log, ...prev].slice(0, 50)); // Keep last 50
    });
    return () => unsubscribe();
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);
  const clearLogs = () => setLogs([]);

  if (!isOpen) {
    return (
      <button
        onClick={toggleOpen}
        className="fixed bottom-4 right-4 bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-all z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
      >
        <span>API Logs</span>
        <span className="bg-teal-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{logs.length}</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-slate-900 rounded-lg shadow-2xl flex flex-col z-50 border border-slate-700 font-mono text-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-t-lg border-b border-slate-700">
        <h3 className="text-gray-300 font-semibold text-xs uppercase tracking-wider">APIs Console</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={clearLogs} 
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
            title="Clear Logs"
          >
            <Trash2 size={14} />
          </button>
          <button 
            onClick={toggleOpen} 
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2" ref={scrollRef}>
        {logs.length === 0 && (
            <div className="text-center text-gray-600 mt-10 text-xs">No API calls properly recorded yet.</div>
        )}
        {logs.map((log, index) => {
           const isError = log.status >= 400 || log.status === 0;
           return (
            <div key={index} className={`bg-slate-800/50 rounded border ${isError ? 'border-red-900/50' : 'border-slate-700'} overflow-hidden`}>
                <div className="flex items-center justify-between p-2 bg-slate-800/80 cursor-pointer select-none">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getMethodColor(log.method)}`}>{log.method}</span>
                        <span className="text-gray-400 text-xs truncate" title={log.url}>{log.url.split('api')[1] || log.url}</span>
                    </div>
                    <span className={`text-xs font-bold ${isError ? 'text-red-500' : 'text-green-500'}`}>{log.status || 'ERR'}</span>
                </div>
                <div className="p-2 border-t border-slate-700/50 bg-slate-900">
                    <pre className="text-[10px] text-gray-400 overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(log.response || log.error, null, 2)}
                    </pre>
                </div>
            </div>
           );
        })}
      </div>
    </div>
  );
};

const getMethodColor = (method) => {
    switch(method) {
        case 'GET': return 'bg-blue-900 text-blue-300';
        case 'POST': return 'bg-green-900 text-green-300';
        case 'PUT': return 'bg-orange-900 text-orange-300';
        case 'DELETE': return 'bg-red-900 text-red-300';
        default: return 'bg-gray-700 text-gray-300';
    }
}

export default ResponseViewer;
