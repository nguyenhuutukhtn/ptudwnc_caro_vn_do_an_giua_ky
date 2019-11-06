import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBModalFooter
} from 'mdbreact';
import '../register/register.css';
import { connect } from 'react-redux';
import { userActions } from '../../actions/user.action';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        password2: ''
      },
      matchedPassword: false,
      submitted: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChangeHandler(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
    if (name === 'password2' && user.password === event.target.value) {
      this.setState({ matchedPassword: true });
    }
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({
      submitted: true
    });
    const { user } = this.state;
    if (user.username && user.email && user.password && user.password2) {
      this.props.register(user);
    }
  }
  render() {
    const { user, submitted, matchedPassword } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <form className="needs-validation" onSubmit={this.submitHandler}>
          <MDBContainer center>
            <MDBRow>
              <MDBCol className="d-flex justify-content-center">
                <MDBCard>
                  <MDBCardBody>
                    <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                        <strong>Đăng Ký</strong>
                      </h3>
                    </div>
                    <MDBInput
                      label="Tên đăng nhập"
                      group
                      type="text"
                      validate
                      containerClass="text-left"
                      name="username"
                      error="wrong"
                      success="right"
                      icon="user"
                      onChange={this.onChangeHandler}
                    >
                      {submitted && !user.username ? (
                        <div className="invalid-tooltip d-block">
                          Tên đăng nhập không được bỏ trống
                        </div>
                      ) : null}

                      <div className="valid-feedback">Looks good!</div>
                    </MDBInput>
                    <MDBInput
                      label="Email"
                      group
                      type="email"
                      name="email"
                      validate
                      containerClass="mb-0 text-left"
                      icon="envelope"
                      onChange={this.onChangeHandler}
                    >
                      {submitted && !user.email ? (
                        <div className="invalid-tooltip d-block">
                          Email không được bỏ trống
                        </div>
                      ) : null}
                    </MDBInput>
                    <MDBInput
                      label="Mật khẩu"
                      group
                      type="password"
                      name="password"
                      validate
                      containerClass="mb-0 text-left"
                      icon="lock"
                      onChange={this.onChangeHandler}
                    >
                      {submitted && !user.password ? (
                        <div className="invalid-tooltip d-block">
                          Mật khẩu không được bỏ trống
                        </div>
                      ) : null}
                    </MDBInput>
                    <MDBInput
                      label="Xác nhận mật khẩu"
                      group
                      type="password"
                      validate
                      name="password2"
                      containerClass="mb-0 text-left"
                      icon="exclamation-triangle"
                      onChange={this.onChangeHandler}
                    >
                      {submitted && !matchedPassword ? (
                        <div className="invalid-tooltip d-block">
                          Mật khẩu nhập lại không đúng
                        </div>
                      ) : null}
                    </MDBInput>
                    <div className="text-center mb-3">
                      <MDBBtn
                        type="submit"
                        gradient="blue"
                        rounded
                        className="btn-block z-depth-1a"
                      >
                        Đăng ký
                        {loading ? (
                          <div
                            class="spinner-border spinner-border-sm fast"
                            role="status"
                          />
                        ) : null}
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                  <MDBModalFooter className="mx-5 pt-3 mb-1">
                    <p className="font-small grey-text d-flex justify-content-end">
                      Đã có tài khoản?
                      <a href="/login" className="blue-text ml-1">
                        Đăng nhập
                      </a>
                    </p>
                  </MDBModalFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { loading } = state.registration;
  return { loading };
}

const actionCreators = {
  register: userActions.register
};

const connectedRegisterPage = connect(
  mapState,
  actionCreators
)(Register);

export default connectedRegisterPage;
