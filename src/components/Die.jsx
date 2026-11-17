import './Die.css'

export default function Die(props) {
    return (
        <button className="Die">
            <p>{props.number}</p>
        </button>
    )
}
