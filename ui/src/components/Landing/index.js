import { connect } from 'react-redux';

import Landing from './Landing';
import routines from '../../store/actions';

const mapStateToProps = state => ({
  authToken: ''
});

const mapDispatchToProps = dispatch => ({
  handleSignUp: input => dispatch(routines.signUpRoutine.trigger(input)),
  handleLogIn: input => dispatch(routines.logInRoutine.trigger(input)),
  handleDispatch: () => dispatch(routines.signUpRoutine.trigger({
    lol: 'lmao',
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
