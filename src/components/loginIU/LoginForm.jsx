// libs
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm({handleSubmit}) {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showLink, setShowLink] = useState(false);

    return (
        <form id="login-form" onSubmit={
            (e) => {
                setRoom(e.target.value);
                setShowLink(handleSubmit(e, username, room));
            }
        }>

            <label htmlFor="username-input">You nickname</label>
            <input name="username-input" type="text" required maxLength={15} 
            onChange={
                e => { setUsername(e.target.value); }
            }/>


            <label htmlFor="room-input">Room Code</label>
            <div className={"row"}>
            <input type="text" name="room-input" required maxLength={15} onChange={
                e => { setRoom(e.target.value); }
            }/>

            {!showLink ? 
            <button type="submit">Check</button> : 
            <Link to="/chat">
                <div className="icon-background">
                    <i className="fa-solid fa-play"></i>
                </div>
            </Link>
            }
            </div>
            <p>Enter a room code and share with others to join the same room!</p>


            

        </form>
    );
}