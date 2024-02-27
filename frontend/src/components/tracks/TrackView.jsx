import { Outlet, useLoaderData, useParams } from "react-router-dom"

import { useDispatch } from "react-redux";
import * as audioActions from '../../store/audioPlayer'

export default function TrackView() {
    const dispatch = useDispatch();
    const { title } = useParams();
    const track = Object.values(useLoaderData())[0];
    
    async function handleClick (e) {
        const trackData = await dispatch(audioActions.loadTracks([track.id]))
        dispatch(audioActions.playTrack());
    }

    return (
            window.location.href.match(new RegExp('[^/]+(?=/$|$)'))[0] === 'update' ?
            
            <Outlet />
            :
            <div className="track-view container">
                <span className="track-view title">{title}</span>
                <br />
                <span className="track-view artist-info">{track.artist.username}</span>
                <br />
                <span className="track-view description">{track.description}</span>
                <button onClick={handleClick}>Play this track</button>
            </div>
    )
}