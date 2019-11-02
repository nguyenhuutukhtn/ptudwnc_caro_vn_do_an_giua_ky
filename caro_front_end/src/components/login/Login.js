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

const Login = () => {
  return (
    <div>
      <MDBContainer center>
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
                />
                <MDBInput
                  label="Mật khẩu"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                />
                <p className="font-small blue-text d-flex justify-content-end pb-3">
                  Quên
                  <a href="#!" className="blue-text ml-1">
                    Mật khẩu?
                  </a>
                </p>
                <div className="text-center mb-3">
                  <MDBBtn
                    type="button"
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a"
                  >
                    Đăng nhập
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
                    <MDBIcon fab icon="google-plus-g" className="blue-text" />
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
      </MDBContainer>
    </div>
  );
};

export default Login;
