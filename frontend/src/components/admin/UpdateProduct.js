import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
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
    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
    let { id } = useParams();
    let navigate = useNavigate();
    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });
    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock)
            setOldImages(product.images)
        }
        if (error) {
            errMsg(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            errMsg(updateError);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            navigate('/admin/products');
            successMsg('Product updated successfully');
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, error, isUpdated, navigate, updateError, product, id])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateProduct(product._id, formData))
    }
    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagesPreview([]);
        setImages([])
        setOldImages([])
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }
    return (
        <Fragment>
            <MetaData title={'Update Product'} />
            <div className="row"  style={{backgroundImage: "url(/images/up.png)", backgroundRepeat: 'no-repeat',backgroundPosition: "center", backgroundSize:"cover", marginTop: "1.3rem"}}>
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10" style={{marginTop:'2.4rem'}}>
                    <Fragment>
                        <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'  style={{borderStyle:'solid', borderInlineColor:'yellow', borderColor:'black', height:'1030px', borderRadius:'40px', marginRight:'250px'}}>
                                <h1 className="mb-4" style={{textAlign:'center'}}>Update Product</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                     style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black" }}


                                        type="text"

                                        id="name_field"

                                        className="form-control"

                                        value={name}

                                        onChange={(e) => setName(e.target.value)}

                                    />

                                </div>



                                <div className="form-group">

                                    <label htmlFor="price_field">Price</label>

                                    <input
                                     style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black" }}

                                        type="text"

                                        id="price_field"

                                        className="form-control"

                                        value={price}

                                        onChange={(e) => setPrice(e.target.value)}

                                    />

                                </div>



                                <div className="form-group">

                                    <label htmlFor="description_field">Description</label>

                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}  style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black" }}></textarea>

                                </div>



                                <div className="form-group">

                                    <label htmlFor="category_field">Category</label>

                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}  style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black" }}>

                                        {categories.map(category => (

                                            <option key={category} value={category} >{category}</option>

                                        ))}



                                    </select>

                                </div>

                                <div className="form-group">

                                    <label htmlFor="stock_field">Stock</label>

                                    <input
                                     style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black" }}

                                        type="number"

                                        id="stock_field"

                                        className="form-control"

                                        value={stock}

                                        onChange={(e) => setStock(e.target.value)}

                                    />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                     style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black" }}

                                        type="text"

                                        id="seller_field"

                                        className="form-control"

                                        value={seller}

                                        onChange={(e) => setSeller(e.target.value)}

                                    />

                                </div>
                                <div className='form-group'>
                                    <label>Images</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='images'
                                            className='custom-file-input'
                                            id='customFile'

                                            onChange={onChange}

                                            multiple

                                        />

                                        <label className='custom-file-label' htmlFor='customFile'>

                                            Choose Images

                                        </label>

                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}



                                    {imagesPreview.map(img => (

                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />

                                    ))}

                                </div>

                                <button
                                    style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black", backgroundColor:'black'}}

                                    id="login_button"

                                    type="submit"

                                    className="btn btn-block py-3"

                                    disabled={loading ? true : false}

                                >

                                    UPDATE

                                </button>

                            </form>

                        </div>

                    </Fragment>

                </div>

            </div>

        </Fragment>

    )

}



export default UpdateProduct