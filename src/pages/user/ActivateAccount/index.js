import { Button, CircularProgress, Container, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';

const ActivateAccount = () => {
    const [loading, setLoading] = useState(true);
    const { hashToken } = useParams();

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                await axiosUser.get(`auth/verify-account/${hashToken}`);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        verifyAccount();
    }, []);

    return (
        <Container>
            <Typography variant="h3">Activate your account</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Paper variant="outlined">
                    <Typography variant="body1">Activate succesfully</Typography>
                    <Link to="/home" component={Button} variant="contained" color="primary">
                        Return Home
                    </Link>
                </Paper>
            )}
        </Container>
    );
};

export default ActivateAccount;
