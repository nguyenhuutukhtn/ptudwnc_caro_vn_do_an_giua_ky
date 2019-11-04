import { userConstants } from '../constants/user.constants';
import { userApis } from '../apis/user.api';
import { alertActions } from '../actions/alert.action';
import { history } from '../helpers/history';

export const userActions = {
  register
};

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userApis.register(user).then(
      user => {
        dispatch(success());
        history.push('/');
        dispatch(alertActions.success('Registration successful'));
      },
      error => {
        // console.log('xxxxxxxxxx' + error);
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
