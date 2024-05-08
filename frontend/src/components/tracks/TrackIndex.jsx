import { useEffect, useState } from "react"
import TrackIndexItem from "./TrackIndexItem";
import { useDispatch, useSelector } from "react-redux";
import * as trackActions from '../../store/track'
import './TrackIndex.css'

export default function TrackIndex() {
    const [loaded, setLoaded] = useState(false);
    const tracks = useSelector(state => state.tracks)
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/api/tracks').then(async val => {
            const tracksData = await val.json();
            dispatch(trackActions.receiveTracks(tracksData.tracks))
            setLoaded(true);
        })
    }, [])

    return (
        <div className="track-index container">
            <h1>Tracks</h1>
            <ul
                className="track-index">
                {loaded && Object.values(tracks).map(track => <li key={track.id}><TrackIndexItem track={track} /></li>)}
            </ul>
        </div>
    )
}