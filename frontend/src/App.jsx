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
import TrackView from './components/tracks/TrackView';
import TrackUploadForm from './components/tracks/TrackUploadForm';
import Splash from './Splash';

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
  const response = await fetch(`/api/users/${params.username}/tracks/${params.title}`).catch((reasons) => { throw reasons})
  
  if(response.ok) {
    const data = await response.json();
    if(data.track) {
      
      return data.track
    }
  }
  throw { message: 'track not found' }
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />
      },
      {
        path: '/feed',
        element: <p>Hi</p>
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
        path: '/upload',
        element: <TrackUploadForm />
      },
      {
        path: '/:username',
        loader: userLoader,
        element: <UserView />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ':title',
            loader: trackLoader,
            element: <TrackView />,
            errorElement: <ErrorPage />
          }
        ]
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
