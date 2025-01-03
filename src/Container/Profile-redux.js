import Profile from './Profile';
import {connect} from 'react-redux';
import {withNavigation} from '../Common/WithNavigation';
import {profileRequest} from './action';

const mapStateToProps = state => {
  // console.log('profile=====>', state.profile.profile);
  return {
    ...state,
    profileDetails: state.profile.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profilerequest: query => dispatch(profileRequest(query)),
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Profile),
);
