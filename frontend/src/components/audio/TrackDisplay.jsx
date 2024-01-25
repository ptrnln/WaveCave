import { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import './TrackDisplay.css'
import { useSelector } from "react-redux";

export default function TrackDisplay({ duration }) {
    
    const currentTrack = useSelector(state => {
        
        state.audio.isShuffled ? state.tracks[state.audio.currentTrackId]
            : state.tracks[state.audio.currentTrackId]
    })
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        if(currentTrack) setPhotoUrl(currentTrack.photoUrl)
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