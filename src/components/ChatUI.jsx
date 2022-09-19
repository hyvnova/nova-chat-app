// css
import './chatUI/styles/local.css';

//components
import ChatContainer from './chatUI/ChatContainer';
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

  // recover chatitems 
  useEffect( () => {
    if (chatItems.length > 0) return;

    socket.emit("request-messages", room);
    socket.on("get-messages", recovedItems => {
      recovedItems = [...recovedItems.reverse()]
      setChatItems([
        ...recovedItems,
        ...chatItems
      ])
      
    })}, [])
  
  // // when user joins the room
  // socket.on("user-joined-room", join_message => {
  //   setChatItems([ join_message , ...chatItems])
  // })

  // // when user leaves the room
  // socket.on("user-left-room", left_message => {
  //   setChatItems([ left_message , ...chatItems])
  // })


  // reciveving messages
  socket.on("receive-message", (message) => {
    // message = {author: username, content: message}
    setChatItems([message, ...chatItems])
  })

  // form on submit function 
  function formHandleSubmit(e, message_content, setMessage) {
      e.preventDefault();
      if (message_content === "") return

      let message = {type: "Message", props: {author: username, content: message_content, color: color}}

      setChatItems([message, ...chatItems])
      socket.emit("send-message", message, room)
      setMessage("")
  }

  return (
    <>
      <RoomInfo room={room} />
      <ChatContainer  chatItems={chatItems} />
      <MessageForm handleSubmit={formHandleSubmit} />
    </>
  );
}
