//css
import "./styles/Cursor.css"

export default function Cursor({inputState, handleOnSubmit}) {
    const [input, setInput] = inputState
    
    return (
        <div className="console-command-line">
            <p className="console-cursor">
                [
                <span style={{color: "yellow"}} >user</span> 
                <span style={{color: "red"}}>@</span>
                <span style={{color: "greenyellow"}}>nova-cmd</span>
                ]-[
                <span style={{color: "red"}}>~\..\console</span>
                ] 

            </p>
            
            <form onSubmit={handleOnSubmit} className="cursor-form">

                <label htmlFor="consoleInput" className="console-cursor">&raquo;</label>
                <input type="text" id="consoleInput" className="console-input"  
                    maxLength={30} 
                    autoFocus
                    autoComplete="off"
                    value={input}
                    onChange={
                        e => {setInput(e.target.value)}
                    }        
                />
            </form>
            
        </div>
    );
}