import { useEffect } from "react";
import { useSelector } from "react-redux"; 
// import * as audioPlayerActions from '../../store/audioPlayer';

export default function AudioItem({ audioRef, handleNext }) {
    // const dispatch = useDispatch();
    
    const currentTrack = useSelector(state => {
        const { queue, isShuffled, currentIndex } = state.audio

        if(isShuffled) {
            return state.tracks[queue.shuffled[currentIndex]]
        }
        return state.tracks[queue.original[currentIndex]]
    }, (a, b) => {
        return a?.id === b?.id
    });

    const isPlaying = useSelector(state => state.audio.isPlaying);
    const vol = useSelector(state => state.audio.volume)
    
    const audio = <audio 
            className={`audio-track ${currentTrack?.title || ''}`}
            ref={audioRef}
            onEnded={handleNext}
            volume={vol * .01}/>
    

    useEffect(() => {
        (async () => {
        if(isPlaying && !!audioRef.current.src) {
            try {
                await audioRef.current.play();
            }
            catch(e) {
                try {
                    await audioRef.current.load();

                    audioRef.current.oncanplaythrough = async (e) => {
                        e.preventDefault();
            
                        await audioRef.current.play();
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
            if(currentTrack !== undefined && audioRef.current.src !== currentTrack?.sourceUrl) {
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