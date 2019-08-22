import { connect } from 'react-redux';

import Feed from './Feed';
import routines from '../../store/actions';

const mapStateToProps = state => ({
  topics: Object.values(state.topics)
});

const mapDispatchToProps = dispatch => ({
  getTopics: () => dispatch(routines.fetchTopicFeedRoutine.trigger()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
