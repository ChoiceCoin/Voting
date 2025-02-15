import React from 'react'
import { Avatar, Box, Button, Grid, Paper, Typography, IconButton, List, Divider, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import ChoiceImage from '../Images/choice.png'
import CardPost from '../components/CardPost';
import { useProposalContext } from '../context/proposal';

const Home = () => {
    const { proposals, getAllProposals } = useProposalContext();
    React.useEffect(() => {
        getAllProposals()
    }, [getAllProposals]);
    return (
        <>
            <Grid container spacing={5}>
                <Grid item md={4} xs={12}>
                    <Paper>
                        <List>
                            <Box sx={{p: 5, textAlign: "center" }}>
                                <Avatar src={ChoiceImage} sx={{ margin: 'auto', width: '150px', height: '150px' }} />
                                <Typography variant="h3">Choice Coin</Typography>
                                <Typography component="p">2.53k members</Typography>
                                <Button>Joined</Button>
                                <IconButton><Notifications/></IconButton>
                            </Box>
                            <Divider />
                            <nav aria-label="secondary mailbox folders">
                                <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary="Proposals" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component={Link} to="/create">
                                    <ListItemText primary="New Proposals" />
                                    </ListItemButton>
                                </ListItem>
                                </List>
                            </nav>
                        </List>
                    </Paper>
                </Grid>
                <Grid item md={8} xs={12}>
                    <Box sx={{ mb: 2 }}>
                        <Typography component="p">Choice-Coin Dao</Typography>
                        <Typography variant="h5">Proposals</Typography>
                    </Box>
                    {proposals.map((proposal, index) => (
                        <CardPost key={index} {...proposal} />
                    ))}
                </Grid>
            </Grid>
        </>
    )
}

export default Home
