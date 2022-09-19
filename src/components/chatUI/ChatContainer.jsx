//css
import "./styles/ChatCotainer.css"

// components
import Message from "./Message";
import SysMessage from "./SysMessage";

const types = {
  "message" : Message,
  "sysmessage" : SysMessage
}

export default function ChatContainer({ chatItems }) {
  return (
    <div className="chat-container">
      { chatItems.map( ( {type, props} , index) => {
          let Component = types[type.toLowerCase()]
          return <Component key={index} props={props}  />;
        })
      }
    </div>
  );
}