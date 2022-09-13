import { createContext } from 'react';
import { io } from "socket.io-client"

export const socket = io("https://nova-chat-app-server.ezsnova.repl.co");

export const SocketContext = createContext(socket);