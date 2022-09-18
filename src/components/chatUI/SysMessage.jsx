
// system messages as "user joined the room" or other important messages
export default function SysMessage({props}) {
    const {content, color} = props;

    return (
        <div className="sys-message-box" style={{
            borderColor: color
        }}>
            <p className="sys-message-content">{content}</p>
        </div>
    );
}