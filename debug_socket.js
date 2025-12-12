const io = require("socket.io-client");

const socketUrl = "https://hiring-dev.internal.kloudspot.com";

console.log(`Connecting to ${socketUrl}...`);

const socket = io(socketUrl, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected! ID:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("Connection Error:", err.message);
  console.log("Error Details:", JSON.stringify(err, null, 2));
});

socket.on("error", (err) => {
    console.log("Socket Error:", err);
});

socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
});

socket.on("live_occupancy", (data) => {
  console.log("EVENT live_occupancy:", data);
});

socket.on("alert", (data) => {
  console.log("EVENT alert:", data);
});

// Keep open for 20 seconds
setTimeout(() => {
    console.log("Closing connection...");
    socket.close();
}, 20000);
