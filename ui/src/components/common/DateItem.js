import React from 'react';
import moment from 'moment';

import { Typography } from '@material-ui/core';

const DateItem = ({ date, ...props }) => (
  <Typography variant="overline" display="block" {...props}>
    {moment.utc(date).format('lll')}
  </Typography>
);

export default DateItem;
