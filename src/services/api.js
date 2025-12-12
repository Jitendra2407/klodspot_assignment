const BASE_URL = "https://hiring-dev.internal.kloudspot.com/api";

const getHeaders = (tokenOverride) => {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
  
  // Prioritize passed token, then localStorage
  const rawToken = tokenOverride || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  const token = rawToken ? rawToken.trim() : null;
  
  console.log(`[API] constructing headers. Token present: ${!!token}`); 

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// Helper to simulate delay for mocks
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simple event system for logging
let listeners = [];
export const onApiResponse = (fn) => {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
};

const broadcast = (data) => {
  listeners.forEach(fn => fn(data));
};

const wrapFetch = async (url, options = {}) => {
  const method = options.method || "GET";
  try {
    const res = await fetch(url, options);
    
    // Clone to read body without consuming original
    const clone = res.clone();
    let body = null;
    try {
      body = await clone.json();
    } catch {
      body = await clone.text();
    }

    broadcast({
      url,
      method,
      status: res.status,
      response: body,
      timestamp: new Date().toISOString()
    });

    return res;
  } catch (err) {
    broadcast({
        url,
        method,
        status: 0,
        error: err.message,
        timestamp: new Date().toISOString()
    });
    throw err;
  }
};

export const api = {
  login: async (credentials) => {
    try {
      const response = await wrapFetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
         const error = new Error("Login failed");
         error.status = response.status;
         throw error;
      }
      return response.json();
    } catch (error) {
      console.error("API Login failed", error);
      throw error;
    }
  },

  getSites: async (token) => {
    try {
      const response = await wrapFetch(`${BASE_URL}/sites`, {
        method: "GET",
        headers: getHeaders(token),
      });
      if (!response.ok) {
         const error = new Error("Failed to fetch sites");
         error.status = response.status;
         throw error;
      }
      return response.json();
    } catch (error) {
      console.error("API GetSites failed", error);
      throw error;
    }
  },

  getDwellTime: async ({ siteId, fromUtc, toUtc }, token) => {
    try {
      const response = await wrapFetch(`${BASE_URL}/analytics/dwell`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({ siteId, fromUtc, toUtc }),
      });
      if (!response.ok) throw new Error("Failed to fetch dwell time");
      return response.json();
    } catch (error) {
       console.error("API Dwell failed", error);
       throw error;
    }
  },

  getFootfall: async ({ siteId, fromUtc, toUtc }, token) => {
    try {
      const response = await wrapFetch(`${BASE_URL}/analytics/footfall`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({ siteId, fromUtc, toUtc }),
      });
      if (!response.ok) throw new Error("Failed to fetch footfall");
      return response.json();
    } catch (error) {
      console.error("API Footfall failed", error);
      throw error;
    }
  },

  getOccupancy: async ({ siteId, fromUtc, toUtc }, token) => {
    try {
      const response = await wrapFetch(`${BASE_URL}/analytics/occupancy`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({ siteId, fromUtc, toUtc }),
      });
      if (!response.ok) throw new Error("Failed to fetch occupancy");
      return response.json();
    } catch (error) {
      console.error("API Occupancy failed", error);
      throw error;
    }
  },

  getDemographics: async ({ siteId, fromUtc, toUtc }, token) => {
    try {
      const response = await wrapFetch(`${BASE_URL}/analytics/demographics`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({ siteId, fromUtc, toUtc }),
      });
      if (!response.ok) throw new Error("Failed to fetch demographics");
      return response.json();
    } catch (error) {
      console.error("API Demographics failed", error);
      throw error;
    }
  },

  getEntries: async ({ page = 1, limit = 10, siteId, fromUtc, toUtc } = {}, token) => {
    try {
      const response = await wrapFetch(`${BASE_URL}/analytics/entry-exit`, {
         method: "POST",
         headers: getHeaders(token),
         body: JSON.stringify({ pageNumber: page, pageSize: limit, siteId, fromUtc, toUtc }),
      });
      if (!response.ok) throw new Error("Failed to fetch entries");
      return response.json();
    } catch (error) {
      console.error("API Entries failed", error);
      throw error; 
    }
  },
};
