import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, clearErrors, deleteOrder } from '../../actions/orderActions';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '700px',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    fontWeight: 'bold',
    padding: 5,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    padding: 5,
  },
});

const OrdersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, orders } = useSelector(state => state.allOrders);
  const { isDeleted } = useSelector(state => state.order);

  const errMsg = (message = '') =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = '') =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(allOrders());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg('Order deleted successfully');
      navigate('/admin/orders');
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteOrderHandler = id => {
    dispatch(deleteOrder(id));
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'No of Items',
          field: 'numofItems',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
            label: 'Actions',
            field: 'actions',
            sort: 'asc',
            },
            ],
            rows: [],
            };orders.forEach(order => {
                data.rows.push({
                  id: order._id,
                  numofItems: order.orderItems.length,
                  amount: `$${order.totalPrice}`,
                  status:
                    order.orderStatus && String(order.orderStatus).includes('Delivered')
                      ? String(order.orderStatus).replace('Delivered', '').trim()
                      : order.orderStatus,
                  actions: (
                    <Fragment>
                      <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                      </Link>
                      <button
                        className="btn btn-danger py-1 px-2 ml-2"
                        onClick={() => deleteOrderHandler(order._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                     
                      <PDFViewer
                        width="400"
                        height="300"
                        style={{ border: '1px solid #eee' }}
                        className="ml-2"
                      >
                        <Document>
                          <Page size="A4" style={styles.page}>
                            <View>
                              <Text style={styles.title}>Order Invoice</Text>
                              <View style={styles.table}>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableColHeader}>
                                    <Text>ID</Text>
                                  </View>
                                  <View style={styles.tableCol}>
                                    <Text>{order._id}</Text>
                                  </View>
                                </View>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableColHeader}>
                                    <Text>No of Items</Text>
                                  </View>
                                  <View style={styles.tableCol}>
                                    <Text>{order.orderItems.length}</Text>
                                  </View>
                                </View>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableColHeader}>
                                    <Text>Amount</Text>
                                  </View>
                                  <View style={styles.tableCol}>
                                    <Text>{`$${order.totalPrice}`}</Text>
                                  </View>
                                </View>
                                <View style={styles.tableRow}>
                                  <View style={styles.tableColHeader}>
                                    <Text>Status</Text>
                                  </View>
                                  <View style={styles.tableCol}>
                                    <Text>{order.orderStatus}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </Page>
                        </Document>
                      </PDFViewer>
                    </Fragment>
                  ),
                });
              });
              
              return data;

            };

            return (
            <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row" >
            <div className="col-12 col-md-2" >
            <Sidebar />
            </div>
            <div className="col-12 col-md-10">
            <Fragment>
            <h1 className="my-5">All Orders</h1>
            {loading ? (
            <Loader />
            ) : (
            <MDBDataTable
            style={{backgroundImage: "url(/images/or.png)", backgroundRepeat: 'no-repeat',backgroundPosition: "center", backgroundSize:"cover"}}
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
            responsive
            />
)}
</Fragment>

</div>
</div>
</Fragment>
);
};
export default OrdersList;
              
