import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Built with '}
    <Link color="inherit" href="https://material-ui.com/">
      Material-UI.
    </Link>
  </Typography>
);

export default Copyright;
