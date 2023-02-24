const express = require("express");
const cors = require("cors");
const actionRoutes = require("./actions/actions-router");
const projectsRoutes = require("./projects/projects-router");
const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/projects", projectsRoutes);
server.use("/api/actions", actionRoutes);

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;
