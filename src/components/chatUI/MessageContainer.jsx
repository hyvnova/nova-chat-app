// components
import Message from "./Message";

export default function MessageContainer({ messages }) {

  return (
    <div className="message-container">
      { messages.map( (message, index) => {
            return <Message key={index} message={message} />;
        })
      }
    </div>
  );
}