import { useState } from "react"

export default function AudioControls() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeating, setIsRepeating] = useState(true);

    const playPrevious = (e) => {
        e.stopPropagation();
    }

    const togglePlay = (e) => {
        e.stopPropagation();
        setIsPlaying(playing => !playing)
    }

    const playNext = (e) => {
        e.stopPropagation();
    }
    
    const toggleShuffle = (e) => {
        setIsShuffled(shuffled => !shuffled)
    }
    
    const toggleRepeat = (e) => {
        setIsRepeating(repeats => !repeats)
    }

    return (
        <div className="audio-controls container">
            <div className="track-controls container">
                <div className="previous button">
                    <i className="fa fa-step-backward" onClick={playPrevious}></i>
                </div>
                <div className="play-pause button">
                { isPlaying ? 
                    <i className='fa fa-pause' onClick={togglePlay} />
                    :
                    <i className='fa fa-play' onClick={togglePlay} />
                }
                </div>
                <div className="next button">
                    <i className="fa fa-step-forward" onClick={playNext}></i>
                </div>
            </div>
            <div className="queue-controls container">
                <div id="shuffle-button" className="shuffle button">
                    <i 
                        className="fa fa-random" 
                        onClick={toggleShuffle}
                    ></i>
                </div>
                <div className="repeat button">
                    <i 
                        className="fa fa-repeat" 
                        onClick={toggleRepeat}
                    ></i>
                </div>
            </div>
        </div>
    )
}