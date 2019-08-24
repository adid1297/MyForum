import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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

const TopicOverviewCard = ({ subject, description, classes }) => (
  <Card className={classes.header}>
    <CardContent className={classes.overview}>
      <h1>{subject}</h1>
      <p>{description}</p>
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
      <Avatar className={classes.avatar}>
        {message.creator_user_name.charAt(0)}
      </Avatar>
    </Grid>
    <Grid item>
      <Paper className={classes.messageContent}>
        <Typography variant="caption" display="block" gutterBottom>
          <strong>{message.creator_user_name}</strong>
          {` says:`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {message.message}
        </Typography>
      </Paper>
      <Typography className={classes.anchored} variant="overline" display="block" gutterBottom>
        {moment.utc(message.created_at).format('lll')}
      </Typography>
    </Grid>
  </Grid>
);

const TopicMessagesSegment = ({ messages, classes }) => (
  <Container maxWidth="sm">
    {messages.map(m => (
      <TopicMessage
        key={m.id}
        classes={classes}
        message={m}
      />
    ))}
  </Container>
);

const TopicMessageForm = ({ classes, handleSubmit }) => {
  const [message, setMessage] = useState('');

  const handleChange = event => setMessage(event.target.value);
  const handleClick = () => {
    if (message) {
      handleSubmit(message);
      setMessage('');
    } 
  }; 

  return (
    <Container maxWidth="sm">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar className={classes.avatar}>U</Avatar>
        </Grid>
        <Grid item className={classes.messageForm}>
          <Paper className={classes.messageContent}>
            <InputBase
              multiline
              variant="filled"
              fullWidth
              onChange={handleChange}
              value={message}
              placeholder="Write a new message"
            />
          </Paper>
          {message && (
            <IconButton
              className={classes.anchored}
              onClick={handleClick}
            >
              <SendIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

const TopicPage = ({ match }) => {
  const topicId = match.params.id;
  const topic = useSelector(state => state.topics[topicId]);
  const messages = useSelector(state => 
    Object.values(state.messages).filter(m => m.topic_id === topicId)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routines.fetchTopicPageRoutine.trigger({ topicId }));
  }, [topicId, dispatch]);

  const classes = useTopicPageStyles();

  if (topic) {
    return (
      <Container maxWidth="md">
        <TopicOverviewCard
          classes={classes}
          description={topic.description}
          subject={topic.subject}
        />
        <TopicMessagesSegment messages={messages} classes={classes} />
        <TopicMessageForm
          classes={classes}
          handleSubmit={message => dispatch(
            routines.createTopicMessageRoutine.trigger({ message, topicId })
          )}
        />
      </Container>
    );
  }

  return "Loading";
}

export default TopicPage;
