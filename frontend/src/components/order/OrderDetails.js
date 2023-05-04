import React, { Fragment, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import MetaData from '../layout/MetaData'

import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'

import { getOrderDetails, clearErrors } from '../../actions/orderActions'

import OrderDetailsPDF from './OrderDetailsPDF';
import { PDFDownloadLink } from "@react-pdf/renderer";


const OrderDetails = () => {



  

    const dispatch = useDispatch();



    const { loading, error, order = {} } = useSelector(state => state.orderDetails)

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order



    let { id } = useParams();



    useEffect(() => {

        dispatch(getOrderDetails(id));



        if (error) {

          

            dispatch(clearErrors())

        }

    }, [dispatch, error, id])



    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`



    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false



    return (

        <Fragment>

            <MetaData title={'Order Details'} />



            {loading ? <Loader /> : (
                

                <Fragment>

              <div style={{display: 'flex', justifyContent: 'center', marginLeft:'250px', marginTop:'2rem'}}>
                     
                     <div className="col-5 col-md-9"> 
               
                    <div className="row d-flex justify-content-between">

                        <div className="col-12 col-lg-8 mt-5 order-details">

                        <div className="col-5 col-md-9"> 

                            <h1 className="my-5" style={{textAlign:'center'}}>Order # {order._id}</h1>
                            
                           

                            <h4 className="mb-4">Shipping Info</h4>

                            <p><b>Name:</b> {user && user.name}</p>

                            <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>

                            <p className="mb-4"><b>Address:</b>{shippingDetails}</p>

                            <p><b>Amount:</b> ${totalPrice}</p>

                            <hr style={{
                                      background: 'orangered',
                                      color: 'orangered',
                                      borderColor: 'orangered',
                                      height: '3px'   }}/>

                        



                            <h4 className="my-4">Payment</h4>
                       
                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>





                            <h4 className="my-4">Order Status:</h4>

                            <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>





                            <h4 className="my-4">Order Items:</h4>



                            <hr style={{
                                      background: 'orangered',
                                      color: 'orangered',
                                      borderColor: 'orangered',
                                      height: '3px'   }}/>

                            <div className="cart-item my-1">

                                {orderItems && orderItems.map(item => (

                                    <div key={item.product} className="row my-5">

                                        <div className="col-4 col-lg-2" >

                                            <img src={item.image} alt={item.name} height="45" width="65" />

                                        </div>



                                        <div className="col-5 col-lg-5">

                                            <Link  style={{color:'orange'}} to={`/product/${item.product}`}>{item.name}</Link>

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
                                      background: 'orangered',
                                      color: 'orangered',
                                      borderColor: 'orangered',
                                      height: '3px'   }}/>
                        </div>
                            <PDFDownloadLink document={<OrderDetailsPDF order={order} />} fileName={`order_${order._id}.pdf`}>
                             <button className="btn btn-default btn-block" type="button"  style={{backgroundColor: "black", borderBlockColor:"white", borderRadius:"50px", borderInlineWidth: "7px",  fontFamily: "Times New ROman, serif", fontSize: "20px", color:"Yellow", width:"250px",height: "65px", marginLeft:"280px"}}>
                               Download Order 
                               </button>
                            </PDFDownloadLink>

                            </div>

                        </div>
                        </div>
                        </div>

                
                        

                </Fragment>

            )}



        </Fragment>

    )

}



export default OrderDetails

