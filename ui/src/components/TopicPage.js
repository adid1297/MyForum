import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as routines from '../store/actions';

import {
  Avatar, Button, IconButton, Typography,
  Card, CardContent,
  Container, Grid, Paper,
  CircularProgress, InputBase, TextField,
  CssBaseline,
} from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

import DateItem from './common/DateItem';

const useTopicPageStyles = makeStyles(theme => ({
  overviewcard: {
    display: 'flex',
    margin: theme.spacing(4, 4),
  },
  subject:{
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  overviewcontent: {
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
  },
}));

const TopicActionsContainer = ({ className, children }) => (
  <Grid container
    direction="row"
    justify="flex-end"
    alignItems="center"
    spacing={1}
    className={className}
  >
    {children}
  </Grid>
);

const TopicDefaultActions = ({ handleEditClick, handleDeleteClick }) => (
  <TopicActionsContainer>
    <Grid item>
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  </TopicActionsContainer>
);

const TopicDeleteActions = ({ handleDelete, handleClear }) => (
  <TopicActionsContainer>
    <Grid item>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete This Topic?
      </Button>
    </Grid>
    <Grid item>
      <IconButton onClick={handleClear}>
        <ClearIcon />
      </IconButton>
    </Grid>
  </TopicActionsContainer>
);


const TopicEditActions = ({ handleEdit, handleClear }) => (
  <TopicActionsContainer>
    <Grid item>
      <IconButton onClick={handleEdit}>
        <SaveIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton onClick={handleClear}>
        <ClearIcon />
      </IconButton>
    </Grid>
  </TopicActionsContainer>
);

const TopicDetails = ({ topicId, subject, description, dateCreated, classes, toggleView }) => {
  const [showDefaultActions, setShowDefaultActions] = useState(true);
  const toggleActions = () => setShowDefaultActions(!showDefaultActions);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(routines.deleteTopicRoutine.trigger({ topicId }));
    toggleActions();
  };

  return (
    <>
      <Typography className={classes.subject} component="h2" variant="h3">
        {subject}
      </Typography>
      <DateItem date={dateCreated} />
      <Typography component="p" variant="body1">{description}</Typography>
      {showDefaultActions ? (
        <TopicDefaultActions
          handleEditClick={toggleView}
          handleDeleteClick={toggleActions}
        /> 
      ) : (
        <TopicDeleteActions
          handleClear={toggleActions}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

const TopicDetailsForm = ({
  subject,
  description,
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
    <>
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
        id="edit-description"
        label="Description"
        value={editedDescription}
        onChange={e => editDescription(e.target.value)}
        variant="outlined"
        margin="normal"
        multiline
        fullWidth
      />
      <TopicEditActions handleEdit={handleUpdate} handleClear={toggleView} />
    </>
  );
};

const TopicOverviewCard = ({ topicId, subject, description, dateCreated, classes }) => {
  const [viewForm, setViewForm] = useState(false);
  const toggleView = () => setViewForm(!viewForm);
  const props = { subject, description, dateCreated, topicId, classes, toggleView };

  return (
    <Card className={classes.overviewcard}>
      <CardContent className={classes.overviewcontent}>
        {viewForm ?
          <TopicDetailsForm {...props} /> :
          <TopicDetails {...props} />
        }
      </CardContent>
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

  if (!topic) return <CircularProgress color="secondary" />;

  return (
    <Container maxWidth="md">
      <CssBaseline />
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

export default TopicPage;
