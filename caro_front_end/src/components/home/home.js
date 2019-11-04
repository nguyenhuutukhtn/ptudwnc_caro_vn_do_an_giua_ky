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

const Home = () => {
  return (
    <div>
      <MDBContainer center>
        <MDBRow>
          <MDBCol className="d-flex justify-content-center">
            <div>Home</div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Home;
