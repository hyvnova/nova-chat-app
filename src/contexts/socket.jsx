import { createContext } from 'react';
import { io } from "socket.io-client"
// server url : https://nova-chat-app-server.ezsnova.repl.co
export const socket = io("http://192.168.1.204:3020");

export const SocketContext = createContext(socket);