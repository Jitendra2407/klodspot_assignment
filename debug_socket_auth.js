const io = require("socket.io-client");
// using native fetch

// Polyfill fetch if needed for older node, but we assume node 18+ has it.
// If not, we'll try to just log in using standard https module or assume user puts token.
// Actually, let's reuse the login logic from previous scripts.

const BASE_URL = "https://hiring-dev.internal.kloudspot.com/api";
const SOCKET_URL = "https://hiring-dev.internal.kloudspot.com";

async function getToken() {
    console.log("Logging in...");
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@test.com", password: "1234567890" })
    });
    const data = await res.json();
    return data.token;
}

(async () => {
    try {
        const token = await getToken();
        console.log("Got token:", token ? "YES" : "NO");

        if (!token) return;

        console.log(`Connecting to ${SOCKET_URL} with token...`);
        const socket = io(SOCKET_URL, {
            transports: ["websocket"],
            auth: { token: token }
        });

        socket.on("connect", () => {
            console.log("CONNECTED! Socket ID:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.log("CONNECTION ERROR:", err.message);
            // console.log(JSON.stringify(err, null, 2));
        });

        socket.on("live_occupancy", (data) => {
            console.log("EVENT live_occupancy:", data);
        });

        socket.on("alert", (data) => {
            console.log("EVENT alert received:", data);
        });
        
        // Wait for a while to catch events
        setTimeout(() => {
            console.log("Done waiting. Closing.");
            socket.close();
        }, 15000);

    } catch (e) {
        console.error("Script error:", e);
    }
})();
