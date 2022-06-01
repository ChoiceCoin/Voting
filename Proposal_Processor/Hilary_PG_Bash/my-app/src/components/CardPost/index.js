import React from 'react'
import { Card, Avatar, Typography, CardHeader, CardContent, Button, CardActionArea } from '@mui/material'
import { Link } from 'react-router-dom';

import ChoiceImage from '../../Images/choice.png'


const index = (props) => {    
    return (
        <Card sx={{ mb: 3 }}>
            <CardActionArea component={Link} to={`/proposals/${props.id}`}>
                <CardHeader 
                    avatar={
                        <Avatar src={ChoiceImage} />
                    }
                    action={
                        <Button variant="contained">
                            {props.closed ? "closed" : "open"}
                        </Button>
                    }
                    title={`Choice coin by ${props.user}`}
                />
                <CardContent>
                    <Typography component="p">TL:DR; Consolidated Badger</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default index
