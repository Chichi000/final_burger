import React, { Fragment, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import { newProduct, clearErrors } from "../../actions/productActions";

import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
  const [name, setName] = useState("");

  const [price, setPrice] = useState(0);

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [stock, setStock] = useState(0);

  const [seller, setSeller] = useState("");

  const [images, setImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Select Burger',
    'Beefburger',
    'Chickenburger',
    'Veggieburger',
    'Fishburger',
    'Cheeseburger',
    'Baconburger'
]
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const schema = yup
    .object({
      name: yup.string().required("Name is Required"),
      price: yup
        .number()
        .moreThan(0, "Price must be more than 0")
        .integer()
        .required("Price is Required"),
      description: yup.string().required("Description is Required"),
      stock: yup
        .number()
        .moreThan(0, "Stock must be more than 0")
        .integer()
        .required("Stock is Required"),
      category: yup.string().required("Please Select Category"),
      seller: yup.string().required("Seller Name is Required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    submitHandler();
  };

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");

      message("Product created successfully");

      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    const formData = new FormData();

    formData.set("name", name);

    formData.set("price", price);

    formData.set("description", description);

    formData.set("category", category);

    formData.set("stock", stock);

    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);

          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      

      <div className="row"  style={{backgroundImage: "url(/images/up.png)", backgroundRepeat: 'no-repeat',backgroundPosition: "center", backgroundSize:"cover", marginTop: "1.3rem"}}>
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10" style={{marginTop:'2.4rem'}}>
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"

                style={{marginRight:'250px'}}
              >
                <h1 className="mb-4">New Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>

                  <input
                    {...register("name")}
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-danger">
                      
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>

                  <input
                    {...register("price")}
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {errors.price && (
                    <p className="text-danger">
                      
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>

                  <textarea
                    {...register("description")}
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                {errors.description && (
                  <p className="text-danger">
                   
                    {errors.description.message}
                  </p>
                )}

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>

                  <select
                  {...register("category")}
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-danger">
                      
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>

                  <input
                    {...register("stock")}
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  {errors.stock && (
                    <p className="text-danger">
                      
                      {errors.stock.message}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>

                  <input
                    {...register("seller")}
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                  {errors.seller && (
                    <p className="text-danger">
                      
                      {errors.seller.message}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />

                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  style={{backgroundColor:'black'}}
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;


