import { useEffect, useState } from "react"
import TrackIndexItem from "./TrackIndexItem";
import { useDispatch, useSelector } from "react-redux";
import * as trackActions from '../../store/track'

export default function TrackIndex() {
    const [loaded, setLoaded] = useState(false);
    const tracks = useSelector(state => Object.values(state.tracks))
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/api/tracks').then(async val => {
            const tracksData = await val.json();
            dispatch(trackActions.receiveTracks(tracksData.tracks))
            setLoaded(true);
        })
    }, [])

    
    return (
        <ul
            className="track-index">
            {loaded && tracks.map(track => <li key={`track ${track.title}`}><TrackIndexItem track={track} /></li>)}
        </ul>
    )
}