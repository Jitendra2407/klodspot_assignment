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

export const api = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error("Login failed");
      return response.json();
    } catch (error) {
      console.error("API Login failed", error);
      throw error;
    }
  },

  getDwellTime: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/analytics/dwell`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error("Failed to fetch dwell time");
      return response.json();
    } catch (error) {
       console.error("API Dwell failed", error);
       throw error;
    }
  },

  getFootfall: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/analytics/footfall`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error("Failed to fetch footfall");
      return response.json();
    } catch (error) {
      console.error("API Footfall failed", error);
      throw error;
    }
  },

  getOccupancy: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/analytics/occupancy`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error("Failed to fetch occupancy");
      return response.json();
    } catch (error) {
      console.error("API Occupancy failed", error);
      throw error;
    }
  },

  getDemographics: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/analytics/demographics`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error("Failed to fetch demographics");
      return response.json();
    } catch (error) {
      console.error("API Demographics failed", error);
      throw error;
    }
  },

  getEntries: async (page = 1, limit = 10, token) => {
    try {
      const response = await fetch(`${BASE_URL}/analytics/entry-exit`, {
         method: "POST",
         headers: getHeaders(token),
         body: JSON.stringify({ page, limit }),
      });
      if (!response.ok) throw new Error("Failed to fetch entries");
      return response.json();
    } catch (error) {
      console.error("API Entries failed", error);
      throw error; 
    }
  },
};
