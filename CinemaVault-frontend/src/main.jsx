import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {MantineProvider} from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './views/Home.jsx'
import AddMovie from './views/AddMovie.jsx';
import EditMovie from './views/EditMovie.jsx';
import Movies from './views/Movies.jsx';
import Movie from './views/Movie.jsx';
import SignIn from './views/Login.jsx';
import SignUp from './views/Register.jsx';
import Welcome from './views/Welcome.jsx';
import GenericNotFound from './views/GenericNotFound.jsx';
import MainLayout from './layouts/MainLayout.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css';
import './App.css'
import AuthLayout from './layouts/AuthLayout.jsx';


  const router = createBrowserRouter([
    {
      element: <AuthLayout/>,
      children:[
            {
      path: '/',
      element: <Welcome/>
    },
    {
      path: '*',
      element: <GenericNotFound/>
    },
    {
      element: <MainLayout/>,
      children:[
        {
          path: '/home',
          element: <Home/>
        },
        {
          path: '/movies',
          element: <Movies/>
        },
        {
          path : '/movie/:movieId',
          element: <Movie/>
        },
        {
          path: '/movie/:movieId/edit',
          element: <EditMovie/>
        },
        {
          path: '/add/movie',
          element: <AddMovie/>
        },
        {
          path: '/movies/genre/:genre',
          element: <Movies/>
        },
        {
          path: '/movies/year/:year',
          element: <Movies/>
        },
        {
          path: '/movies/category/:category',
          element: <Movies/>
        }
      ]
    },
    {
      path: '/login',
      element: <SignIn/>
    },
    {
      path: '/register',
      element: <SignUp/>
    }
      ]
    }
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications/>
        <RouterProvider router={router}/>
    </MantineProvider>
  </StrictMode>,
)
