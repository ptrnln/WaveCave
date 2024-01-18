import { useEffect, useState } from "react"

export default function AudioControls({ handleNext }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeating, setIsRepeating] = useState('false');
    const [shuffleColor, setShuffleColor] = useState('Black');
    const [repeatColor, setRepeatColor] = useState('Black');

    const playPrevious = (e) => {
        e.stopPropagation();
    }

    const togglePlay = (e) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying)
        const audio = document.querySelector(".audio-player audio");
        isPlaying ? audio.pause() : audio.play();
        debugger
    }
    
    const toggleShuffle = (e) => {
        setIsShuffled(shuffled => !shuffled)
    }
    
    const toggleRepeat = (e) => {
        switch(isRepeating) {
            case 'false':
                setIsRepeating('once');
                break;
            case 'once':
                setIsRepeating('always');
                break;
            case 'always':
                setIsRepeating('false');
                break;
        }
    }

    useEffect(() => {
        isShuffled ? setShuffleColor('Tomato') : setShuffleColor('Black')
    }, [isShuffled, setIsShuffled])

    useEffect(() => {
        isRepeating === 'false' ? setRepeatColor('Black') : setRepeatColor('Tomato')
    }, [isRepeating, setIsRepeating])

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
                    <i className="fa fa-step-forward" onClick={handleNext}></i>
                </div>
            </div>
            <div className="queue-controls container">
                <span style={{color: shuffleColor}}>
                    <div id="shuffle-button" className="shuffle button">
                        <i 
                            className="fa fa-random" 
                            onClick={toggleShuffle}
                        ></i>
                    </div>
                </span>
                <span style={{color: repeatColor}}>
                    <div className="repeat button">
                        <i 
                            className="fa fa-repeat" 
                            onClick={toggleRepeat}
                        ></i>
                    </div>
                </span>
            </div>
        </div>
    )
}