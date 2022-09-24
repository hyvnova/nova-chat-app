import { Routes, Route } from "react-router-dom";

// css
import './styles/pico.css'; 
import './styles/global.css';

// components (should only be UI components here)
import ChatUI from './components/ChatUI';
import LoginUI from './components/LoginUI';

// contexts
import { SocketContext, socket } from './contexts/socket';
import { DataContext } from "./contexts/data";

// hoooks
import { useState } from 'react';

export default function App() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    localStorage.setItem("username", username)

    const [room, setRoom] = useState(localStorage.getItem("room") || "");
    localStorage.setItem("room", room)

    const [showConsole, setShowConsole] = useState(false);

    // message author text color
    const [color, setColor] = useState(localStorage.getItem("color") || "#" + Math.floor(Math.random()*16777215).toString(16)); 
    localStorage.setItem("color", color)


    return (
    <>
        <SocketContext.Provider value={socket}>
        <DataContext.Provider value={{
            room, setRoom,
            username, setUsername,
            color, setColor,
            showConsole, setShowConsole
        }}>

            <Routes>
                <Route path="/" element={<LoginUI />} />
                <Route path="/chat" element={<ChatUI />} />
            </Routes> 
        
        </DataContext.Provider>
        </SocketContext.Provider> 
    </>
    );
}