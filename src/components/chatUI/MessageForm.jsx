import { useState } from "react";


export default function MessageForm({handleSubmit}) {

    const [message, setMessage] = useState("");

    return (
        <form id="message-form" onSubmit={
            (e) => {
                handleSubmit(e, message, setMessage);
            }
        }>
            <div className="background-box">
                <input name="message-input" type="text" 
                    placeholder="Message"
                    autoComplete="off"

                value={message}
                 onChange={
                    e => { setMessage(e.target.value); }
                }/>

                <button name="send" type="submit">
                <i className="fa-solid fa-paper-plane"></i></button>
            </div>

        </form>
    );
}