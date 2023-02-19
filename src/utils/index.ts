import type { Request } from "express";
import { Server } from "socket.io";
import { ref } from "../db";
import { EVENTS } from "../socket";

export default function SendDataToClient({ io }: { io: Server }) {
  ref.on("value", (snapshot) => {
    io.emit(EVENTS.gps, {
      coordinate: [snapshot.val().Latitude, snapshot.val().Longitude],
      speed: snapshot.val().speed,
    });
  });
}

export function GetDataFromIOT(req: Request) {
  ref.set({
    Latitude: parseFloat(req.body.lat),
    Longitude: parseFloat(req.body.long),
    speed: Math.floor(Math.random() * 10),
  });
}
