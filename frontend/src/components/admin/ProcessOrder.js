import React, { Fragment, useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'



import MetaData from '../layout/MetaData'

import Loader from '../layout/Loader'

import Sidebar from './Sidebar'

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import './css/order.css'


import { useDispatch, useSelector } from 'react-redux'

import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'

import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'



const ProcessOrder = () => {

    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    let { id } = useParams();

    const { loading, order = {} } = useSelector(state => state.orderDetails)

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    const { error, isUpdated } = useSelector(state => state.order)

    const orderId = id;

    const errMsg = (message = '') => toast.error(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    const successMsg = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });



    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {

            errMsg(error);

            dispatch(clearErrors())

        }

        if (isUpdated) {

            successMsg('Order updated successfully');

            dispatch({ type: UPDATE_ORDER_RESET })

        }

    }, [dispatch, error, isUpdated, orderId])

    

    const updateOrderHandler = (id) => {

        const formData = new FormData();

        formData.set('status', status);

        dispatch(updateOrder(id, formData))

    }



    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false



    return (
    

        <Fragment>

            <MetaData title={`Process Order # ${order && order._id}`} />

            <div className="row" style={{backgroundImage: "url(/images/one.png)", backgroundRepeat: 'no-repeat',backgroundPosition: "center", backgroundSize:"100% 100%", marginTop: "4.5rem"}}>

                <div className="col-12 col-md-2">

                    <Sidebar />

                </div>

                <div className="col-5 col-md-9">

                    <Fragment>

                        {loading ? <Loader /> : (

                            <div className="row d-flex justify-content-around">

                                <div className="col-12 col-lg-7 order-details">

                                <div style={{ borderRadius: '10px', padding:'10px', width:'100%', borderStyle:'dashed'}}>

                                    <h2 className="my-5" style={{textAlign:'center', color:'black'}}>Order # {order._id}</h2>
                                 </div>   

                                 <hr style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '3px',
          
        }}/>

                                    <h4 className="mb-4">Shipping Info</h4>


                                   

                                    <p><b>Name:</b> {user && user.name}</p>

                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>

                                    <p className="mb-4"><b>Address:</b>{shippingDetails}</p>

                                    <p><b>Amount:</b> ${totalPrice}</p>

                                   

                                    <hr style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '3px',
          
        }}/>



                                    <h4 className="my-4">Payment</h4>
                                                                       

                                    <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

                                   

                                    <h4 className="my-4">Stripe ID</h4>
                                   
                                    <p><b>{paymentInfo && paymentInfo.id}</b></p>


                                   
                                    <h4 className="my-4">Order Status:</h4>
                                   
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>
                                   
                                    <h4 className="my-4">Order Items:</h4>

                                    <hr style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '3px',
          
        }}/>
                                    <div className="cart-item my-1"   style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black" }}>

                                        {orderItems && orderItems.map(item => (

                                            <div key={item.product} className="row my-5" >

                                                <div className="col-4 col-lg-2" >

                                                    <img src={item.image} alt={item.name} height="45" width="65" />

                                                </div>



                                                <div className="col-5 col-lg-5">

                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>

                                                </div>

                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">

                                                    <p>${item.price}</p>

                                                </div>



                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">

                                                    <p>{item.quantity} Piece(s)</p>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                    <hr style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '3px',
          
        }}/>

                                </div>



                                <div className="col-12 col-lg-3 mt-5">

                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">

                                        <select

                                            className="form-control"

                                            name='status'

                                            value={status}

                                            onChange={(e) => setStatus(e.target.value)}

                                        >

                                            <option value="Processing">Processing</option>

                                            <option value="Shipped">Shipped</option>

                                            <option value="Delivered">Delivered</option>

                                        </select>

                                    </div>



                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)} style={{ borderInlineColor: "black", borderBlockColor: "yellow", borderRadius:"20px", borderBlockStartWidth:"4.4px", borderBlockEndColor: "black", backgroundColor:'black'}}>

                                        Update Status

                                    </button>

                                </div>

                            </div>

                        )}

                    </Fragment>

                </div>

            </div>

        </Fragment>

    )

}



export default ProcessOrder