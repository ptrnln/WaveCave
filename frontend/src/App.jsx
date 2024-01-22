import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/LoginForm';
import SignUpForm from './components/session/SignUpForm';
import Navigation from './components/navigation/Navigation';
import * as sessionActions from './store/session';
import UserView from './components/users/UserView';
import ErrorPage from './ErrorPage';
import AudioPlayerContainer from './components/audio/AudioPlayerContainer';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
      <AudioPlayerContainer />
    </>
  );
}

const userLoader = async ({request, params}) => {
  const response = await fetch(`/api/users/${params.username}`);
  if(response.ok) {
    const data = await response.json();
    if(data.user) {
      
      return data.user
    } else throw { message: `User ${params.username} does not exist`, status: 404 };
  } 
}

const trackLoader = async ({request, params}) => {
  const response = await fetch(`api/tracks/`)
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: "/signup",
        element: <SignUpForm />
      },
      {
        path: '/:username',
        loader: userLoader,
        element: <UserView />,
        errorElement: <ErrorPage />,
        children: {
          path: '/:title',
          loader: trackLoader,
        }
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
