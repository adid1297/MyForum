import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import * as routines from '../store/actions';

import {
  Avatar, Button, IconButton, Typography,
  Card, CardActionArea, CardContent, CardMedia,
  Container, Grid, Hidden, Paper,
  CircularProgress, InputBase, TextField,
  CssBaseline,
} from '@material-ui/core';

import useStyles from './common/Styles';
import DateItem from './common/DateItem';
import TopicForm from './TopicForm';

const terms = ['beach', 'productive', 'lifestyle', 'effort', 'serene', 'travel'];

const FeedItem = ({ topic, classes, redirect }) => (
  <Grid item key={topic.id} xs={12}>
    <CardActionArea component="button" onClick={redirect}>
      <Card className={classes.card}>
        <CardContent className={classes.cardDetails}>
          <Typography component="h2" variant="h5">
            {topic.subject}
          </Typography>
          <DateItem date={topic.created_at} />
          <Typography variant="subtitle1" paragraph>
            {topic.description}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
      </Card>
    </CardActionArea>
  </Grid>
);

const Feed = () => {
  const topics = useSelector(state => Object.values(state.topics));
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routines.fetchTopicFeedRoutine.trigger());
  }, [dispatch]);

  const redirectToTopic = topicId => () => dispatch(push(`/topic/${topicId}`));

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4} className={classes.cardGrid}>
        {topics.map(topic => <FeedItem
          key={topic.id}
          topic={topic}
          redirect={redirectToTopic(topic.id)}
          classes={classes}
        />)}
      </Grid>
    </Container>
  );
}

const FeedPage = () => {
  return (
    <>
      <TopicForm />
      <Feed />
    </>
  );
}

export default FeedPage;