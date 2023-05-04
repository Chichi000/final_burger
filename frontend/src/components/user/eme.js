import React, { Fragment, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListReviews from '../review/ListReviews';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors, newReview } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';

const ProductDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { error: reviewError, success } = useSelector((state) => state.newReview);
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const notify = (error = '') =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = '') =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      dispatch(clearErrors());
    }
    if (success) {
      successMsg('Reivew posted successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, reviewError, success, id]);

  const increaseQty = () => {
    const count = document.querySelector('.count');
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector('.count');
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
  };

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.starValue = index + 1;
      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      //...
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img className="d-block w-100" src={image.url} alt={product.title} />
                    </Carousel.Item>
))}
</Carousel>
</div>
<div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>
          <p id="product_id">Product # {product._id}</p>

          <hr />

          <MDBTypography tag="h4" variant="h4-responsive">
            ${product.price}
          </MDBTypography>

          <hr />

          <MDBTypography tag="h5" variant="h5-responsive">
            Description:
          </MDBTypography>
          <p>{product.description}</p>

          <MDBTypography tag="h5" variant="h5-responsive">
            Seller:
          </MDBTypography>
          <p>{product.seller}</p>

          <MDBTypography tag="h5" variant="h5-responsive">
            Category:
          </MDBTypography>
          <p>{product.category}</p>

          <MDBTypography tag="h5" variant="h5-responsive">
            Available Stock:
          </MDBTypography>
          <p>{product.stock}</p>

          <hr />

          <MDBRow className="justify-content-center">
            <MDBCol md="6">
              <span className="btn btn-danger minus" onClick={decreaseQty}>
                -
              </span>
              <span className="count mx-2">{quantity}</span>
              <span className="btn btn-primary plus" onClick={increaseQty}>
                +
              </span>
            </MDBCol>
          </MDBRow>

          <MDBRow className="justify-content-center my-3">
            <MDBBtn color="dark" onClick={addToCart}>
              Add to Cart
            </MDBBtn>
          </MDBRow>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 col-lg-8">
          <h3>Reviews:</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <ListReviews reviews={product.reviews} />
          ) : (
            <p>No Reviews</p>
          )}
          <h3>Write a review:</h3>
          {user ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              dispatch(newReview(id, { rating, comment }));
            }}>
              <div className="form-group">
                <MDBRow className="my-4">
                  <MDBCol md="3">
                    <label htmlFor="rating_star">
                      Select Rating
                      <span className="text-danger">*</span>
                    </label>
                  </MDBCol>
                  <MDBCol md="9">
                    <div className="stars">
                      <span className="star">&nbsp;</span>
                      <span className="star">&nbsp;</span>
                      <span className="star">&nbsp;</span>
                      <span className="star">&nbsp;</span>
                      <span className="star">&nbsp;</span>
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="3">
                    <label htmlFor="review_comment">
                      Your Comment
                      <span className="text-danger">*</span>
                    </label>
                  </MDBCol>
                  <MDBCol md="9">
                    <textarea
                      id="review_comment"
                      className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </MDBCol>
                </MDBRow>

                <MDBRow className="my-3">
                  <MDBCol md="3"></MDBCol>
                  <MDBCol md="9">
                    <button
                      className="btn btn-primary btn-sm"
                      type="submit"
                      disabled={rating === 0 || comment.trim() === "" || isLoading
                    }
                    >
                    Submit Review
                    </button>
                    </MDBCol>
                    </MDBRow>
                    </div>
                    </form>
                    ) : (
                    <p>Please <Link to="/login">login</Link> to write a review.</p>
                    )}
                    </div>
                    </div>
                    
                    </div>
  </Fragment>
                  
                    );
                    };
                    
                    export default ProductDetails;

