import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const Profile = () => {
  const { user, loading } = useSelector(state => state.auth)

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Your Profile'} />

          <section className="vh-100"  style={{backgroundImage: "url(/images/prof.png)", backgroundRepeat: 'no-repeat',backgroundPosition: "center", backgroundSize:"cover", marginTop: "2.5rem"}}>
            <MDBContainer className="py-5 h-100" >
              <MDBRow className="justify-content-center align-items-center h-100" >
                <MDBCol lg="6" className="mb-4 mb-lg-0" style={{ height:'400px'}}>
                  <MDBCard className="mb-3" style={{ borderRadius: '.5rem',backgroundColor:'#FFC107'}}>
                    <MDBRow className="g-0">
                      <MDBCol md="4" className="gradient-custom text-center text-white"
                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>

                        <MDBCardImage src={user.avatar.url} alt={user.name} className="my-5" style={{ width: '160px', marginLeft:'1rem' }} fluid />
                        <MDBTypography tag="h5" style={{color:'black'}}>{user.name}</MDBTypography>
                        <MDBCardText style={{color:'black'}}>{user.role}</MDBCardText>
                        <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5" style={{backgroundColor: 'black', color:'white', borderStyle:'solid', marginLeft:'20px'}}>
                          Edit Profile
                        </Link>
                      </MDBCol>
                      <MDBCol md="8">
                        <MDBCardBody className="p-4">
                          <MDBTypography tag="h3">Information</MDBTypography>
                          <hr className="mt-0 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Email</MDBTypography>
                              <MDBCardText className="text-muted" style={{fontSize:'15px'}}>{user.email}</MDBCardText>
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Joined On</MDBTypography>
                              <MDBCardText className="text-muted" style={{fontSize:'15px'}}>{String(user.createdAt).substring(0, 10)}</MDBCardText>
                            </MDBCol>
                          </MDBRow>

                          <hr className="mt-0 mb-4" />

                          {user.role !== 'admin' && (
                            <Link to="/orders/me" className="btn btn-default btn-block mt-5" style={{backgroundColor: 'black', color:'white'}}>
                              My Orders
                            </Link>
                          )}

                          <Link to="/password/update" className="btn btn-default btn-block mt-3" style={{backgroundColor: 'black', color:'white'}}>
                            Change Password
                          </Link>

                     
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
