import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import * as routines from '../../store/actions';

import { Grid, IconButton } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const MainActions = () => {
  const dispatch = useDispatch();
  const handleHomeClick = () => dispatch(push('/feed'));
  const handleLogoutClick = () => dispatch(routines.logOutRoutine.trigger());

  return (
    <Grid container
      direction="row"
      justify="flex-end"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <IconButton onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handleLogoutClick}>
          <PowerSettingsNewIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default MainActions;
