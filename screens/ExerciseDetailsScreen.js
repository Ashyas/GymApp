import  React,  { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import * as exercisesAction from '../store/action/exercises';

const ExerciseDetailsScreen = (props) => {
  const dispatch = useDispatch()
  const exerciseId = props.navigation.getParam('exerciseId');
  const exercises = useSelector(state => state.exercises.availableExercises.find(exercise => exercise.exerciseId === exerciseId));


  useEffect(() => {
    dispatch(exercisesAction.fetchExercises());
  }, [dispatch]);
  
  return (
  <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
    <ScrollView>
    <View style={styles.topContainer}>
          <View style={styles.container}>
        <Text style={styles.title}><Text>Exercise Name: </Text>{exercises ? exercises.exerciseName : ''}</Text>
        <Text style={styles.description}><Text style={styles.title2}>Sets Number:  </Text>{exercises ? exercises.setsNumber : ''}</Text>
        <Text style={styles.description}><Text style={styles.title2}>Repetitions Number: </Text>{exercises ? exercises.repetitionsNumber : ''}</Text>
        <Text style={styles.description}><Text style={styles.title2}>Weight: </Text>{exercises ? exercises.weight : ''}</Text>
      </View>
    </View>
    <View style={styles.imageContainer}>
          <Image
              style={styles.image}
              source={{
                uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/gym-2279454-1900759.png',
          }}
        />
          </View>
    </ScrollView>
  </LinearGradient>
  );
};

ExerciseDetailsScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Exercise Details',
 };  
};

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',    
    justifyContent: 'center'
  },
  imageContainer: {
    justifyContent:'center',
    alignItems: 'center',
  },
  image: {
    justifyContent:'center',
    width: 180,
    height: 180,
    resizeMode: 'stretch',
    marginTop: 30
  },
 actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
 title: {
    fontFamily: 'open-sans-bold',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 40
  },
  title2: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 1,
    marginBottom: 20,
    marginLeft: 40,
    marginLeft: 0
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 23,
    padding: 2,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ExerciseDetailsScreen;



