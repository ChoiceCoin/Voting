import React from 'react';
import MainLayout from '../MainLayout';
import Home from '../../pages/Home';
import Proposals from '../../pages/Proposals';
import NewProposal from '../../pages/NewProposal';

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/create',
            element: <NewProposal/>
        },
        {
            path: '/proposals/:id',
            element: <Proposals/>
        }
    ]
}

export default MainRoutes;