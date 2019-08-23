import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as routines from '../store/actions';

import {
  Avatar,
  Card, CardContent, CardMedia, Hidden,
  Container,
  Grid,
  IconButton, InputBase,
  Paper,
  Typography,
} from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

const useTopicPageStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  header: {
    margin: theme.spacing(4, 4),
    display: 'flex',
  },
  overview: {
    flexGrow: 1,
  },
  thumbnail: {
    width: 160,
  },
  messageContent: {
    padding: theme.spacing(1, 2),
    lineHeight: 1.5,
  },
  messageForm: {
    flexGrow: 1,
  },
  anchored: {
    position: 'relative',
    float: 'right',
  },
  avatar: {
    margin: theme.spacing(0.5, 0),
  },
  messageItem: {
    margin: theme.spacing(2, 0),
  }
}));

const TopicOverviewCard = ({ topicId, classes }) => (
  <Card className={classes.header}>
    <CardContent className={classes.overview}>
      <h1> Displaying topic {topicId}</h1>
      <p> lorem ipsum dolorvuisvn asnvasvioasifoasifa </p>
    </CardContent>

    <Hidden xsDown>
      <CardMedia
        className={classes.thumbnail}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
    </Hidden>
  </Card>
);

const TopicMessage = ({ message, classes }) => (
  <Grid container className={classes.messageItem} wrap="nowrap" spacing={2}>
    <Grid item>
      <Avatar className={classes.avatar}>W</Avatar>
    </Grid>
    <Grid item>
      <Paper className={classes.messageContent}>
        <Typography variant="caption" display="block" gutterBottom>
          says:
        </Typography>
        <Typography variant="body1" gutterBottom>
          Svjhbshgbsakibg jskaibgjsab hjsab jhvbashv
        </Typography>
      </Paper>
      <Typography className={classes.anchored} variant="overline" display="block" gutterBottom>
        Aug-12-19 10:00PM
      </Typography>
    </Grid>
  </Grid>
);

const TopicMessagesSegment = ({ messages, classes }) => (
  <Container maxWidth="sm">
    {messages.map(m => <TopicMessage message={m} classes={classes} />)}
  </Container>
);

const TopicMessageForm = ({ classes }) => {
  return (
    <Container maxWidth="sm">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar className={classes.avatar}>U</Avatar>
        </Grid>
        <Grid item className={classes.messageForm}>
          <Paper className={classes.messageContent}>
            <InputBase multiline variant="filled" fullWidth />
          </Paper>
          <IconButton className={classes.anchored}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

const TopicPage = ({ match }) => {
  const topicId = match.params.id;
  const topic = useSelector(state => state.topics[topicId]);
  const messages = useSelector(state => Object.values(state.messages));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routines.fetchTopicPageRoutine.trigger({ topicId }));
  }, [topicId, dispatch]);

  const classes = useTopicPageStyles();

  return (
    <Container maxWidth="md">
      <TopicOverviewCard topicId={topicId} classes={classes} />
      <TopicMessagesSegment messages={messages} classes={classes} />
      <TopicMessageForm classes={classes} />
    </Container>
  );
}

export default TopicPage;
