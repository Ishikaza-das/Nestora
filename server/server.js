require('dotenv').config({ quiet: true });

const app = require('./app');
const connectDB = require('./db/db');
const http = require("http");
const { initializeSocket } = require("./socket/socket");

const PORT = process.env.PORT;

connectDB()
  .then(() => {

    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  })
  .catch((error) => {
    console.log("Failed to connect to DB", error);
  });
