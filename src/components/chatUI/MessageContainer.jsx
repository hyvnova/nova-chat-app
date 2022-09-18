// components
import Message from "./Message";
import SysMessage from "./SysMessage";

const types = {
  "message" : Message,
  "sysmessage" : SysMessage
}

export default function MessageContainer({ chatItems }) {
  return (
    <div className="message-container">
      { chatItems.map( ([type, props], index) => {
          let Component = types[type.toLowerCase()]
          return <Component key={index} props={props}  />;
        })
      }
    </div>
  );
}