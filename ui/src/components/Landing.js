import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Built with '}
    <Link color="inherit" href="https://material-ui.com/">
      Material-UI.
    </Link>
  </Typography>
);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  toggle: {
    margin: theme.spacing(4, 0, 1),
  }
}));

const SignupForm = classes => {
  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="signupName"
        label="Name"
        name="signupName"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="signupEmail"
        label="Email Address"
        name="signupEmail"
        autoComplete="email"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="signupPassword"
        label="Password"
        type="password"
        id="signupPassword"
        autoComplete="current-password"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="signupPasswordConfirm"
        label="Confirm Password"
        type="password"
        id="signupPasswordConfirm"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
    </form>
  );
}

const LoginForm = classes => {
  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Log In
      </Button>
    </form>
  );
}

const LandingToggle = () => {
  const classes = useStyles();
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
            <LoginForm classes={classes}/> :
            <SignupForm classes={classes}/>
          }
          <Link
            className={classes.toggle}
            href="#"
            variant="body2"
            onClick={toggleDisplay}
          >
            {display === 'Log In' ? 'Sign up' : 'Log in'} instead
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
