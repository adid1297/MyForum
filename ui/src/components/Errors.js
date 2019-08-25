import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    margin: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ErrorMessage = ({ classes, message }) => (
  <span id="error-snackbar" className={classes.message}>
    <ErrorIcon className={classes.icon} />
    {message}
  </span>
);

const CloseErrorButton = ({ classes, handleClose }) => (
  <IconButton aria-label="close" color="inherit" onClick={handleClose}>
    <CloseIcon />
  </IconButton>
);

const ErrorSnackbar = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const latestError = useSelector(state => state.errors.slice(-1)[0]);
  let displayError;
  try {
      displayError = latestError.error.displayError;
  } catch (error) {
      displayError = 'Something went wrong';
  };

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') setOpen(false);
  }

  useEffect(() => {
    if (latestError) setOpen(true);
  }, [latestError]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes.error}
        aria-describedby="error-snackbar"
        onClose={handleClose}
        message={<ErrorMessage message={displayError} classes={classes} />}
        action={[<CloseErrorButton key="close" handleClose={handleClose} classes={classes} />]}
      />
    </Snackbar>
  );
};

export default ErrorSnackbar;
