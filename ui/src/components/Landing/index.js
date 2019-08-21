import { connect } from 'react-redux';
import Landing from './Landing';

const mapStateToProps = state => ({
  authToken: ''
});

const mapDispatchToProps = dispatch => ({
  handleSignUp: input => dispatch({type: 'test', payload: input}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
