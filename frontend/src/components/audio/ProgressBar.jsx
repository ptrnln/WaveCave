import './ProgressBar.css'
export default function ProgressBar({ progressBarRef, audioRef }) {

    

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value
    }

    return (
        <div className="progress-bar">
            <span className="current-time">00:00</span>
            <input type="range" />
            <span className="track-duration">03:34</span>
        </div>
    )
}