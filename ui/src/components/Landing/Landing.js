import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import Copyright from '../common/Copyright';
import { useLandingStyles } from './LandingStyles';

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const LandingFormInput = ({ label, name, ...props }) => (
  <TextField
    label={label}
    id={name}
    name={name}
    variant="outlined"
    margin="normal"
    required
    fullWidth
    {...props}
  />
);

const LandingFormSubmit = ({ label, ...props }) => (
  <Button type="button" fullWidth variant="contained" color="primary" {...props}>
    {label}
  </Button>
)

const SignupForm = ({ classes, handleSignUp }) => {
  const state = {
    'name': '',
    'email': '',
    'password': '',
    'confirmPass': '',
  };

  const [signUpInput, setSignUpInput] = useState(state);
  const [signUpErrors, setSignUpErrors] = useState(state);

  const { name, email, password, confirmPass } = signUpInput;

  const validate = (field, value) => {
    if (!value) return 'Required';
    if (field === 'email' && !validateEmail(value)) return 'Invalid email address';
    if (field === 'password' && value.length < 8) return 'Minimum 8 characters';
    if (field === 'confirmPass' && value !== password) return "Doesn't match password";
    return '';
  }

  const updateSignUpInput = field => event => {
    const value = event.target.value;
    setSignUpInput({ ...signUpInput, [field]: value });
    if (signUpErrors[field]) setSignUpErrors(
      { ...signUpErrors, [field]: validate(field, value) }
    );
  };

  const handleBlur = field => event => {
    const value = event.target.value;
    setSignUpErrors({ ...signUpErrors, [field]: validate(field, value) });
  };

  const handleSubmit = () => {
    if (Object.values(signUpErrors).some(error => Boolean(error))) return;
    handleSignUp(signUpInput);
  };

  return (
    <div className={classes.form}>
      <LandingFormInput
        label="Name"
        name="signup-name"
        autoFocus
        value={name}
        onChange={updateSignUpInput('name')}
        onBlur={handleBlur('name')}
        error={Boolean(signUpErrors.name)}
        helperText={signUpErrors.name}
      />
      <LandingFormInput
        label="Email Address"
        type="email"
        name="signup-email"
        value={email}
        onChange={updateSignUpInput('email')}
        onBlur={handleBlur('email')}
        error={Boolean(signUpErrors.email)}
        helperText={signUpErrors.email}
      />
      <LandingFormInput
        label="Password"
        type="password"
        name="signup-password"
        value={password}
        onChange={updateSignUpInput('password')}
        onBlur={handleBlur('password')}
        error={Boolean(signUpErrors.password)}
        helperText={signUpErrors.password}
      />
      <LandingFormInput
        label="Confirm Password"
        type="password"
        name="signup-confirm-pass"
        value={confirmPass}
        onChange={updateSignUpInput('confirmPass')}
        onBlur={handleBlur('confirmPass')}
        error={Boolean(signUpErrors.confirmPass)}
        helperText={signUpErrors.confirmPass}
      />
      <LandingFormSubmit
        label="Sign Up"
        className={classes.submit}
        onClick={handleSubmit}
      />
    </div>
  );
}

const LoginForm = ({ classes, handleLogIn }) => {
  const state = { 'email': '', 'password': '' };

  const [logInInput, setLogInInput] = useState(state);
  // const [signUpErrors, setSignUpErrors] = useState(state);

  const updateLogInInput = field => event => {
    const value = event.target.value;
    setLogInInput({ ...logInInput, [field]: value });
  };

  const handleSubmit = () => handleLogIn(logInInput);

  return (
    <form className={classes.form} noValidate>
      <LandingFormInput
        label="Email Address"
        type="email"
        name="login-email"
        autoComplete="email"
        autoFocus
        onChange={updateLogInInput('email')}
      />
      <LandingFormInput
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        onChange={updateLogInInput('password')}
      />
      <LandingFormSubmit
        label="Log In"
        className={classes.submit}
        onClick={handleSubmit}
      />
    </form>
  );
}

const LandingToggle = ({ handleSignUp, handleLogIn, handleDispatch }) => {
  const classes = useLandingStyles();
  const [display, setDisplay] = useState('Log In');

  const toggleDisplay = () => setDisplay(
    display === 'Log In' ? 'Sign Up' : 'Log In'
  );

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {display === 'Log In' ? <LockOutlinedIcon /> : <PersonOutlineIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {display}
          </Typography>
          {display === 'Log In' ?
            <LoginForm classes={classes} handleLogIn={handleLogIn} /> :
            <SignupForm classes={classes} handleSignUp={handleSignUp} />
          }
          <Link
            className={classes.toggle}
            href="#"
            variant="body2"
            onClick={toggleDisplay}
          >
            {display === 'Log In' ? 'Sign up' : 'Log in'} instead
          </Link>
          <Link
            className={classes.toggle}
            href="#"
            variant="body2"
            onClick={handleDispatch}
          >
            DISPATCH
          </Link>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default LandingToggle;
