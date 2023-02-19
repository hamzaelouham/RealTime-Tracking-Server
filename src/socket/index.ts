import { Server, Socket } from "socket.io";
import SendDataToClient from "../utils";
import logger from "../utils/logger";

export const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  gps: "gps",
};

export default function socket({ io }: { io: Server }) {
  logger.info("Sockets enabled ...");

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info("Client connected ");

    SendDataToClient({ io });

    socket.on(EVENTS.disconnect, () => {
      logger.info("Client disconnected");
    });
  });
}
