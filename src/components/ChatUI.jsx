// css
import './chatUI/styles/local.css';

//components
import ChatContainer from './chatUI/ChatContainer';
import MessageForm from './chatUI/MessageForm';
import RoomInfo from './chatUI/RoomInfo';
import Console from './Console';

// contexts
import { SocketContext } from '../contexts/socket';
import { DataContext } from '../contexts/data';

// hooks
import { useState, useContext, useEffect } from 'react';


// this components loads entire chat screen (chatScreen folder)
export default function ChatUI() {
  var {username, room, color, showConsole, setShowConsole} = useContext(DataContext)

  // chat items
  const [chatItems, setChatItems] = useState([]);


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

  // when a message is sent
  function formHandleSubmit(e, message_content, setMessage) {
      e.preventDefault();
      if (message_content === "") return

      // commands
      if (message_content.toLowerCase() === "/cmd") {
        setShowConsole(true);
      }


      // message object
      let message = {
        type: "Message", props: 
          {
            author: username, 
            content: message_content, 
            color: color, 
            timestamp: new Date().toLocaleString()
          }
        }

      setChatItems([message, ...chatItems])
      socket.emit("send-message", message, room)
      setMessage("")
  }

  return (
    <>
      <RoomInfo room={room} />
      <ChatContainer  chatItems={chatItems} />
      <MessageForm handleSubmit={formHandleSubmit} />

      <Console />
      {/* {showConsole && <Console props={{setShowConsole}}/>} */}
    </>
  );
}
