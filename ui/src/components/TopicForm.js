import React from 'react';
import { useDispatch } from 'react-redux';
import * as routines from '../store/actions';

import {
  Button, IconButton, Typography,
  Card, CardContent,
  Container, Grid,
  TextField,
  CssBaseline,
} from '@material-ui/core';

import useStyles from './common/Styles';

const TopicForm = ({ classes }) => {
  const initState = { subject: '', description: '' };
  const [values, setValues] = React.useState(initState);
  const hasCompleteValues = Object.values(values).every(val => Boolean(val));
  const handleChange = name => event => setValues(
    { ...values, [name]: event.target.value }
  );

  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (hasCompleteValues) {
      dispatch(routines.createTopicRoutine.trigger(values));
      setValues(initState);
    };
  };

  return (
    <>
      <Typography component="h4" variant="h4" className={classes.cardHeader}>
        Start a new topic!
      </Typography>
      <TextField
        label="Topic Subject"
        value={values.subject}
        onChange={handleChange('subject')}
        id="new-subject"
        variant="outlined"
        margin="dense"
        fullWidth
      />
      <TextField
        label="Description"
        value={values.description}
        onChange={handleChange('description')}
        id="new-description"
        variant="outlined"
        margin="normal"
        fullWidth
        multiline
      />
      <Grid container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!hasCompleteValues}
          >
            Create This Topic
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const TopicFormContainer = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Card className={classes.centerCard}>
        <CardContent className={classes.fillContent}>
          <TopicForm classes={classes} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default TopicFormContainer;
