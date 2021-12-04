import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Colors from '../constants/Colors';
import Card from '../components/UI/Card';

const UserItem = props => {
  return (
    
    <Card style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{props.name}</Text>
        <View style={styles.buttonDetailsStyle}>
        <Button
          color={Colors.primary}
          title="Details"
          onPress={props.onEdit}
        />
        </View>
     </View>
      <View style={styles.actions}>
        <View style={styles.buttonStyle}>
        <Button
          color={Colors.primary}
          title="Schedule"
          onPress={props.onSchedule}
        />
     </View>
      <View style={styles.buttonStyle}>
        <Button
          color={Colors.primary}
          title="Training"
          onPress={props.onEditTraining}
        />
       </View>
       <View style={styles.buttonStyle}>
        <Button
          color={Colors.primary}
          title="Diet"
          onPress={props.onEditDiet}
        />
       </View>
       <View style={styles.buttonStyle}>
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
    height: 180,
    width: 330,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
   },
   buttonStyle: {
    paddingVertical: 3,
    paddingHorizontal: 5,
   },
   buttonDetailsStyle: {
    alignSelf: 'baseline',
  },
  details: {
    alignItems: 'baseline',
    height: '15%',
    padding: 10,
  },
  title: {
    fontSize: 30,
    marginVertical: 4,
    fontFamily: 'open-sans-bold',
  },
  actions: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 10,
    padding: 10,
    marginHorizontal: 30,
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    fontFamily: 'open-sans-bold',
  }
});
export default UserItem;
