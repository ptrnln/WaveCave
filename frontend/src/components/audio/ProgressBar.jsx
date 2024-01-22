import { useCallback, useEffect, useRef } from 'react'
import './ProgressBar.css'
import { useSelector } from 'react-redux';

export default function ProgressBar({ progressBarRef, audioRef }) {
    const isPlaying = useSelector(state => state.audio.isPlaying)
    const playAnimationRef = useRef();

    const handleProgressChange = (e) => {
        e.stopPropagation()
        const newValue = progressBarRef.current ? progressBarRef.current.value : 0
        audioRef.current.currentTime = (progressBarRef.current.value / 100) * audioRef.current.duration
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${newValue}%`
        );
    };

    const updateProgress = useCallback(() => {
        const newValue = audioRef.current ? (audioRef.current.currentTime / audioRef.current.duration) * 100 : 0
        progressBarRef.current.value = newValue;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${newValue}%`
        );
        playAnimationRef.current = requestAnimationFrame(updateProgress);
    }, [audioRef, progressBarRef.current?.value, handleProgressChange]);
    
    useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
          playAnimationRef.current = requestAnimationFrame(updateProgress);
        } else {
          audioRef.current.pause();
          cancelAnimationFrame(playAnimationRef.current);
        }
    }, [isPlaying, audioRef, updateProgress]);
   

    return (
        <div className="progress-bar">
            <span className="time-display current-time">00:00</span>
            <input 
                type="range" 
                ref={progressBarRef}
                step={0.001}
                defaultValue={0}
                onChange={handleProgressChange}
            />
            <span className="time-display track-duration">03:34</span>
        </div>
    )
}