import { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import './TrackDisplay.css'
import { useSelector } from "react-redux";

export default function TrackDisplay() {
    
    const currentTrack = useSelector(state => {
        if(state.audio.isShuffled) {
            return state.tracks[state.audio.queue.shuffled[state.audio.currentIndex]]
        }
        return state.tracks[state.audio.queue.original[state.audio.currentIndex]]
    })


    return (
        <div className="track-display">
    
                    <img
                        className="track-display photo-display"
                        width={30}
                        height={30}
                        src={currentTrack?.photoUrl}/>
                    <div className="track-details">
                        <span className="track-details title">
                            {currentTrack?.title}
                        </span>
                        <span className="track-details artist-name">
                            {currentTrack?.artist.username}
                        </span>
                    </div>
    
        </div>
    )
}