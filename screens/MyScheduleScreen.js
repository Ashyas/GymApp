import  React,  { useEffect } from 'react';
import { View, Text, FlatList, Platform, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import MyScheduleItem from '../components/MyScheduleItem';
import * as schedulesAction from '../store/action/schedules';

const MyScheduleScreen = (props) => {
   const dispatch = useDispatch()
   const schedules = useSelector(state => state.schedules.userSchedules);

   useEffect(() => {
     dispatch(schedulesAction.fetchMySchedules());
   }, [dispatch]);


   if (schedules.length === 0) {
    return ( 
      <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontFamily: 'open-sans-bold', fontSize: 40}}>
          <Text>No Schedules Found</Text>
        </View>
      </LinearGradient>
     ); 
  };

   return (
  <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
    <FlatList
      data={schedules}
      keyExtractor={item => item.schedulesId}
      renderItem={itemData => (
        <MyScheduleItem
          date={itemData.item.date}
          time={itemData.item.time}
          description={itemData.item.description}
        />       
      )}
    />
  </LinearGradient>
  );
};

MyScheduleScreen.navigationOptions = navData => {
  return {
  headerTitle: 'My Schedules',
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="Menu"
      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
      onPress={() => {
      navData.navigation.toggleDrawer();
      }}
    />
  </HeaderButtons>
  )
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

export default MyScheduleScreen;

