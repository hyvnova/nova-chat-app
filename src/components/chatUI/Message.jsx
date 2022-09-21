//css
import "./styles/Message.css"

export default function Message({props}) {
    const {author, content, color, timestamp} = props


    return (
      <div className="message-box" >
        
        <div className="message-header">
          <p className="message-author"  title="Message author" style={{
              color: color
            }}> 
            {author} 
          </p>

          <p className="message-timestamp">{timestamp}</p>
            
        </div>
    

        <div className="content-box">
          <p className="message-content"> {content} </p>
        </div>
      </div>
    );
}
  