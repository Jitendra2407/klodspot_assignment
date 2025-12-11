const BASE_URL = "https://hiring-dev.internal.kloudspot.com/api";

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },

  getDwellTime: async () => {
    const response = await fetch(`${BASE_URL}/analytics/dwell`, {
      method: "POST", // Requirement says POST
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch dwell time");
    return response.json();
  },

  getFootfall: async () => {
    const response = await fetch(`${BASE_URL}/analytics/footfall`, {
      method: "POST", // Requirement says POST
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch footfall");
    return response.json();
  },

  getOccupancy: async () => {
    const response = await fetch(`${BASE_URL}/analytics/occupancy`, {
      method: "POST",
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch occupancy");
    return response.json();
  },

  getDemographics: async () => {
    const response = await fetch(`${BASE_URL}/analytics/demographics`, {
      method: "POST",
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch demographics");
    return response.json();
  },

  getEntries: async (page = 1, limit = 10) => {
    // Assuming body params for pagination based on typical POST search implementations
    // or maybe query params? The doc says POST but usually pagination is clean.
    // I'll try sending generic empty body or params if specified.
    // Doc doesn't specify body, but it's POST.
    const response = await fetch(`${BASE_URL}/analytics/entry-exit`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ page, limit }),
    });
    if (!response.ok) throw new Error("Failed to fetch entries");
    return response.json();
  },
};
