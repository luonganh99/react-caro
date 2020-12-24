import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { axiosUser } from '../../../../api/axiosUser';
import { toast, ToastContainer } from 'react-toastify';

const schema = yup.object().shape({
    email: yup.string().email('Email is not correct').required('Email is required'),
});

const ForgotPassword = () => {
    const { register, handleSubmit, errors, setError } = useForm({
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await axiosUser.post('auth/send-email-forgot', { email: data.email });
            toast.success('Send email succefully. Please check your email!', {
                position: 'top-right',
            });
        } catch (error) {
            setError('email', {
                type: 'email',
                message: error.data.message,
            });
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    variant="outlined"
                    inputRef={register}
                    name="email"
                    label="Email"
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                    required
                    autoFocus
                />
                <Button variant="contained" color="primary" type="submit">
                    {loading ? <CircularProgress /> : 'Send me password reset email'}
                </Button>
                <Link to="/login"> Back to login </Link>
            </form>
            <ToastContainer />
        </Container>
    );
};

export default ForgotPassword;
