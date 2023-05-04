import React, { Fragment, useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors, googlelogin } from '../../actions/userActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const Login = () => {
  const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const dispatch = useDispatch();

    const logins = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        // console.log(res)
                        setProfile(res.data);
                        dispatch(googlelogin(res.data));
                        console.log(res.data)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  let location = useLocation();
  const { isAuthenticated, error, loading } = useSelector(state => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const redirect = new URLSearchParams(location.search).get('redirect');
  const notify = (error = '') => toast.error(error, {
    position: toast.POSITION.BOTTOM_CENTER
  });

  React.useEffect(() => {
    if (isAuthenticated && redirect === 'shipping') {
      navigate(`/${redirect}`, { replace: true })
    } else if (isAuthenticated) {
      navigate('/')
    }

    if (error) {
      console.log(error);
      notify(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const onSubmit = data => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Login'} />
            
          <div className="row wrapper" style={{backgroundImage: "url(/images/home-bg.png)", backgroundRepeat: 'no-repeat', height: "800px",backgroundPosition: "center", backgroundSize:"cover", marginTop: "2rem"}}>
            <div className="col-10 col-lg-5" style={{borderRadius: "20%", borderStyle: "solid", borderColor: "white", borderInline: "yellow", height:"490px", backgroundImage: "url(/images/burger-baner.png)",backgroundPosition: "center", backgroundSize:"cover" }}>
              <form className="shadow-lg" onSubmit={handleSubmit(onSubmit)} style={{borderStyle:'solid', borderInline:'yellow', borderColor:'black', height:'490px', borderRadius:'40px'}}>
                <h1 className="mb-3"  style={{ textAlign: "center", color: "black"}} >Login</h1>
                <div className="form-group">
                  <label htmlFor="password_field" style={{color: "black", fontSize:"20px", backgroundColor:'white'}} >Email</label>
                  <input
                    style={{ borderInlineColor: "white", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "transparent" }}
                    type="email"
                    id="email_field"
                    className="form-control"
                    {...register('email', {
                    required: 'Email is required',
                    pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format'
                    }
                    })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}
                    </div>
                    
                    <div className="form-group">
                                <label htmlFor="password_field" style={{color: "black", fontSize:"20px", backgroundColor:'white'}} >Password</label>
                                <input
                                    style={{ borderInlineColor: "white", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "transparent" }}
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    {...register('password', {
                                      required: 'Password is required',
                                      minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                      }
                                    })}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
                            </div>

                            <Link to="/password/forgot" className="float-right mb-4" style={{color: "black", fontSize:"15px", backgroundColor:'white'}}>Forgot Password?</Link>

                            <button
                                 style={{backgroundColor: "black", borderBlockColor:"white", borderRadius:"50px", borderInlineWidth: "7px",  fontFamily: "Times New ROman, serif", fontSize: "20px", color:"Yellow", width:"150px",height: "65px", marginLeft:"200px"}}
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                            >
                                LOGIN
                            </button>
                           
                            <button
style={{backgroundColor: "black", borderBlockColor:"white", borderRadius:"50px", borderInlineWidth: "7px",  fontFamily: "Times New ROman, serif", fontSize: "20px", color:"Yellow", width:"150px",height: "65px", marginLeft:"200px"}}
id="login_button"
onSubmit={logins()}
className="btn btn-block py-3">
Log in With google
</button> 

                            <Link to="/register" className="float-right mt-3" style={{color: "black", fontSize:"15px", backgroundColor:'white'}}>New User?</Link>
                        </form>
                        
                    </div>
                   
                </div>
                
               

            </Fragment>
        )}
    </Fragment>
)

}

export default Login
