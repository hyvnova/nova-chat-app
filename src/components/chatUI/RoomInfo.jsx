//css
import "./styles/RoomInfo.css"

// hooks
import useUsersCount from "../../hooks/useUsersCount";

// this is the thingy at the top right that show online persons and room code
export default function RoomInfo({room}) {
    const usersCount = useUsersCount(room);

    return (
        <div className="room-info-box">
            <div className='room-info-row' title="Room code"> <i className="fa-solid fa-house" style={{
                color: "white"
                }}></i>  
                <p>
                    {room}
                </p>
            </div>

            <div className="room-info-row" title="Number of active users"><i className="fa-solid fa-user" style={{
                color: "white"
                }}></i> 
                <p>
                    {usersCount}
                </p>
            </div>
        </div>
    );
}