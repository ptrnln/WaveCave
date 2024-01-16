import Navigation from "./components/navigation/Navigation";

const welcomeHeader = <h1>Welcome!</h1>

function Layout() {
    return (
        <>
            {welcomeHeader}
            <Navigation />
        </>
    )
}
export default Layout;