import  React,  { useEffect, useCallback } from 'react';
import { View, Text, FlatList, Platform, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import ScheduleItem from '../components/ScheduleItem';
import * as schedulesAction from '../store/action/schedules';

const ScheduleScreen = (props) => {
   const dispatch = useDispatch()
   const userId = props.navigation.getParam('userId');
   const schedules = useSelector(state => state.schedules.userSchedules);

   useEffect(() => {
     dispatch(schedulesAction.fetchSchedules(userId));
   }, [dispatch]);

   const submitHandler = useCallback(() => {
   props.navigation.navigate('AddSchedule', {userId: userId});
  }, [dispatch]);
   
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

   if (schedules.length === 0) {
    return ( 
      <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontFamily: 'open-sans-bold', fontSize: 30}}>
          <Text>No Schedules Found, Maybe Start Creating Some</Text>
        </View>
      </LinearGradient>
    );
  }

   return (
   <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
    <FlatList
      data={schedules}
      keyExtractor={item => item.scheduleId}
      renderItem={itemData => (
        <ScheduleItem
          date={itemData.item.date}
          time={itemData.item.time}
          description={itemData.item.description}
          onDelete={() => {
            dispatch(schedulesAction.deleteSchedule(itemData.item.scheduleId));
          }}
        />       
      )}
    />
  </LinearGradient>
  );
};

ScheduleScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
  headerTitle: 'All Schedules',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="add"
        iconName={
          Platform.OS === 'android' ? 'md-add' : 'ios-add'
        }
        onPress={submitFn}
      />
    </HeaderButtons>
  ),
 };  
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ScheduleScreen;

