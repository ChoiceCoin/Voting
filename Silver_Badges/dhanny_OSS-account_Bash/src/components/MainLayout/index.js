import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

// import { useAccountContext } from '../../context/account';

const Main = styled('main')(() => ({
    width: '100%',
    minHeight: '100vh'
}))

const Index = () => {
    // const { selectedAccount } = useAccountContext();
    return (
        <Box>
            <CssBaseline />
            <Main>
                <Outlet/>
            </Main>
        </Box>
    )
}

export default Index
