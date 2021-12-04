import  React, { useState, useEffect, useCallback  } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/UI/HeaderButton';
import * as tipsAction from '../store/action/tips';

const AddTipScreen = (props) => {

  const dispatch = useDispatch()
  const [tipName, setTipName] = useState('');


  const submitHandler = useCallback(() => {
    dispatch(tipsAction.createTip(tipName));
    dispatch(tipsAction.fetchTips());
    props.navigation.goBack();
  }, [dispatch,tipName]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

    return (
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>New Tip</Text>
              <TextInput 
                  style={styles.input} 
                  value={tipName} 
                  onChangeText={text => setTipName(text)}
              />
            </View>
          </View>  
        </ScrollView>
      );
    };

AddTipScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
    return {
      headerTitle: 'Add Tip',
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

export default AddTipScreen;

