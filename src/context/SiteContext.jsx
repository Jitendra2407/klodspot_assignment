"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const SiteContext = createContext();

export const useSite = () => useContext(SiteContext);

// Ported from hiring_dev.html
function getZonedDayRangeUtcMillis(tz, anchorDate) {
  // anchorDate is a JS Date (we treat it as "the day we want" in that timezone)
  
  // 1) Take the "YYYY-MM-DD" as seen in the timezone.
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(anchorDate);

  const y = parts.find(p => p.type === "year").value;
  const m = parts.find(p => p.type === "month").value;
  const d = parts.find(p => p.type === "day").value;

  // Start as if it were UTC midnight for that calendar day.
  const startGuessUtc = new Date(`${y}-${m}-${d}T00:00:00.000Z`);

  // Now find what time that instant is in the timezone, then compute offset difference
  const tzParts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  }).formatToParts(startGuessUtc);

  const hh = +tzParts.find(p => p.type === "hour").value;
  const mm = +tzParts.find(p => p.type === "minute").value;
  const ss = +tzParts.find(p => p.type === "second").value;

  // This is the local time at startGuessUtc. We need local midnight, so subtract that local time.
  const deltaMs = ((hh * 3600) + (mm * 60) + ss) * 1000;

  const startUtc = startGuessUtc.getTime() - deltaMs;
  const endUtc = startUtc + (24 * 60 * 60 * 1000) - 1;

  return { startUtc, endUtc };
}

export const SiteProvider = ({ children }) => {
  const [sites, setSites] = useState([]);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [site, setSite] = useState(null);
  const [anchorDate, setAnchorDate] = useState(new Date()); // Default to local client today, will be TZ adjusted
  const [timeRange, setTimeRange] = useState({ fromUtc: 0, toUtc: 0 });
  const [loading, setLoading] = useState(true);

  // 1. Load Sites
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { 
           // If no token, maybe redirect or just wait? 
           // For now, let's assume token might be there or this runs after login
        }
        const res = await api.getSites(token);
        // Correct response handling based on hiring_dev.html logic
        const siteList = Array.isArray(res) ? res : (res?.data || []);
        setSites(siteList);
        
        if (siteList.length > 0) {
          // Default to first site
          const first = siteList[0];
          setSelectedSiteId(first.id || first.siteId || first._id);
        }
      } catch (err) {
        console.error("Failed to load sites", err);
        if (err.status === 401 || err.status === 403) {
             localStorage.removeItem("token");
             window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, []);

  // 2. Compute Time Range when Site changes
  useEffect(() => {
    if (!selectedSiteId || sites.length === 0) return;

    const currentSite = sites.find(s => (s.id || s.siteId || s._id) === selectedSiteId);
    setSite(currentSite);
    
    if (currentSite) {
      const tz = currentSite.timezone || currentSite.timeZone || currentSite.tz || "UTC";
      // Compute range based on anchorDate in site's timezone
      const { startUtc, endUtc } = getZonedDayRangeUtcMillis(tz, anchorDate);
      setTimeRange({ fromUtc: startUtc, toUtc: endUtc });
    }
  }, [selectedSiteId, sites, anchorDate]);

  const shiftDay = (days) => {
      const newDate = new Date(anchorDate);
      newDate.setDate(newDate.getDate() + days);
      setAnchorDate(newDate);
  };

  const setToday = () => {
      setAnchorDate(new Date());
  };

  const value = {
    sites,
    selectedSiteId,
    setSelectedSiteId,
    site,
    fromUtc: timeRange.fromUtc,
    toUtc: timeRange.toUtc,
    loading,
    anchorDate,
    shiftDay,
    setToday
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};
