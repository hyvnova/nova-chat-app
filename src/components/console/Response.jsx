//css
import "./styles/Response.css"

// components
import ResponseDetails from "./ReponseDetails";

export default function Response({props}) {
    let { content, type, details } = props

    // details = list of "details" or things to be exlained in the command

    let color = {
        error: "red",
        warning: "yellow",
        success: "greenyellow",
    }[type]

    return (
        <div className="response-box">
        <div className="row" style={{width: "fit-content"}}>
            <span className="response-arrow" style={{
                color: color
            }}>
            &rsaquo;
            </span>

            <p className="response-text">
                {content} 
            </p>
        </div>
            
            {details && <ResponseDetails details={details} type={type} /> }
        </div>
    );
}