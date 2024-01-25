import { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import './TrackDisplay.css'
import { useSelector } from "react-redux";

export default function TrackDisplay({ duration }) {
    
    const currentTrack = useSelector(state => {
        if(state.audio.isShuffled) {
            return state.tracks[state.audio.queue.shuffled[state.audio.currentIndex]]
        }
        return state.tracks[state.audio.queue.original[state.audio.currentIndex]]
    })
    const [photoUrl, setPhotoUrl] = useState('');


    useEffect(() => {
        if(currentTrack) {
            setPhotoUrl(currentTrack.photoUrl)
        }
    }, [currentTrack])




    // const context = photoDisplay.getContext('2d');

 

    // trackImage.onLoad = () => {
    //     context.drawImage(trackImage.src);
    // }


    return (
        <div className="track-display">
           {
            currentTrack !== undefined ? 
                <>
                    <img
                        className="track-display photo-display"
                        width={30}
                        height={30}
                        src={photoUrl}/>
                    <div className="track-details">
                        <span className="track-details title">
                            {currentTrack.title}
                        </span>
                        <span className="track-details artist-name">
                            {currentTrack.artist.username}
                        </span>
                    </div>
                </>
                : 
                <>
                    <canvas
                        className="track-display photo-display"
                        width={30}
                        height={30}/>
                    <div className="track-details">
                    </div>
                </>
           }
        </div>
    )
}