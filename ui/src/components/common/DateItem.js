import React from 'react';
import moment from 'moment';

import { Typography } from '@material-ui/core';

const DateItem = ({ date, ...props }) => (
  <Typography variant="overline" display="block" {...props}>
    {moment.utc(date).local().format('lll')}
  </Typography>
);

export const DateStatus = ({ by, created, updated, removed }) => (
  <Typography variant="overline" display="block">
    {`Created by ${by} on ${moment.utc(created).local().format('lll')} `}
    {
      removed ? `(Removed on ${moment.utc(removed).local().format('lll')})` :
      (moment(created).diff(moment(updated)) <= -1) &&
      `(Last updated on ${moment.utc(updated).local().format('lll')})`
    }
  </Typography>
);

export default DateItem;
