import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/user'
import { Outlet, useLoaderData } from "react-router-dom";
import * as trackActions from '../../store/track'
import TrackIndexItem from "../tracks/TrackIndexItem";

export default function UserView() {
    const user = useLoaderData();
    const dispatch = useDispatch();
    const [trackIndexItems, setTrackIndexItems] = useState([]);

    useEffect(() => {
        user.tracks ? dispatch(trackActions.loadTracks(Object.keys(user.tracks))) : null
    }, [])

    useEffect(() => {
        dispatch(userActions.viewUser({ username: user.username }));
    }, [dispatch, user.username])

    useEffect(() => {
        if(!!user.tracks) setTrackIndexItems(Object.values(user.tracks))
    }, [tracks])
    
    
    return (
        <>
            {
                window.location.href.match(new RegExp('[^/]+(?=/$|$)'))[0] === user.username ?
                
                <div id="user-view page">
                    <h1>{ user.username }</h1>
                    <ul className="track-index">
                        {
                            trackIndexItems.map(track => <li key={track.id}><TrackIndexItem track={track}/></li>)
                        }
                    </ul>
                </div>
                :
                <></>
            }
            <Outlet />
        </>
    )
}