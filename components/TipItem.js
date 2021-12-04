import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Colors from '../constants/Colors';
import Card from './UI/Card';

const TipItem = props => {
  return (
    
    <Card style={styles.container}>
    <View style={styles.topContainer}>
      <View style={styles.details}>
        <Text style={styles.title}>Tip: {props.title}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Delete"
          onPress={props.onDelete}
        />
      </View>
    </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 330,
    margin: 20
   },
   topContainer: {
    flexDirection: 'column'
   },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  title: {
    fontSize: 20,
    marginVertical: 4
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '75%',
    marginBottom: 70,

  }
});

export default TipItem;
