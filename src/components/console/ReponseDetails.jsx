//css
import "./styles/ResponseDetails.css"

export default function ResponseDetails({details, color}) {
    return (
        <div className="response-details-box">
            <ul className="response-details-list" style={{listStyle: `circle inside ${color}` }}>
                {details.map( (item, index) => {
                    return <li key={index}>  <p className="response-details-list-item"> {item} </p></li>
                })
                }
            </ul>
        </div>
    );

}