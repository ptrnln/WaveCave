import { useLoaderData } from "react-router-dom"
import * as trackActions from "../../store/track"
import { useDispatch } from "react-redux";
import * as audioActions from '../../store/audioPlayer'

export default function TrackView() {
    const dispatch = useDispatch();
    let track = useLoaderData();

    
    async function handleClick (e) {
        await dispatch(audioActions.loadTracks(Object.keys(track)))
        dispatch(audioActions.playTrack())
    }
    return (
        <div className="track-view">
            This is the Track View Page for {track.title}
            <button onClick={handleClick}>Load this track</button>
        </div>
    )
}