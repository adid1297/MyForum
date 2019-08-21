import { connect } from 'react-redux';

import Landing from './Landing';
import { signUpRoutine } from '../../store/actions';

const mapStateToProps = state => ({
  authToken: ''
});

const mapDispatchToProps = dispatch => ({
  handleSignUp: input => dispatch(signUpRoutine.trigger(input)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
