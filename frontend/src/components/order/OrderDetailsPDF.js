import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '30%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    fontWeight: 'bold',
    padding: 5,
  },
  tableCol: {
    width: '70%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    padding: 5,
  },
  item: {
    marginBottom: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemTotal: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
  },
});




const OrderDetailsPDF = ({ order }) => {
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;
  
  return (
  <Document>
  <Page style={styles.page}>
  <View style={styles.title}>
  <Text>Order</Text>
  </View>
  <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text>Name</Text>
        </View>
        <View style={styles.tableCol}>
          <Text>{user && user.name}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text>Phone</Text>
        </View>
        <View style={styles.tableCol}>
          <Text>{shippingInfo && shippingInfo.phoneNo}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text>Address</Text>
        </View>
        <View style={styles.tableCol}>
          <Text>{shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text>Amount</Text>
        </View>
        <View style={styles.tableCol}>
          <Text>${totalPrice}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text>Payment Status</Text>
        </View>
        <View style={styles.tableCol}>
          <Text>{paymentInfo && paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text>Order Status</Text>
        </View>
        <View style={styles.tableCol}>
          <Text>{orderStatus}</Text>
        </View>
      </View>
    </View>

    <View>
     <Text style={{color:'red'}}>************************************************************************************</Text>
      <Text style={{textAlign:'center'}}>Order Items </Text>
    
      {orderItems && orderItems.map(item => (
        <View key={item.product}>
          <Text style={{fontSize:'22px', color:'orange'}}>{item.name}</Text>
          <Text>Price: ${item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Total: ${item.price * item.quantity}</Text>
        </View>
      ))}
    </View>
  </Page>
</Document>

);
};

export default OrderDetailsPDF;



