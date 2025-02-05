import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import { ShelfProvider } from './context/ShelfContext';

import Shelf from './pages/Shelf.tsx';
import Search from './pages/Search.tsx';
import Recs from './pages/Recs.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Search />
      }, 
      {
        path: '/shelf',
        element: <Shelf />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/recommendations',
        element: <Recs />
      },
      {
        path: '*', // Catch-all route for undefined paths
        element: <Search />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ShelfProvider>
      <RouterProvider router={router} />
    </ShelfProvider>
  );
}