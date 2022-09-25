// css 
import "./styles/PopulatRoomItem.css"

// hoooks
import useActiveUsers from "../../hooks/useUsersCount";

export default function PopularRoomItem({room}) {
    const activeUsers = useActiveUsers(room);

    return (
        <div className="display-item-box">
            <p className="display-item-content">{room}</p>
            <div className="room-info-row" title="Number of active users"><i className="fa-solid fa-user" style={{
                color: "white"
                }}></i> 
                <p>
                    {activeUsers || 1}
                </p>
            </div>

        </div>
    )
}