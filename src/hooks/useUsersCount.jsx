// hoooks
import { useContext, useState } from "react"

// contexts
import { SocketContext } from "../contexts/socket"

export default function useUsersCount(room) {
    const [activeUsers, setActiveUsers] = useState(0);

    const socket = useContext(SocketContext);

    // asks for active users in room and now update will be called when users in room change
    socket.emit("request-users-count", room)

    socket.on("update-users-count", count => {
        setActiveUsers(count);
    })

    return activeUsers;
}