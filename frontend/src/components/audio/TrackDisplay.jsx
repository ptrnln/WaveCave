import { useState } from "react";
import AudioControls from "./AudioControls";

export default function TrackDisplay({ currentTrack, duration }) {
    // const [title, setTitle] = useState('');
    // const [artist, setArtist] = useState('');

    return (
        <div className="track-display">
            <img src={currentTrack.thumbnail} alt="" />
            <audio src={currentTrack.src}></audio>
        </div>
    )
}