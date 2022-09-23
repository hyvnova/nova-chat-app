import {v4 as uuid} from "uuid"

//css
import "./console/styles/Console.css"

// hooks
import { useContext, useState } from "react"

// context
import { DataContext } from "../contexts/data"

// components
import Cursor from "./console/Cursor"
import Response from "./console/Response"

function set(args) {

}


export default function Console() {
    const {setShowConsole} = useContext(DataContext)

    const [consoleInput, setConsoleInput]  = useState("");
    const [screenItems, setScreenItems] = useState([])


    // console logic
    function handleOnSubmit(e) {
        e.preventDefault()

        let args = consoleInput.split(" ")

        // what the command gonna do
        let action = args[0].toLowerCase()
        args.slice(1) // remove action

        let callback = {
            set: set
        }[action]


        // if action is unknown
        if ( callback === undefined ) {
            setScreenItems([{content: "Unkown Command"}, ...screenItems])
        }
        

    }


    return (
        <div className="console-box" >
            <nav className="console-nav" >
                <button className="close-buttom" onClick={() => {setShowConsole(false)} }>
                    &#10005;
                </button>
            </nav>

            <div className="console-screen">
                <Cursor inputState={[consoleInput, setConsoleInput]} handleOnSubmit={handleOnSubmit} />
                {screenItems.map((item, index) => {
                        return <Response key={index} props={item} />
                    })
                }
            </div>
        </div>
    )
}