import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { axiosUser } from '../../../api/axiosUser';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
    password: yup.string().required('New password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password doesn't match"),
});

const ResetPassword = () => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const { hashToken } = useParams();
    const history = useHistory();
    console.log(hashToken);

    const onSubmit = async (data) => {
        const { password } = data;
        try {
            const res = await axiosUser.post('/auth/reset-password', {
                hashToken,
                password,
            });

            Swal.fire({
                title: 'Reset your password successfully',
                text: 'Back to login page',
                icon: 'success',
            }).then((result) => {
                history.push('/login');
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    inputRef={register}
                    name="password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                    autoFocus
                    required
                />
                <TextField
                    inputRef={register}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    error={!!errors?.confirmPassword}
                    helperText={errors?.confirmPassword?.message}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Reset your password
                </Button>
            </form>
        </Container>
    );
};

export default ResetPassword;
