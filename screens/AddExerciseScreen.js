import  React, { useState, useEffect, useCallback  } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/UI/HeaderButton';
import * as exerciseAction from '../store/action/exercises';

const AddExerciseScreen = (props) => {

  const dispatch = useDispatch()
  const trainingId = props.navigation.getParam('trainingId');
  const userId = props.navigation.getParam('userId');
  const [exerciseName, setExerciseName] = useState('');
  const [setsNumber, setSetsNumber] = useState('');
  const [repetitionsNumber, setRepetitionsNumber] = useState('');
  const [weight, setWeight] = useState('');

  const submitHandler = useCallback(() => {
    dispatch(exerciseAction.createExercise(trainingId, userId , exerciseName, setsNumber, repetitionsNumber, weight));
    dispatch(exerciseAction.fetchExercises());
    props.navigation.goBack();
  }, [dispatch,trainingId, userId, exerciseName, setsNumber, repetitionsNumber, weight]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

    return (
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Exercise Name</Text>
              <TextInput 
                  style={styles.input} 
                  value={exerciseName} 
                  onChangeText={text => setExerciseName(text)}
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Sets Number</Text>
              <TextInput 
                  style={styles.input} 
                  value={setsNumber} 
                  onChangeText={text => setSetsNumber(text)}
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Repetitions Number</Text>
              <TextInput 
                  style={styles.input} 
                  value={repetitionsNumber} 
                  onChangeText={text => setRepetitionsNumber(text)}
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Weight</Text>
              <TextInput 
                  style={styles.input} 
                  value={weight} 
                  onChangeText={text => setWeight(text)}
              />
            </View>
          </View>  
        </ScrollView>
      );
    };

  AddExerciseScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
    return {
      headerTitle: 'Add Exercise',
      headerRight: (
       <HeaderButtons HeaderButtonComponent={HeaderButton}>
       <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn} 
        />
      </HeaderButtons>
    )
  };
};

 const styles = StyleSheet.create({
    form: {
      margin: 20
    },
    formControl: {
      width: '100%'
    },
    label: {
      marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    },
  });

export default AddExerciseScreen;

