import React from 'react'
import {  Grid, Button, Box, Typography, CardHeader, Card, CardContent, Avatar, CardActions, Table, TableContainer, TableBody, TableCell, TableRow, TextField, FormControl } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import proposals from '../DummyData/data';
import { useAccountContext } from '../context/account';
import { signTransaction } from '../utils';

const ButtonVote = styled(Button)(({theme}) => ({
    width: '100%',
    display: 'block',
    marginBottom: theme.spacing(1)
}))

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
  

const Proposals = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { selectedAccount } = useAccountContext()
    const navigate = useNavigate();
    const formRef = React.useRef(null);
    const [selectedVote, setSelectedVote] = React.useState(null)
    const [proposal, setProposal] = React.useState(undefined)
    const { id } = useParams();
    const handleVote = (event) => {
        event.preventDefault();
        console.log(selectedAccount);
        console.log(Object.keys(selectedAccount).length === 0)
        if (Object.keys(selectedAccount).length === 0){
            console.log("True")
            enqueueSnackbar('Please sign in to your wallet by clicking on the "Connect Wallet" button', {variant: "warning"})
        }
        else {
            if (formRef.current){
                signTransaction(selectedAccount.address, proposal.user, formRef.current.amount.value).then((data) => {
                    enqueueSnackbar('Transaction Successful', {variant: "success"})
                }).catch((error) => {
                    console.log(error.message)
                    if (error.message.indexOf('overspend') !== -1){
                        enqueueSnackbar("Your account doesn't have sufficient funds.", {variant: "error"})
                    } else {
                        enqueueSnackbar("Sorry we were unable to complete the transaction", {variant: "error"})
                    }
                })
            }
        }
        
    }
    React.useEffect(() => {
        setProposal(proposals.find((proposal) => proposal.id === id))
    }, [id, proposal])
    return (
        <>
            {proposal !== undefined ?
                <Grid container spacing={5}>
                    <Grid item md={8} xs={12}>
                            <Button onClick={() => navigate(-1) }>
                            <ArrowBackIcon /> Choice Coin
                        </Button>
                        <Box sx={{mt: 4, mb: 3 }}>
                            <Typography variant="h5">
                                {proposal.title}
                            </Typography>
                            <Button variant="outlined" color="primary">{proposal.closed ? "Closed" : "Open"}</Button>
                            <Box sx={{ mt: 1}}>
                                <Typography component="p">
                                    TL;Dr: <br/>
                                    {proposal.description}
                                </Typography>
                            </Box>
                        </Box>  

                        {!proposal.closed && 
                            <Card sx={{ mb: 2 }}>
                                <form method="POST" onSubmit={handleVote} ref={formRef}>
                                    <CardHeader title="Cast your vote" />
                                    <CardContent>
                                        {proposal.choices.map((choice, index) => (
                                            <ButtonVote key={index} variant={selectedVote === choice.name ? "contained" : "outlined"} color="primary" onClick={() => setSelectedVote(choice.name)}>{choice.name}</ButtonVote>    
                                        ))}
                                        <Box sx={{ mt: 2 }}>
                                            <FormControl fullWidth>
                                                <TextField name="amount" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Enter amount of choice" min={0} />
                                            </FormControl>
                                        </Box>
                                    </CardContent>
                                    <CardActions variant="contained" color="secondary">
                                        <Button size="large" color="primary"  variant="contained" type="submit" fullWidth disabled={selectedVote === null || selectedAccount.address === undefined }>Vote</Button>
                                    </CardActions>
                                </form>
                            </Card>
                        }

                        <Card>
                            <CardHeader title="Votes" />
                            <CardContent>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            {proposal.votes.map((vote, index) => (    
                                                <TableRow key={index}>
                                                    <TableCell align="left">
                                                        <Box display="flex" justifyContent="center" alignItems="center">
                                                            <Avatar sx={{ marginRight: '10px' }} /> {vote.user}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{vote.choice}</TableCell>
                                                    <TableCell>{vote.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={12}>
                    <Card>
                        <CardHeader title="Information" />
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">Strategie(s)</TableCell>
                                            <TableCell align="right">10.8k Choice</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Voting system</TableCell>
                                            <TableCell align="right">Single Choice voting</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Start date</TableCell>
                                            <TableCell align="right">{proposal.startDate}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">End date</TableCell>
                                            <TableCell align="right">{proposal.endDate}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Snapshot</TableCell>
                                            <TableCell align="right">{proposal.snapshot.toLocaleString()}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>

                    <Card sx={{mt: 5}}>
                        <CardHeader title="Results" />
                        <CardContent>
                            {proposal.choices.map((choice, index) => (    
                                <Box key={index} sx={{ width: '100%' }}>
                                    {choice.name}
                                    <LinearProgressWithLabel value={choice.result} />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                : 
                <>
                    LOading Proposal
                </>
            }
        </>
    )
}

export default Proposals
