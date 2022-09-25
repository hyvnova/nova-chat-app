// css
import "./styles/PopularRooms.css"

// components
import PopularRoomItem from "./PopularRoomItem"

// hooks
import usePopularRooms from "../../hooks/usePopularRooms"

export default function PopularRoom() {

    // gets 3 most active rooms
    let rooms = usePopularRooms()
    return (
        <div className="popular-chats-box">
            <h1 className="title"> Popular Rooms</h1>
            <div className="popular-chats-display">
                {rooms.map((room, index) => {
                        return <PopularRoomItem key={index} room={room} />
                    })
                }
                
            </div>
        </div>
    )
}