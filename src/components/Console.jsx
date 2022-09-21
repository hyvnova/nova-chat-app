//css
import "./console/styles/Console.css"

// hooks
import { useContext } from "react"

// context
import { DataContext } from "../contexts/data"

// components
import ConsoleCursor from "./console/ConsoleCursor"

export default function Console() {
    const {setShowConsole} = useContext(DataContext)

    return (
        <div className="console-box" >
            <nav className="console-nav" >
                <button className="close-buttom" onClick={() => {setShowConsole(false)} }>
                    &#10005;
                </button>
            </nav>

            <div className="console-screen">
                <ConsoleCursor />

            </div>
        </div>
    )
}