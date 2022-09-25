// hoooks
import { useContext, useState } from "react"

// contexts
import { SocketContext } from "../contexts/socket"

export default function usePopularRooms() {
    const [rooms, setRooms] = useState([]);
    const socket = useContext(SocketContext);

    // asks for current popular rooms
    socket.emit("request-popular-rooms")


    socket.on("update-popular-rooms", (rooms) => {
        setRooms(rooms)
    })

    return rooms;
}