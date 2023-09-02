import React from 'react';
import { Stack, Grid, Box, Button, FormControl, TextField, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import { createTransaction } from '../utils';
import { useAccountContext } from '../context/account';
import { useProposalContext } from '../context/proposal';

const CustomFormControl = styled(FormControl)(({theme}) => ({
    marginBottom: '20px',
    display: 'block',
    '.form-title input': {
        fontSize: '30px',
        fontWeight: 'bolder'
    }
}))


const ButtonAction = styled(Button)(({theme}) => ({
    width: '100%',
    display: 'block',
    marginBottom: theme.spacing(1)
}))

const NewProposal = () => {
    const { updateProposals } = useProposalContext();
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const { selectedAccount } = useAccountContext();
    const [choiceList,  setChoiceList] = React.useState([{choice: ""}])
    const [value, setValue] = React.useState(new Date());
    const [endValue, setEndValue] = React.useState(new Date());
    const formRef = React.useRef(null)

    const handleChange = (newValue) => {
      setValue(newValue);
    };
    const endHandleChange = (newValue) => {
        setEndValue(newValue);
      };

    const handleChoiceAdd = () => {        
        if (choiceList.length < 2){
            setChoiceList([...choiceList, { choice: ""}])
        } else {
            enqueueSnackbar('You have a maximum of 4 choices', {variant: "warning"}) 
        }
    }

    const handleChoiceRemove = (index) => {
        const list = [...choiceList]
        list.splice(index, 1);
        setChoiceList(list);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(selectedAccount).length === 0){
            enqueueSnackbar('Please sign in to your wallet by clicking on the "Connect Wallet" button', {variant: "warning"})
        }
        else {
            if (formRef.current){
                const title = formRef.current.title.value
                const description = formRef.current.description.value
                if (!title || !description) {
                    enqueueSnackbar('Please fill the necesaary field', {variant: 'success'})    
                }
                else{
                    const startDate = value
                    const endDate = endValue
                    const newProposalData = {
                        title: title,
                        description: description,
                        closed: false,
                        user: selectedAccount.address,
                        startDate: startDate,
                        endDate: endDate,
                        snapshot: 13577876,
                        choices: [
                            {name:"yes", result: 0},
                            {name: "no", result: 0}
                        ],
    
                    }
                    createTransaction(selectedAccount.address, title, description, 50, startDate, endDate).then((data) => {
                        console.log(data)
                        enqueueSnackbar('Created Proposal Succesfully', {variant: 'success'})
                        updateProposals(newProposalData)
                        navigate(-1);
                    }).catch((error) => {
                        console.log(error)
                        alert(error.message);
                    });
                }
            }
        }
    }
    return (
        <>
            <form method="POST" onSubmit={handleSubmit} ref={formRef}>
                <Grid container spacing={5}>
                    <Grid item md={8} xs={12}>
                        <Button onClick={() => navigate(-1) }>
                            <ArrowBackIcon /> Choice Coin
                        </Button>
                        <Box sx={{ mt: 3 }}>
                                <CustomFormControl>
                                    <TextField fullWidth className="form-title" name="title"  placeholder="Ask a question" required/>
                                </CustomFormControl>
                                <CustomFormControl>
                                    <TextField multiline maxRows={4} placeholder="Tell more about your proposal" name="description" required fullWidth />
                                </CustomFormControl>
                            </Box>
                            <Box>
                                <Card>
                                    <CardHeader title="Choices" />
                                    <CardContent>
                                        <Box sx={{ mb: 1 }}>
                                            <TextField name="choices" placeholder="Yes" required/>
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <TextField name="choices" placeholder="No" required/>
                                        </Box>
                                        {choiceList.map((choice, index) => (
                                            <Box sx={{ mb: 1 }} key={index}>
                                                <TextField name="choices" required/><Button onClick={() => handleChoiceRemove(index)}><Delete /></Button>
                                            </Box>
                                        ))}
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="outlined" color="primary" onClick={() => handleChoiceAdd()}>Add Choice</Button>
                                    </CardActions>
                                </Card>
                            </Box>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Card>
                            <CardHeader title="Actions" />
                            <CardContent>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <Stack spacing={3}>
                                        <DateTimePicker value={value} onChange={handleChange} label="Select Start Date" renderInput={(params) => <TextField {...params} /> } />
                                        <DateTimePicker value={endValue} onChange={endHandleChange} label="Select End Date" renderInput={(params) => <TextField {...params} /> } />
                                    </Stack>
                                </LocalizationProvider>
                            </CardContent>
                            <CardActions>
                                <ButtonAction variant="contained" color="primary" type="submit">Publish</ButtonAction>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default NewProposal
