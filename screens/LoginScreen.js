import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert, LogBox } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';
import * as authActions from '../store/action/auth';

LogBox.ignoreAllLogs();

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};  


const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
        await dispatch(action);
        props.navigation.navigate('Home');
    } catch (err) {
        setError(err.message);
        setIsLoading(false);
    }
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

useEffect(() => {
    if(error) {
        Alert.alert('Error', error, [{text:'Okey'}])
    }
},[
    error
])

return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
     <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}>
      <Card style={styles.loginContainer}>
        <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                  <ActivityIndicator size='small' color={Colors.primary}/>
                  ) : (
                  <Button
                     title={isSignup ? 'Sign Up' : 'Login'}
                     color={Colors.primary}
                     onPress={authHandler}
                     style={styles.buttonStyle}
                 />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {setIsSignup(prevState => !prevState);}}
                style={styles.buttonStyle}
              />
            </View>
        </ScrollView>
      </Card>
     </LinearGradient>
    </KeyboardAvoidingView>

    );
}


LoginScreen.navigationOptions = {
  headerTitle: 'Login'
};

 const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loginContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 15
  },
 }
);

export default LoginScreen;

