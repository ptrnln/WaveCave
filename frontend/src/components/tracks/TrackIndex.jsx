import { useEffect, useState } from "react"
import TrackIndexItem from "./TrackIndexItem";
import { useDispatch } from "react-redux";
import * as trackActions from '../../store/track'

export default function TrackIndex() {
    const [loaded, setLoaded] = useState(false);
    const [tracks, setTracks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('/api/tracks').then(async val => {
            const tracksData = Object.values(await val.json());
            dispatch(trackActions.receiveTracks(tracksData))
            setTracks(tracksData);
            setLoaded(true);
        })
    }, [])

    
    return (
        <ul
            className="track-index">
            {loaded && tracks.map(track => <li><TrackIndexItem track={Object.values(track)[0]} /></li>)}
        </ul>
    )
}