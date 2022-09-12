


export default function Message({message}) {
    const {author, content, color} = message;
    return (
      <div className="message-box" >
        <p className="message-title"  title="Message author" style={{
          color: color
        }}> {author} 
        </p>
        <div className="content-box">
          <p className="message-content"> {content} </p>
        </div>
      </div>
    );
}
  