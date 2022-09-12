
// css
import './chatUI/styles/local.css';

//components
import MessageContainer from './chatUI/MessageContainer';
import MessageForm from './chatUI/MessageForm';

// contexts
import { SocketContext } from '../contexts/socket';

// hooks
import { useState, useContext, useEffect } from 'react';


// this components loads entire chat screen (chatScreen folder)
export default function ChatUI({username, room}) {
  const [messages, setMessages] = useState([]);

  // message author text color
  const [color, setColor] = useState("#" + Math.floor(Math.random()*16777215).toString(16))


  if (username === "") { username = localStorage.getItem("username"); }
  if (room === "") { room = localStorage.getItem("room"); }

  //client sockette
  const socket = useContext(SocketContext);

  // join room
  socket.emit("join-room", room);

  // recover messages
  useEffect( () => {
    if (messages.length > 0) return;

    socket.emit("request-messages", room);
    socket.on("get-messages", recoveredMessages => {
      setMessages([...messages, ...recoveredMessages]);
    })

  }, [])

  // reciveving messages
  socket.on("receive-message", (message) => {
    // message = {author: username, content: message}
    setMessages([message, ...messages ]);
  })

  // form on submit function 
  function formHandleSubmit(e, message, setMessage) {
      e.preventDefault();
      if (message === "") return

      setMessages([{author: username, content: message, color: color}, ...messages]);

      socket.emit("send-message", {author: username, content: message, color: color}, room)

      setMessage("")
  }

  return (
    <>
      <MessageContainer  messages={messages} />
      <MessageForm handleSubmit={formHandleSubmit} />
    </>
  );
}
