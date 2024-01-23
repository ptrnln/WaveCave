import { useState } from "react";
import AudioControls from "./AudioControls";
import './TrackDisplay.css'

export default function TrackDisplay({ currentTrack, duration }) {
    // const [title, setTitle] = useState('');
    // const [artist, setArtist] = useState('');

    const photoDisplay = <canvas 
        className="photo-display" 
        width={30} 
        height={30}
    />

    // const context = photoDisplay.getContext('2d');

    const trackImage = <img src={currentTrack.thumbnail} alt="" />

    // trackImage.onLoad = () => {
    //     context.drawImage(trackImage.src);
    // }


    return (
        <div className="track-display">
            {/* {photoDisplay} */}
            <img src={currentTrack.thumbnail} alt="" />
            <audio src={currentTrack.src}></audio>
            <div className="track-details">
                <span className="track-details artist-name">{currentTrack.author}</span>
                <span className="track-details title">{currentTrack.title}</span>
            </div>
        </div>
    )
}