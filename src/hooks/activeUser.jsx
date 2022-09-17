// hoooks
import { useContext, useState } from "react"

// contexts
import { SocketContext } from "../contexts/socket"

export default function useActiveUsers() {
    const [activeUsers, setActiveUsers] = useState(0);

    const socket = useContext(SocketContext);

    socket.on("update-active-users", count => {
        setActiveUsers(count);
    })

    return activeUsers;
}