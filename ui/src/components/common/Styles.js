import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  centerCard: {
    display: 'flex',
    margin: theme.spacing(4, 4),
  },
  fillContent: {
    flexGrow: 1,
  },
  cardHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  cardMedia: {
    width: 160,
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

export default useStyles;

export const useLandingStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toggle: {
    margin: theme.spacing(4, 0, 1),
  }
}));
