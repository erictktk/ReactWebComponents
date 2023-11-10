import { rest, setupWorker } from "msw";
import { factory, oneOf, manyOf, primaryKey } from "@mswjs/data";
import { nanoid } from "@reduxjs/toolkit";
import faker from "faker";
import seedrandom from "seedrandom";
import { Server as MockSocketServer } from "mock-socket";
import { setRandom } from "txtgen";
import { db } from "./db";
import { handlers } from "./handlers";
import { SetupDB } from "./setupDB";

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000;

/* MSW Data Model Setup */

SetupDB();

/* MSW REST API Handlers */
export const worker = setupWorker(...handlers);
// worker.printHandlers() // Optional: nice for debugging to see all available route handlers that will be intercepted

/* Mock Websocket Setup */

const socketServer = new MockSocketServer("ws://localhost");

let currentSocket;

const sendMessage = (socket, obj) => {
  socket.send(JSON.stringify(obj));
};

socketServer.on("connection", (socket) => {
  currentSocket = socket;

  socket.on("message", (data) => {
    const message = JSON.parse(data);

    switch (message.type) {
      case "notifications": {
        const since = message.payload;
        //sendRandomNotifications(socket, since);
        break;
      }
      default:
        break;
    }
  });
});
