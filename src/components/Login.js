import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { SubmissionError } from 'redux-form';
import { Container, CssBaseline, Avatar, Typography, Box, TextField, FormControlLabel, Checkbox, Button, Grid, Link as MUILink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const defaultTheme = createTheme();

const SignIn = ({ login, error }) => {
    const [formData, setFormData] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = formData;

        try {
            await login({ email, password });
        } catch (error) {
            throw new SubmissionError({
                _error: 'Invalid email or password',
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInputChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <MUILink component={RouterLink} to="/forgot-password" variant="body2">
                                    Forgot password?
                                </MUILink>
                            </Grid>
                            <Grid item>
                                <MUILink component={RouterLink} to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </MUILink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => ({
    error: state.authReducer.error,
});

const mapActionsToProps = { login };

export default connect(mapStateToProps, mapActionsToProps)(SignIn);
