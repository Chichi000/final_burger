import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const schema = yup
    .object({
      name: yup.string().required("Name is Required"),
      email: yup
        .string()
        .email("Email is not valid")
        .required("Email is Required"),
      password: yup.string().required("Password is Required"),
    })
    .required();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      switch (e.target.name) {
        case "name":
          setName(e.target.value);
          break;
        case "email":
          setEmail(e.target.value);
          break;
        case "password":
          setPassword(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <div className="row wrapper" style={{backgroundImage: "url(/images/log.png)", backgroundRepeat: 'no-repeat', height: "800px",backgroundPosition: "center", backgroundSize:"cover", marginTop: "2rem"}}>
        <div className="col-10 col-lg-5" style={{marginLeft:'300px'}}>
          <form
            className="shadow-lg"
            onSubmit={handleSubmit(submitHandler)}
            encType="multipart/form-data"
          >
            <h1 className="mb-3" style={{textAlign:'center', fontFamily:'fantasy', fontSize:'50px'}}>Register</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                style={{backgroundColor:'transparent', borderColor:'black', borderStyle:'solid'}}
                {...formRegister("name")}
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={onChange}
              />
              {errors.name && (
                <p className="text-danger">
                  
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
              style={{backgroundColor:'transparent', borderColor:'black', borderStyle:'solid'}}
                {...formRegister("email")}
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={onChange}
              />
              {errors.email && (
                <p className="text-danger">
                  
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                style={{backgroundColor:'transparent', borderColor:'black', borderStyle:'solid'}}
                {...formRegister("password")}
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={onChange}
              />
              {errors.password && (
                <p className="text-danger">
                  
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    style={{backgroundColor:'transparent', borderColor:'black', borderStyle:'solid'}}
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              style={{backgroundColor:'black'}}
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
