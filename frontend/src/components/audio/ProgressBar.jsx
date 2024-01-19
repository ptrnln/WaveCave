import { useEffect } from 'react'
import './ProgressBar.css'
export default function ProgressBar({ progressBarRef, audioRef }) {

    

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value
    }

    useEffect(() => {
        console.log(audioRef.current?.currentTime)
    })

    return (
        <div className="progress-bar">
            <span className="time-display current-time">00:00</span>
            <input 
                type="range" 
                ref={progressBarRef}
                defaultValue={0}
                onChange={handleProgressChange}
            />
            <span className="time-display track-duration">03:34</span>
        </div>
    )
}