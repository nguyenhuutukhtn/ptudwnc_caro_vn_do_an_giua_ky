import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBModalFooter
} from 'mdbreact';
import '../register/register.css';

const Register = () => {
  return (
    <div>
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
                  error="wrong"
                  success="right"
                  icon="user"
                />
                <MDBInput
                  label="Email"
                  group
                  type="email"
                  validate
                  containerClass="mb-0"
                  icon="envelope"
                />
                <MDBInput
                  label="Mật khẩu"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  icon="lock"
                />
                <MDBInput
                  label="Xác nhận mật khẩu"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  icon="exclamation-triangle"
                />
                <div className="text-center mb-3">
                  <MDBBtn
                    type="button"
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a"
                  >
                    Đăng ký
                  </MDBBtn>
                </div>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  Đã có tài khoản?
                  <a href="#!" className="blue-text ml-1">
                    Đăng nhập
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

export default Register;
