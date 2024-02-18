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

    const photoUrl = useSelector(state => {
        if(state.audio.isShuffled) {
            return state.tracks[state.audio.queue.shuffled[state.audio.currentIndex]]?.photoUrl
        }
        return state.tracks[state.audio.queue.original[state.audio.currentIndex]]?.photoUrl
    })

    const title = useSelector(state => {
        if(state.audio.isShuffled) {
            return state.tracks[state.audio.queue.shuffled[state.audio.currentIndex]]?.title
        }
        return state.tracks[state.audio.queue.original[state.audio.currentIndex]]?.title
    })

    const artistName = useSelector(state => {
        if(state.audio.isShuffled) {
            return state.tracks[state.audio.queue.shuffled[state.audio.currentIndex]]?.artist?.username
        }
        return state.tracks[state.audio.queue.original[state.audio.currentIndex]]?.artist?.username
    })
   

    return (
        <div className="track-display">
    
                    <img
                        className="track-display photo-display"
                        width={30}
                        height={30}
                        src={photoUrl || null}/>
                    <div className="track-details">
                        <span className="track-details title">
                            {title || ''}
                        </span>
                        <span className="track-details artist-name">
                            {artistName || ''}
                        </span>
                    </div>
    
        </div>
    )
}