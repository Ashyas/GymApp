import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Card from './UI/Card';

const MessageItem = props => {
  return (
    <Card style={styles.container}>
      <View style={styles.details}>
      <Text style={styles.date}><Text>   </Text>{props.date}</Text>
        <Text style={styles.name}><Text>   </Text>{props.name}:</Text>
        <Text style={styles.message}><Text>   </Text>{props.message}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 400,
    margin: 10
   },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  date: {
    fontSize: 10,
    marginVertical: 4
  },
  title: {
    fontSize: 15,
    marginVertical: 4
  },
  messagee: {
    fontSize: 15,
    marginVertical: 4
  },
});
export default MessageItem;
