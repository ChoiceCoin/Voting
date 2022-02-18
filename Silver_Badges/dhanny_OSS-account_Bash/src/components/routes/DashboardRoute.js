import React from 'react';
import MainLayout from '../MainLayout';
import Dashboard from '../../pages/Dashboard';
import { Navigate } from 'react-router-dom';

const MainRoutes = (selectedAccount) => ({
    path: '/',
    element: !selectedAccount.address ? <Navigate to="/" /> : <MainLayout /> ,
    children: [
        {
            path: '/dashboard',
            element: <Dashboard />
        }
    ]
})

export default MainRoutes;