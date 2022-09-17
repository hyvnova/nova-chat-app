import { createContext } from 'react';
import { io } from "socket.io-client"

// server url : https://nova-chat-app-server.ezsnova.repl.co
// local network url : "http://<you ip on local network>:3020"
export const socket = io("https://localhost:3020");

export const SocketContext = createContext(socket);