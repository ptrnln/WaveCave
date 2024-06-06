import { useEffect } from "react";
import { useSelector } from "react-redux"; 
// import * as audioPlayerActions from '../../store/audioPlayer';

export default function AudioItem({ audioRef, handleNext }) {
    // const dispatch = useDispatch();
    
    const currentTrack = useSelector(state => {
        if (state.audio.isShuffled) {
            return state.tracks[state.audio.queue.shuffled[state.audio.currentIndex]]
        }
        return state.tracks[state.audio.queue.original[state.audio.currentIndex]]
    }, (a, b) => {
        if (!a || !b) return false
        // const filteredkeys = Object.keys(a).filter(k => !['photoUrl', 'sourceUrl', 'artist'].includes(k));
        // const aObj = new Object();
        // const bObj = new Object();
        // filteredkeys.forEach(e => {
        //     aObj[e] = a[e]
        //     bObj[e] = b[e]
        // });

        // return shallowEqual(aObj, bObj)
        return a.id === b.id
    });

    const isPlaying = useSelector(state => state.audio.isPlaying);
    const vol = useSelector(state => state.audio.volume)
    
    const audio = <audio 
            className={`audio-track ${currentTrack?.title || ''}`}
            ref={audioRef}
            onEnded={handleNext}
            volume={vol * .01}/>
    

    useEffect(() => {
        debugger
        (async () => {
        if(isPlaying && audioRef.current.src) {
            try {
                await audioRef.current.play();
            }
            catch(e) {
                try {
                    // await audioRef.current.load();

                    audioRef.current.oncanplaythrough = (e) => {
                        e.preventDefault();
            
                        audioRef.current.play();
                    }
                }
                catch(e) {
                    console.log(e);
                }
            }
        }
        if(!isPlaying) {
            audioRef.current.oncanplaythrough = undefined;
            if (!audioRef.current.paused) {
                audioRef.current.pause();
            }
        }
        })();
    }, [isPlaying, audioRef, currentTrack])

    useEffect(() => {
        (async () => {
            if(currentTrack !== undefined && audioRef.current.src !== currentTrack.sourceUrl) {
                audioRef.current.src = currentTrack.sourceUrl
                await audioRef.current.load();
            }
            if(currentTrack === undefined){
                audioRef.current.src = ''
            }
        })()
    }, [isPlaying, currentTrack])

    return (
        <>
            {audio}
        </>
    )
}