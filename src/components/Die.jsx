import './Die.css'

export default function Die(props) {
    return (
        <button className={`Die ${props.isHeld ? 'held' : null} `}
                onClick={() => props.toggleHold(props.index)}>
            <p>{props.number}</p>
        </button>
    )
}
