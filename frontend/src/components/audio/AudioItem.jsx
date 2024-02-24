import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux"; 

export default function AudioItem({ audioRef, progressBarRef, handleNext }) {
    const currentTrack = useSelector(state => {
        if(state.audio.isShuffled) {
            return state.tracks[state.audio.queue.shuffled[state.audio.currentIndex]]
        }
        return state.tracks[state.audio.queue.original[state.audio.currentIndex]]
    }, (a, b) => {
        if (!a || !b) return false
        const filteredkeys = Object.keys(a).filter(k => !['photoUrl', 'sourceUrl', 'artist'].includes(k));
        const aObj = new Object();
        const bObj = new Object();
        filteredkeys.forEach(e => {
            aObj[e] = a[e]
            bObj[e] = b[e]
        });

        return shallowEqual(aObj, bObj) && shallowEqual(a.artist, b.artist)
    })
    const isPlaying = useSelector(state => state.audio.isPlaying);
    const vol = useSelector(state => state.audio.volume)
    
    const audio = <audio 
            className={`audio-track ${currentTrack?.title || ''}`}
            ref={audioRef}
            onEnded={handleNext}
            volume={vol * .01}

        />


    useEffect(() => {
        if(isPlaying) {
          
        audioRef.current.onloadeddata = (e) => {
            e.preventDefault();

            e.target.play();
        
        }
        } else {
            audioRef.current.pause();
        }
    })

    useEffect(() => {
        if(currentTrack !== undefined) {
            document.getElementsByClassName('audio-track')[0].src = currentTrack.sourceUrl
        }
    }, [currentTrack])



    return (
        <>
            {audio}
        </>
    )
}