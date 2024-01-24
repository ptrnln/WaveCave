import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as userActions from '../../store/user'
import { Outlet, useLoaderData } from "react-router-dom";
import * as trackActions from '../../store/track'

export default function UserView() {
    const user = useLoaderData();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(trackActions.loadTracks(Object.keys(user.tracks)))
    }, [])

    useEffect(() => {
        dispatch(userActions.viewUser({ username: user.username }));
    }, [dispatch, user.username])

    return (
        <>
            <div id="user-view"><p>This is the user show page for { user.username }</p></div>
            <Outlet />
        </>
    )
}