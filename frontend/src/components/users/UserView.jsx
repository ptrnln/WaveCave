import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/user'
import { useLoaderData, useParams } from "react-router-dom";

export default function UserView() {
    let user = useLoaderData();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.viewUser({ username: user.username }));
    }, [])

    return (
        <>
            <div id="user-view"><p>This is the user show page for { user.username }</p></div>
        </>
    )
}