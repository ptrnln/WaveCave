import { useEffect, useState } from "react"
import * as audioPlayerActions from '../../store/audioPlayer';
import { useDispatch, useSelector } from "react-redux";
import './AudioControls.css';

export default function AudioControls({ handleNext }) {
    const dispatch = useDispatch();

    const isPlaying = useSelector(state => state.audio.isPlaying);

    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeating, setIsRepeating] = useState('false');
    const [shuffleColor, setShuffleColor] = useState('Black');
    const [repeatColor, setRepeatColor] = useState('Black');

    

    const togglePlay = (e) => {
        e.stopPropagation();
        if(isPlaying)  {
            dispatch(audioPlayerActions.pauseTrack())
        } else {
            dispatch(audioPlayerActions.playTrack())
        }
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
        isShuffled ? setShuffleColor('#f50') : setShuffleColor('Black')
    }, [isShuffled, setIsShuffled])

    useEffect(() => {
        isRepeating === 'false' ? setRepeatColor('Black') : setRepeatColor('#f50')
    }, [isRepeating, setIsRepeating])



    return (
        <div className="audio-controls container">
            <div className="track-controls container">
                <div className="previous button">
                    <i className="fa fa-step-backward" onClick={(e) => { 
                        e.preventDefault(); 
                        dispatch(audioPlayerActions.playPrev()) 
                    }}/>     
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
                            className={
                                isRepeating === 'once' ? "wc-icon-cycle-1" : "wc-icon-cycle"
                            }
                            onClick={toggleRepeat}
                        ></i>
                    </div>
                </span>
            </div>
        </div>
    )
}