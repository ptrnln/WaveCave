import { useSelector } from "react-redux"
import QueueItem from "./QueueItem";
import { useState } from "react";
import './QueueControl.css'

export default function QueueControl () {
    const [display, setDisplay] = useState(false)
    // const currentIndex = useSelector(state => state.audio.currentIndex);
    const tracks = useSelector(state => {
        const queue = state.audio.isShuffled ?
            state.audio.queue.shuffled
            :
            state.audio.queue.original
        return queue.map(idx => state.tracks[idx])
    })

    const toggleDisplay = (e) => {
        e.preventDefault();
        setDisplay(!display);
    }

    return (
        <>
            <button className="queue-btn" onClick={toggleDisplay}>
                <i className="fa-solid fa-music"/>
            </button>
            { display &&
            (<div className="queue-control container">
                <div className="header">Next Up</div>
                <ul className="queue">
                    { tracks.map(track => <li key={`${track.title}`}><QueueItem track={track}/></li>)}
                </ul>
            </div>)
            }
        </>
    )
    
}