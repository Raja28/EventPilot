import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import Layout from './layout.jsx'
import Home from './pages/Home.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import OpenRoute from './components/OpenRoute.jsx'
import Dashboard from './components/Dashboard.jsx'
import Event from './components/forms/Event.jsx'
import { UserJoinedEvents } from './pages/UserJoinedEvents.jsx'
import { USER_EVENT_JOINED_API } from './utils/api.js'

const router = createBrowserRouter([
  { path: "/", element: <OpenRoute><App /></OpenRoute> },
  {
    path: "", element: <PrivateRoute><Layout /></PrivateRoute>, children: [
      { path: "home", element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/event/", element: <Event /> },
      { path: "/dashboard/event/:eventId", element: <Event /> },
      { path: "/dashboard/event/registered", element: <UserJoinedEvents /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Provider>

  </StrictMode>
)
