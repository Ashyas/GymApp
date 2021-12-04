import  React,  { useEffect, useCallback } from 'react';
import { View, Text, FlatList, Platform, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import TrainingItem from '../components/TrainingItem';
import * as trainingsAction from '../store/action/trainings';

const TrainingScreen = (props) => {
   const dispatch = useDispatch()
   const userId = props.navigation.getParam('userId');
   const trainings = useSelector(state => state.trainings.userTrainings);

   useEffect(() => {
     dispatch(trainingsAction.fetchTrainings(userId));
   }, [dispatch]);

   const submitHandler = useCallback(() => {
   props.navigation.navigate('AddTraining', {userId: userId});
  }, [dispatch]);
   
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);


   if (trainings.length === 0) {
    return ( 
    <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontFamily: 'open-sans-bold', fontSize: 20}}>
        <Text>No trainings found, maybe start creating some</Text>
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
        <TrainingItem
          date={itemData.item.date}
          onViewDetail={() => {
            props.navigation.navigate('Exercise', {trainingId: itemData.item.trainingId, userId: itemData.item.userId });
          }}
          onDelete={() => {
            dispatch(trainingsAction.deleteTraining(itemData.item.trainingId));
          }}
        />       
      )}
    />
  </LinearGradient>
  );
};

TrainingScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
  headerTitle: 'All Trainings',
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

export default TrainingScreen;

