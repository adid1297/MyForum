import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

// import Copyright from '../common/Copyright';
import { useFeedStyles } from './FeedStyles';

const TopicForm = ({ classes }) => {
  const [values, setValues] = React.useState({
    title: '',
    description: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
        Start a conversation!
      </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="topicform-title"
          label="Topic Title"
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin="dense"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="topicform-desc"
          label="Description"
          className={classes.textField}
          variant="outlined"
          margin="normal"
          rowsMax="3"
          multiline
          fullWidth
        />
      </form>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary">
              Create this Conversation
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

const FeedItem = ({ topic, classes }) => (
  <Grid item key={topic.id} xs={12}>
    <CardActionArea component="a" href="#">
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {topic.subject}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {topic.created_at}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {topic.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
        </Hidden>
      </Card>
    </CardActionArea>
  </Grid>
);

const Feed = ({ topics, getTopics }) => {
  const classes = useFeedStyles();

  useEffect(() => {
    getTopics();
  }, [getTopics]);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <TopicForm classes={classes} />
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4} className={classes.cardGrid}>
            {topics.map(topic => <FeedItem
              key={topic.id} topic={topic} classes={classes}
            />)}
          </Grid>
        </Container>
      </main>
      {/* Footer convert to pagination */}
      {/* <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer> */}
      {/* End footer */}
    </React.Fragment>
  );
}

export default Feed;
