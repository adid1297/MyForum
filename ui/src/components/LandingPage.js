import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

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

import * as routines from '../store/actions';
import Copyright from './common/Copyright';
import { useLandingStyles } from './common/Styles';

const isEmailValid = email => {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

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
);

const SignupForm = ({ classes, handleSignUp }) => {
  const fields = ['name', 'email', 'password', 'confirmPassword'];
  const initState = initVal => fields.reduce(
    (out, field) => ({ ...out, [field]: initVal}), {}
  );

  const [signUpInput, setSignUpInput] = useState(initState(''));
  const [signUpErrors, setSignUpErrors] = useState(initState(''));
  const [pristineFields, setPristineFields] = useState(initState(true));

  const validate = fieldsToValidate => {
    let validationErrors = { ...signUpErrors };

    if (fieldsToValidate.name && !pristineFields.name) {
      if (signUpInput.name.length < 1) {
        validationErrors = {
          ...validationErrors,
          name: 'Please input your name',
        };
      } else {
        validationErrors = {
          ...validationErrors,
          name: '',
        };
      }
    };

    if (fieldsToValidate.email && !pristineFields.email) {
      if (!isEmailValid(signUpInput.email)) {
        validationErrors = {
          ...validationErrors,
          email: 'Please input a valid email address',
        };
      } else {
        validationErrors = {
          ...validationErrors,
          email: '',
        };
      }
    };

    if (fieldsToValidate.password && !pristineFields.password) {
      if (signUpInput.password.length < 8) {
        validationErrors = {
          ...validationErrors,
          password: 'Passwords are at least 8 characters long',
        };
      } else {
        validationErrors = {
          ...validationErrors,
          password: '',
        };
      }
    };

    if (
      (fieldsToValidate.confirmPassword || fieldsToValidate.password) &&
      !pristineFields.confirmPassword
    ) {
      if (validationErrors.password) {
        validationErrors = {
          ...validationErrors,
          confirmPassword: 'Invalid password',
        };
      } else if (signUpInput.password !== signUpInput.confirmPassword) {
        validationErrors = {
          ...validationErrors,
          confirmPassword: 'Passwords do not match',
        };
      } else {
        validationErrors = {
          ...validationErrors,
          confirmPassword: '',
        };
      }
    };

    setSignUpErrors(validationErrors);
    return Object.values(validationErrors).some(error => Boolean(error));
  };

  useEffect(() => {
    validate(initState(true));
  }, [signUpInput]);

  const handleChange = field => event => {
    const value = event.target.value;
    setSignUpInput({ ...signUpInput, [field]: value });
  };

  const handleFocus = field => () => setPristineFields({
    ...pristineFields,
    [field]: false
  });

  const handleBlur = field => () => validate({ ...initState(false), [field]: true });

  const handleSubmit = () => {
    const hasErrors = validate(initState(true));
    if (!hasErrors) {
      const { confirmPassword, ...payload } = signUpInput;
      handleSignUp(payload);
    };
  }

  return (
    <form className={classes.form} noValidate>
      <LandingFormInput
        label="Name"
        name="name"
        autoComplete="name"
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        onFocus={handleFocus('name')}
        error={Boolean(signUpErrors.name)}
        helperText={signUpErrors.name}
      />
      <LandingFormInput
        label="Email Address"
        type="email"
        name="email"
        autoComplete="email"
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        onFocus={handleFocus('email')}
        error={Boolean(signUpErrors.email)}
        helperText={signUpErrors.email}
      />
      <LandingFormInput
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        onFocus={handleFocus('password')}
        error={Boolean(signUpErrors.password)}
        helperText={signUpErrors.password}
      />
      <LandingFormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        onChange={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onFocus={handleFocus('confirmPassword')}
        error={Boolean(signUpErrors.confirmPassword)}
        helperText={signUpErrors.confirmPassword}
      />
      <LandingFormSubmit
        label="Sign Up"
        className={classes.submit}
        onClick={handleSubmit}
      />
    </form>
  );
};

const LoginForm = ({ classes, handleLogIn }) => {
  const fields = ['email', 'password'];
  const initState = initVal => fields.reduce(
    (out, field) => ({ ...out, [field]: initVal}), {}
  );

  const [logInInput, setLogInInput] = useState(initState(''));
  const [logInErrors, setLogInErrors] = useState(initState(''));
  const [pristineFields, setPristineFields] = useState(initState(true));

  const validate = fieldsToValidate => {
    let validationErrors = { ...logInErrors };
    if (fieldsToValidate.email && !pristineFields.email) {
      if (!isEmailValid(logInInput.email)) {
        validationErrors = {
          ...validationErrors,
          email: 'Please input a valid email address',
        };
      } else {
        validationErrors = {
          ...validationErrors,
          email: '',
        };
      }
    };

    if (fieldsToValidate.password && !pristineFields.password) {
      if (logInInput.password.length < 8) {
        validationErrors = {
          ...validationErrors,
          password: 'Passwords are at least 8 characters long',
        };
      } else {
        validationErrors = {
          ...validationErrors,
          password: '',
        };
      }
    };

    setLogInErrors(validationErrors);
    return Object.values(validationErrors).some(error => Boolean(error));
  };

  useEffect(() => {
    validate(initState(true));
  }, [logInInput]);

  const handleChange = field => event => {
    const value = event.target.value;
    setLogInInput({ ...logInInput, [field]: value });
  };

  const handleFocus = field => () => setPristineFields({
    ...pristineFields,
    [field]: false
  });

  const handleBlur = field => () => validate({ ...initState(false), [field]: true });

  const handleSubmit = () => {
    const hasErrors = validate(initState(true));
    if (!hasErrors) handleLogIn(logInInput);
  }

  return (
    <form className={classes.form} noValidate>
      <LandingFormInput
        label="Email Address"
        type="email"
        name="login-email"
        autoComplete="email"
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        onFocus={handleFocus('email')}
        error={Boolean(logInErrors.email)}
        helperText={logInErrors.email}
      />
      <LandingFormInput
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        onFocus={handleFocus('password')}
        error={Boolean(logInErrors.password)}
        helperText={logInErrors.password}
      />
      <LandingFormSubmit
        label="Log In"
        className={classes.submit}
        onClick={handleSubmit}
      />
    </form>
  );
};

const LandingPage = () => {
  const classes = useLandingStyles();
  const [display, setDisplay] = useState('Log In');

  const toggleDisplay = () => setDisplay(
    display === 'Log In' ? 'Sign Up' : 'Log In'
  );

  const dispatch = useDispatch();
  const handleLogIn = input => dispatch(routines.logInRoutine.trigger(input));
  const handleSignUp = input => dispatch(routines.signUpRoutine.trigger(input));

  const AvatarIcon = () => display === 'Log In' ? <LockOutlinedIcon /> : <PersonOutlineIcon />;
  const LandingForm = () => (
    display === 'Log In' ?
    <LoginForm classes={classes} handleLogIn={handleLogIn} /> :
    <SignupForm classes={classes} handleSignUp={handleSignUp} />
  );

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AvatarIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {display}
          </Typography>
          <LandingForm />
          <Link
            className={classes.toggle}
            href="#"
            variant="body2"
            onMouseDown={toggleDisplay}
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
};

export default LandingPage;
