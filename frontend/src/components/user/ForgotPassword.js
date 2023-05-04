import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.forgotPassword)
    
    const success = (message='' ) => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const notify = (error='' ) => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    
    useEffect(() => {
        if (error) {
            notify(error);
            dispatch(clearErrors());
        }
        if (message) {
            success(message)
        }
    }, [dispatch, error, message])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
    <div className="row wrapper" style={{backgroundImage: "url(/images/log.png)", backgroundRepeat: 'no-repeat', height: "800px",backgroundPosition: "center", backgroundSize:"cover", marginTop: "2rem"}}>
                <div className="col-10 col-lg-5"  style={{ marginTop: "1rem", height:"400px",   marginLeft:'300px'}}>
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3" style={{textAlign: "center", color: "black"}}>Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field" style={{ fontSize: "20px"}}>Enter Email</label>
                            <input
                                 style={{backgroundColor:'transparent', borderColor:'black', borderStyle:'solid'}}
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                           style={{backgroundColor: "black", borderBlockColor:"white", borderRadius:"50px", borderInlineWidth: "7px",  fontFamily: "Times New ROman, serif", fontSize: "25px", color:"Yellow", width:"350px", marginLeft:"100px", height: "55px", borderInlineColor: "yellow"}}
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false} >
                            Send Email
                    </button>



                    </form>

                </div>
            </div>
        </Fragment>
    )
}



export default ForgotPassword