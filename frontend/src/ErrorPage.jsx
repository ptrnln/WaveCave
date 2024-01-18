import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const errors = useRouteError();

    debugger
    return (
        <>
        <h1>{errors.status}</h1>
        <p>{errors.message}</p>
        </>
    )
}