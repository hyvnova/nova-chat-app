//css
import "./styles/RoomInfo.css"

// hooks
import useActiveUsers from "../../hooks/activeUser";

// this is the thingy at the top right that show online persons and room code
export default function RoomInfo({room}) {
    const activeUsers = useActiveUsers(room);

    return (
        <div className="room-info-box">
            <div className='room-info-row'> <i className="fa-solid fa-house" style={{
                color: "#5160e4"
                }}></i>  
                <p>
                    {room}
                </p>
            </div>

            <div className="room-info-row"><i className="fa-solid fa-user" style={{
                color: "#5160e4"
                }}></i> 
                <p>
                    {activeUsers}
                </p>
            </div>
        </div>
    );
}