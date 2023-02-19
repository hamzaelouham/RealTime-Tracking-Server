import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import bodyParser from "body-parser";
import logger from "./utils/logger";
import { version } from "../package.json";
import socket from "./socket/";
import { GetDataFromIOT } from "./utils";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => res.send("hello world"));

app.post("/", (req, res) => {
  GetDataFromIOT(req);
  res.send("gps data");
});

httpServer.listen(port, host, () => {
  logger.info(`🚀 Server version ${version} is listening 🚀`);
  logger.info(`http://${host}:${port}`);
  socket({ io });
});
