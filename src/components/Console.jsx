
//css
import "./console/styles/Console.css"

// hooks
import { useContext, useState } from "react"

// context
import { DataContext } from "../contexts/data"

// components
import Cursor from "./console/Cursor"
import Response from "./console/Response"

//commands
import { set } from "./console/commands"

export default function Console() {

    const [consoleInput, setConsoleInput]  = useState("");
    const [screenItems, setScreenItems] = useState([ ])

    const Data = useContext(DataContext)
    let {setShowConsole} = Data

    // console logic
    function handleOnSubmit(e) {
        e.preventDefault()

        let args = consoleInput.split(" ")

        // what the command gonna do
        let action = args[0].toLowerCase()
        args = args.slice(1) // remove action

        // especial commands
        if (action === "clear" || action === "cls")  {
            setScreenItems([]);
            setConsoleInput("")
            return
        } else if (action === "exit" || action === "close") {
            setConsoleInput("")
            setShowConsole(false)
            return
        }


        let callback = {
            set: set
        }[action]

        // if action is unknown
        if ( callback === undefined ) { setScreenItems([{content: "Unkown Command", type: "error"}, ...screenItems]) }
        // if action is valid return callback response
        else{ setScreenItems([callback(args, Data), ...screenItems]) }    

        // clear input
        setConsoleInput("")
    }


    return (
        <div className="console-box" draggable="true">
            <nav className="console-nav" >
                <button className="close-buttom" onClick={() => {setShowConsole(false)} }>
                    &#10005;
                </button>
            </nav>

            <div  className="console-screen">
                <Cursor inputState={[consoleInput, setConsoleInput]} handleOnSubmit={handleOnSubmit} />

                {screenItems.map((item, index) => {
                        return <Response key={index} props={item} />
                    })
                }
            </div>
        </div>
    )
}