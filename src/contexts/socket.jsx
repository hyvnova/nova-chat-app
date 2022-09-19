import { createContext } from 'react';
import { io } from "socket.io-client"

// server url : https://nova-chat-app-server.ezsnova.repl.co
// local network url : "http://<you ip on local network>:3020"
export const socket = io("http://192.168.1.204:3020");

export const SocketContext = createContext(socket);