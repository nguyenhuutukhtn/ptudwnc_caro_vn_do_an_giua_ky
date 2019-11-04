import { userConstants } from '../constants/user.constants';
import { userApis } from '../apis/user.api';
import { alertActions } from '../actions/alert.action';
import { history } from '../helpers/history';

export const userActions = {
  register,
  login
};

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userApis.register(user).then(
      user => {
        dispatch(success());
        history.push('/');
        dispatch(alertActions.success('Đăng ký tài khoản thành công'));
        window.location.reload();
      },
      error => {
        console.log('xxxxxxxxxx' + error);
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

function login(username, password) {
  return dispatch => {
    dispatch(request(username, password));

    userApis.login(username, password).then(
      userInfo => {
        console.log(userInfo);
        dispatch(success());
        history.push('/');
        dispatch(alertActions.success('Đăng nhập thành công'));
        window.location.reload();
      },
      error => {
        console.log('xxxxxxxxxx' + error);
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(username, password) {
    return { type: userConstants.LOGIN_REQUEST, username, password };
  }
  function success(userInfo) {
    return { type: userConstants.LOGIN_SUCCESS, userInfo };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}
