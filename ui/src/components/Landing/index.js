import { connect } from 'react-redux';
import Landing from './Landing';

const mapStateToProps = state => ({
  authToken: ''
});

const mapDispatchToProps = dispatch => ({
  handleSignUp: () => {},
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
