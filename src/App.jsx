import { Routes, Route } from "react-router-dom";

// css
import './styles/pico.css'; 
import './styles/global.css';

// components (should only be UI components here)
import ChatUI from './components/ChatUI';
import LoginUI from './components/LoginUI';

// contexts
import { SocketContext, socket } from './contexts/socket';

// hoooks
import { useState } from 'react';

export default function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    return (
    <>
        <SocketContext.Provider value={socket}>

            <Routes>
                <Route path="/" element={<LoginUI setUsername={setUsername} setRoom={setRoom} />} />
                <Route path="/chat" element={<ChatUI username={username} room={room} />} />
            </Routes> 

        </SocketContext.Provider> 
    </>
    );
}