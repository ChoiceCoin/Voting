import React from 'react';
import MainLayout from '../MainLayout';
import Home from '../../pages/Home';

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home/>
        }
    ]
}

export default MainRoutes;