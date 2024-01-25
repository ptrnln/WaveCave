import { useLoaderData, useParams } from "react-router-dom"
import * as trackActions from "../../store/track"
import { useDispatch, useSelector } from "react-redux";
import * as audioActions from '../../store/audioPlayer'

export default function TrackView() {
    const dispatch = useDispatch();
    const { title } = useParams();
    const track = useLoaderData();
    

    
    async function handleClick (e) {
        const trackData = await dispatch(audioActions.loadTracks(Object.keys(track)))
        dispatch(audioActions.playTrack())
    }
    debugger
    return (
        <div className="track-view">
            This is the Track View Page for {title}
            <button onClick={handleClick}>Load this track</button>
        </div>
    )
}