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
import { Link } from 'react-router-dom';
import { axiosUser } from '../../../api/axiosUser';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const { username, password } = data;
        console.log(data);
        const res = await axiosUser.post('/auth/login', {
            username,
            password,
        });

        if ((res.status = 'success')) {
            console.log(res.data);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
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
                        autoComplete="current-password"
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
