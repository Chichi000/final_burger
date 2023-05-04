import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../actions/userActions';

import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated } = useSelector((state) => state.user);

  const success = (message = '') =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = '') =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      console.log(error);
      notify(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      success('Password updated successfully');
      navigate('/me');
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  const submitHandler = (data) => {
    dispatch(updatePassword(data));
  };

  return (
    <Fragment>
      <MetaData title={'Change Password'} />
      <div className="row wrapper" style={{backgroundImage: "url(/images/log.png)", backgroundRepeat: 'no-repeat', height: "800px",backgroundPosition: "center", backgroundSize:"cover", marginTop: "2rem"}}>

<div className="col-10 col-lg-5" style={{marginLeft:'300px '}}>
          <form className='shadow-lg' onSubmit={handleSubmit(submitHandler)}>
            <h1 className='mt-2 mb-5'>Update Password</h1>
            <div className='form-group'>
              <label htmlFor='old_password_field'>Old Password</label>
              <input
                type='password'
                id='old_password_field'
                className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
                {...register('oldPassword', {
                  required: 'Old Password is required',
                  minLength: {
                    value: 6,
                    message: 'Old Password must be at least 6 characters long',
                  },
                })}
              />
              {errors.oldPassword && (
                <div className='invalid-feedback'>{errors.oldPassword.message}</div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='new_password_field'>New Password</label>
              <input
                type='password'
                id='new_password_field'
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                {...register('password', {
                  required: 'New Password is required',
                  minLength: {
                    value: 6,
                    message: 'New Password must be at least 6 characters long',
                  },
                })}
              />
              {errors.password && <div className='invalid-feedback'>{errors.password.message}</div>}
            </div>

            <button
            style={{backgroundColor:'black'}} 
              type='submit'
              className='btn update-btn btn-block mt-4 mb-3'
              disabled={isSubmitting}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
