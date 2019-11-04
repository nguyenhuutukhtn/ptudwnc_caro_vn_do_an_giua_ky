import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBBtn
} from 'mdbreact';

const Home = () => {
  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol className="" md="12">
            <MDBNavbar color="default-color" dark expand="md">
              <MDBNavbarToggler />
              <MDBCollapse id="navbarCollapse3" navbar>
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <MDBBtn>
                      <MDBIcon icon="laptop" /> Chơi với máy
                    </MDBBtn>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBBtn>
                      <MDBIcon icon="globe-asia" /> Chơi Online
                    </MDBBtn>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem href="#!">
                          Cập nhật thông tin
                        </MDBDropdownItem>
                        <MDBDropdownItem href="#!">Đăng xuất</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <img
              className="img-fluid border border-primary"
              src="https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=https%3A%2F%2Fcothu.vn%2Fwp-content%2Fuploads%2F2019%2F01%2Fgame-co-caro-dang-cap.jpg&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*"
            />
          </MDBCol>
          <MDBCol size="4">
            <MDBContainer style={{ background: 'white' }}>
              <MDBRow>
                <MDBCol md="2" />
                <MDBCol md="8">
                  <div className="text-center">
                    <h1 className=" text-center">Thông tin</h1>
                  </div>
                  <MDBCol md="2" />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="2" />
                <MDBCol md="8" className="border border-primary">
                  <div class="text-center">
                    <img
                      src="https://res.cloudinary.com/dsqfchskj/image/upload/v1572862039/Caro/ca-ro-home_soophl.jpg"
                      class="img-fluid img-thumbnail"
                      alt=""
                    />
                  </div>
                  <MDBCol md="2" />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <div class="list-group">
                    <div
                      href="#"
                      class="list-group-item list-group-item-action float-left"
                    >
                      <i class="fa fa-camera "></i> Pictures{' '}
                      <span class="badge badge-pill badge-primary pull-right">
                        145
                      </span>
                    </div>
                    <div
                      href="#"
                      class="list-group-item list-group-item-action float-left"
                    >
                      <i class="fa fa-music"></i> Music{' '}
                      <span class="badge badge-pill badge-primary pull-right">
                        50
                      </span>
                    </div>
                    <div
                      href="#"
                      class="list-group-item list-group-item-action float-left"
                    >
                      <i class="fa fa-film"></i> Videos{' '}
                      <span class="badge badge-pill badge-primary pull-right">
                        8
                      </span>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow></MDBRow>
              <MDBRow></MDBRow>
              <MDBRow></MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Home;
