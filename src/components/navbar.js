import { Link } from "react-router-dom";

function Navbar(props) {
    const listElementsOfName = props.names.map(name => {
        // return <Link className="link" to={`/${name}`}><li key={name} className="listItem">{name}</li></Link>
        return <li key={name} className="listItem"><Link className="link" to={`/${name}`}>{name}</Link></li>
    })

    return (
        <div className="navbar">
            <Link to="/"><button className="allStudentsButton">View all students</button></Link>
            <br></br>
            <ul className="listOfNames">
                {listElementsOfName}
            </ul>
        </div>
    )
}

export default Navbar

