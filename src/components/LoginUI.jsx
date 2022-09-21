// css
import "./loginIU/styles/local.css";

// components
import LoginForm from "./loginIU/LoginForm";

// hooks
import { useContext } from "react";

// context
import { DataContext } from "../contexts/data";

// renders all login UI
export default function LoginUI() {
    const {setUsername, setRoom} = useContext(DataContext)

    // form on submit function 
    function formHandleSubmit(e, username, room) {
        e.preventDefault();
        
        // if no username if provided
        if (username === "" || room === "") return false
        
        // set room and username
        setUsername(username)
        setRoom(room)

        // save username and room
        localStorage.setItem("username", username);
        localStorage.setItem("room", room);

        // Allow going to chat room
        return true;
    }
    
    return (
    <>
        <LoginForm handleSubmit={formHandleSubmit}/>
    </>
    );
}