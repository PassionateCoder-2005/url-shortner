import dns from "dns";
dns.setServers(["8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");


import server from "./src/app.js";
import { CONFIG } from "./src/config/config.js";
import db from "./src/config/db.js";

// MongoDB connect
db();

server.listen(CONFIG.PORTS, () => {
  console.log(`Server is running on port ${CONFIG.PORTS}`);
});