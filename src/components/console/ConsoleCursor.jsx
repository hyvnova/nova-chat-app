//css
import "./styles/ConsoleCursor.css"

export default function ConsoleCursor() {
    return (
        <div className="console-command-line">
            <p className="console-cursor">
                [
                <span style={{color: "yellow"}} >user</span> 
                <span style={{color: "red"}}>@</span>
                <span style={{color: "greenyellow"}}>nova-cmd</span>
                ]-[
                <span style={{color: "red"}}>~\..\console</span>
                ] &raquo;

            </p>

            <input type="text" className="console-input"  maxLength={30} autoFocus autoComplete="off"/>
    </div>
    );
}