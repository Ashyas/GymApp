import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as dietsAction from '../store/action/diets';
import HeaderButton from '../components/UI/HeaderButton';

const EditDietScreen = (props) => {
  const dispatch = useDispatch()
  const userId = props.navigation.getParam('userId');
  const dietExists = useSelector(state => state.diets.allDiets.find(diet => diet.userId === userId));
  const currentUser = useSelector(state => state.users.availableUsers.find(user => user.userId === userId));

  useEffect(() => {
   dispatch(dietsAction.fetchDiets());
 }, [dispatch]);
 
  const [breakfast,setBreakfast] = useState(dietExists ? dietExists.breakfast : '');
  const [lunch,setLunch] = useState(dietExists ? dietExists.lunch : '');
  const [dinner,setDinner] = useState(dietExists ? dietExists.dinner : '');
  const [snacks,setSnacks] = useState(dietExists ? dietExists.snacks : '');
  const [dietId] = useState(dietExists ? dietExists.dietId : '');

  const submitHandler = useCallback(() => {
    if (dietExists) {
    dispatch(dietsAction.updateDiet(dietId, userId, breakfast, lunch, dinner, snacks));
    }
    else {
    dispatch(dietsAction.createDiet(userId,breakfast, lunch, dinner, snacks));
    }
    dispatch(dietsAction.fetchDiets(userId));
    props.navigation.goBack();
  }, [dispatch,dietId, userId, breakfast,lunch,dinner,snacks]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);


  return (
  <KeyboardAvoidingView style={{ flex: 1 }} behavior="height'">  
    <ScrollView>
      <View style={styles.form}>      
        <View style={styles.formControl}>
          <Text style={styles.label}>Name: {currentUser.name}</Text>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Breakfast</Text>
          <TextInput
            style={styles.input}
            value={breakfast}
            onChangeText={text => setBreakfast(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Lunch</Text>
          <TextInput
            style={styles.input}
            value={lunch}
            onChangeText={text => setLunch(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Dinner</Text>
          <TextInput
            style={styles.input}
            value={dinner}
            onChangeText={text => setDinner(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Snacks</Text>
          <TextInput
            style={styles.input}
            value={snacks}
            onChangeText={text => setSnacks(text)}
            autoCapitalize='sentences'
          />
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
};

EditDietScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: 'Edit Diet',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
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
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
});

export default EditDietScreen;

