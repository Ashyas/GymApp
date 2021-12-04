import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform,KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as usersAction from '../store/action/users';
import HeaderButton from '../components/UI/HeaderButton';

const EditUsersScreen = (props) => {
  const dispatch = useDispatch()
  const userId = props.navigation.getParam('userId');
  const userExists = useSelector(state =>
    state.users.availableUsers.find(user => user.userId === userId)
  );

  useEffect(() => {
   dispatch(usersAction.fetchUsers());
 }, [dispatch]);
 
  const [name,setName] = useState(userExists ? userExists.name : '');
  const [phone,setPhone] = useState(userExists ? userExists.phone : '');
  const [age,setAge] = useState(userExists ? userExists.age : '');
  const [weight,setWeight] = useState(userExists ? userExists.weight : '');
  const [height,setHeight] = useState(userExists ? userExists.height : '');
  const [BMI,setBMI] = useState(userExists ? userExists.BMI : '');
  const [scope,setScope] = useState(userExists ? userExists.scope : '');
  const [fat,setFat] = useState(userExists ? userExists.fat : '');

  const submitHandler = useCallback(() => {
    dispatch(usersAction.updateUser(userId ,name, phone, age, weight, height, BMI, scope, fat));
    dispatch(usersAction.fetchUsers());
    props.navigation.goBack();
  }, [dispatch,userId ,name, phone, age, weight, height, BMI, scope, fat]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
  <KeyboardAvoidingView style={{ flex: 1 }} behavior="height'">  
    <ScrollView>
      <View style={styles.form}>      
        <View style={styles.formControl}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={text => setPhone(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={text => setAge(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={text => setWeight(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Height</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={text => setHeight(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>BMI</Text>
          <TextInput
            style={styles.input}
            value={BMI}
            onChangeText={text => setBMI(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Scope</Text>
          <TextInput
            style={styles.input}
            value={scope}
            onChangeText={text => setScope(text)}
            autoCapitalize='sentences'
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Fat</Text>
          <TextInput
            style={styles.input}
            value={fat}
            onChangeText={text => setFat(text)}
            autoCapitalize='sentences'
          />
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
};

EditUsersScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: 'Edit User',
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

export default EditUsersScreen;

