import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import  CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(prevState => !prevState)
  };

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button 
        title={showDetails ? "Hide Details" : "Show Details"} 
        color={Colors.primary}
        onPress={toggleDetails}
      />
      {showDetails && 
      <View style={styles.detailItems}>
        {props.items.map(cartItem => (
        <CartItem 
          quantity={cartItem.quantity}
          amount={cartItem.sum}
          title={cartItem.productTitle}
          key={cartItem.productId}
        />
        ))}
      </View>
      }
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;