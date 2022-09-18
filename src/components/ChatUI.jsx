
// css
import './chatUI/styles/local.css';

//components
import MessageContainer from './chatUI/MessageContainer';
import MessageForm from './chatUI/MessageForm';
import RoomInfo from './chatUI/RoomInfo';

// contexts
import { SocketContext } from '../contexts/socket';

// hooks
import { useState, useContext, useEffect } from 'react';


// this components loads entire chat screen (chatScreen folder)
export default function ChatUI({username, room}) {

  // chat items
  const [chatItems, setChatItems] = useState([]);

  // message author text color
  const color = localStorage.getItem("color") 
  if (color === undefined) {
    const color = "#" + Math.floor(Math.random()*16777215).toString(16)
    localStorage.setItem("color", color)
  } 

  if (username === "") { username = localStorage.getItem("username"); }
  if (room === "") { room = localStorage.getItem("room"); }

  //client sockette
  const socket = useContext(SocketContext);

  // join room
  socket.emit("join-room", room, username);

  // recover messages
  useEffect( () => {
    if (chatItems.length > 0) return;

    socket.emit("request-messages", room);
    socket.on("get-messages", recoveredMessages => {

      setChatItems([
        ...recoveredMessages.map( (item) => {
          return ["Message", item]
        }),
        ...chatItems])
      
    })}, [])
  
  // when user joins the room
  socket.on("user-joined-room", user => {
    setChatItems([ ["SysMessage", {content: `${user} Joined the room`}] , ...chatItems])
  })

  // when user leaves the room
  socket.on("user-left-room", user => {
    console.log("left");
    setChatItems([ ["SysMessage", {content: `${user} Leaved the room`, color: "#ddd000"}] , ...chatItems])
  })


  // reciveving messages
  socket.on("receive-message", (message) => {
    // message = {author: username, content: message}
    setChatItems([["Message", message], ...chatItems])
  })

  // form on submit function 
  function formHandleSubmit(e, message, setMessage) {
      e.preventDefault();
      if (message === "") return

      setChatItems([["Message", {author: username, content: message, color: color}], ...chatItems])
      socket.emit("send-message", {author: username, content: message, color: color}, room)
      setMessage("")
  }

  return (
    <>
      <RoomInfo room={room} />
      <MessageContainer  chatItems={chatItems} />
      <MessageForm handleSubmit={formHandleSubmit} />
    </>
  );
}
