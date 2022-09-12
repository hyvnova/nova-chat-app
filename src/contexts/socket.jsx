import { createContext } from 'react';
import { io } from "socket.io-client"

export const socket = io("https://EZSNoVa.github.io/nova-chat-app:3020");





export const SocketContext = createContext(socket);