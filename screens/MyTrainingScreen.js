import  React,  { useEffect } from 'react';
import { View, Text, FlatList, Platform, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import MyTrainingItem from '../components/MyTrainingItem';
import * as trainingsAction from '../store/action/trainings';

const MyTrainingScreen = (props) => {
   const dispatch = useDispatch()
   const trainings = useSelector(state => state.trainings.userTrainings);

   useEffect(() => {
     dispatch(trainingsAction.fetchMyTrainings());
   }, [dispatch]);

   if (trainings.length === 0) {
    return ( 
      <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontFamily: 'open-sans-bold', fontSize: 20}}>
          <Text>No Training Found</Text>
        </View>
      </LinearGradient>
    );
  }

   return (
  <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
    <FlatList
      data={trainings}
      keyExtractor={item => item.trainingId}
      renderItem={itemData => (
        <MyTrainingItem
          date={itemData.item.date}
          onViewDetail={() => {
            props.navigation.navigate('MyExercise', {trainingId: itemData.item.trainingId, userId: itemData.item.userId });
          }}
        />       
      )}
    />
   </LinearGradient>
  );
};

MyTrainingScreen.navigationOptions = navData => {
  return {
  headerTitle: 'My Training',
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

export default MyTrainingScreen;

