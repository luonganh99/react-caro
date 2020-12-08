import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Button,
    Container,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { axiosUser } from '../../../api/axiosUser';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password doesn't match"),
    fullname: yup.string(),
    email: yup.string().email('Email is not correct'),
});

const SignUp = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors, setError } = useForm({
        resolver: yupResolver(schema),
    });
    const history = useHistory();

    const onSubmit = async (data) => {
        try {
            const { username, password, fullname, email } = data;

            const res = await axiosUser.post('/auth/signup', {
                username,
                password,
                fullname,
                email,
            });

            if (res.status === 'success') {
                history.push('/login');
            }
        } catch (error) {
            if (error.data.errors) {
                for (let err of Object.keys(error.data.errors)) {
                    setError(`${err}`, {
                        type: 'apiValidate',
                        message: error.data.errors[err],
                    });
                }
            }
            console.log(error);
        }
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Signup
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoFocus
                        error={!!errors?.username}
                        helperText={errors?.username?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        error={!!errors?.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        fullWidth
                        name="fullname"
                        label="Full Name"
                        error={!!errors?.fullname}
                        helperText={errors?.fullname?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign up
                    </Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {'Return to login'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SignUp;
