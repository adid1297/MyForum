import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as routines from '../store/actions';

import {
  Avatar, Button, IconButton, Typography,
  Card, CardContent, CardMedia,
  Container, Grid, Paper,
  InputBase, TextField,
} from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

import DateItem from './common/DateItem';

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
    height: 150,
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
  iconset: {
    position: 'relative',
    float: 'right',
  },
  avatar: {
    margin: theme.spacing(0.5, 0),
  },
  messageItem: {
    margin: theme.spacing(2, 0),
  },
  actionsContainer: {
    padding: theme.spacing(0, 0),
  }

}));

const TopicDetails = ({ topicId, subject, description, dateCreated, classes, toggleView }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const toggleDeleteConfirm = () => setShowDeleteConfirm(!showDeleteConfirm);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(routines.deleteTopicRoutine.trigger({ topicId }));
    toggleDeleteConfirm();
  };

  return (
    <CardContent className={classes.overview}>
      <CardMedia
        className={classes.thumbnail}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={1}
      >
        {showDeleteConfirm ? (
          <>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete This Topic?
              </Button>
            </Grid>
            <Grid item>
              <IconButton onClick={toggleDeleteConfirm}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <IconButton onClick={toggleView}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={toggleDeleteConfirm}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
      <h1>{subject}</h1>
      <p>{description}</p>
      <DateItem className={classes.anchored} date={dateCreated} />
    </CardContent>
  );
};

const TopicDetailsForm = ({
  subject,
  description,
  dateCreated,
  classes,
  toggleView,
  topicId,
}) => {
  const [editedSubject, editSubject] = useState(subject);
  const [editedDescription, editDescription] = useState(description);

  const dispatch = useDispatch();
  const handleUpdate = () => {
    if (editedSubject && editedDescription) {
      dispatch(routines.updateTopicRoutine.trigger({
        subject: editedSubject,
        description: editedDescription,
        topicId
      }));
      toggleView();
    }
  };

  return (
    <CardContent className={classes.overview}>
      <CardMedia
        className={classes.thumbnail}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <IconButton onClick={handleUpdate}>
            <SaveIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={toggleView}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
      <TextField
        id="edit-subject"
        label="Edit Topic Subject"
        value={editedSubject}
        onChange={e => editSubject(e.target.value)}
        margin="dense"
        variant="outlined"
        fullWidth
      />
      <TextField
        id="topicform-desc"
        label="Description"
        className={classes.textField}
        value={editedDescription}
        onChange={e => editDescription(e.target.value)}
        variant="outlined"
        margin="normal"
        rowsMax="5"
        multiline
        fullWidth
      />
      <DateItem className={classes.anchored} date={dateCreated} />
    </CardContent>
  );
};

const TopicOverviewCard = ({ topicId, subject, description, dateCreated, classes }) => {
  const [viewForm, setViewForm] = useState(false);
  const toggleView = () => setViewForm(!viewForm);
  const props = { subject, description, dateCreated, topicId, classes, toggleView };

  return (
    <Card className={classes.header}>
      {viewForm ?
        <TopicDetailsForm {...props} /> :
        <TopicDetails {...props} />
      }
    </Card>
  );
};

const TopicMessage = ({ message, creator, dateCreated, classes }) => (
  <Grid container className={classes.messageItem} wrap="nowrap" spacing={1}>
    <Grid item>
      <Avatar className={classes.avatar}>
        {creator.charAt(0)}
      </Avatar>
    </Grid>
    <Grid item>
      <Paper className={classes.messageContent}>
        <Typography variant="caption" display="block" gutterBottom>
          <strong>{creator}</strong>
          {` says:`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
      </Paper>
      <DateItem className={classes.anchored} date={dateCreated} gutterBottom />
    </Grid>
  </Grid>
);

const TopicMessagesSegment = ({ messages, classes }) => (
  <Container maxWidth="sm">
    {messages.map(({
      id,
      creator_user_name: creator,
      created_at: dateCreated,
      message,
    }) => (
      <TopicMessage
        classes={classes}
        key={id}
        message={message}
        creator={creator}
        dateCreated={dateCreated}
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
      <Grid container wrap="nowrap" spacing={1}>
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
          topicId={topicId}
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
