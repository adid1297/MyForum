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
