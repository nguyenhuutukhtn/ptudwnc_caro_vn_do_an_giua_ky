import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter
} from 'mdbreact';
import './login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions/user.action';
import { history } from '../../helpers/history';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  checkLogin(){
    var userInfo = localStorage.getItem('userInfo');
    if (userInfo){
      history.push('/');
      window.location.reload();
    }
  }
  
  render() {

    const { submitted, username, password } = this.state;
    const { loggingIn } = this.props;


    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <MDBModalFooter center>
            <MDBRow>
              <MDBCol className="d-flex justify-content-center">
                <MDBCard>
                  <MDBCardBody>
                    <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                        <strong>Đăng nhập</strong>
                      </h3>
                    </div>
                    <MDBInput
                      label="Tên đăng nhập"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="username"
                      onChange={this.handleChange}
                    >
                      {submitted && !username ? (
                        <div className="invalid-tooltip d-block">
                          Tên đăng nhập không được bỏ trống
                        </div>
                      ) : null}
                    </MDBInput>
                    <MDBInput
                      label="Mật khẩu"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                      name="password"
                      onChange={this.handleChange}
                    >
                      {submitted && !password ? (
                        <div className="invalid-tooltip d-block">
                          Mật khẩu không được bỏ trống
                        </div>
                      ) : null}
                    </MDBInput>
                    <p className="font-small blue-text d-flex justify-content-end pb-3">
                      
                      <a href="#!" className="blue-text ml-1">
                      Quên Mật khẩu?
                      </a>
                    </p>
                    <div className="text-center mb-3">
                      <MDBBtn
                        type="submit"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                      >
                        Đăng nhập
                        {loggingIn ? (
                          <div
                            className="spinner-border spinner-border-sm fast"
                            role="status"
                          />
                        ) : null}
                      </MDBBtn>
                    </div>
                    <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                      Hoặc đăng nhập với:
                    </p>
                    <div className="row my-3 d-flex justify-content-center">
                      <MDBBtn
                        type="button"
                        color="white"
                        rounded
                        className="mr-md-3 z-depth-1a"
                      >
                        <MDBIcon
                          fab
                          icon="facebook-f"
                          className="blue-text text-center"
                        />
                      </MDBBtn>

                      <MDBBtn
                        type="button"
                        color="white"
                        rounded
                        className="z-depth-1a"
                      >
                        <MDBIcon
                          fab
                          icon="google-plus-g"
                          className="blue-text"
                        />
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">
                      Bạn chưa có tài khoản?
                      <a href="/register" className="blue-text ml-1">
                        Tạo tài khoản
                      </a>
                    </p>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBModalFooter>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.login;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login
  // logout: userActions.logout
};

const connectedLoginPage = connect(
  mapState,
  actionCreators
)(Login);

export default connectedLoginPage;
