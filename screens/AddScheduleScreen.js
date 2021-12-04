import  React, { useState, useEffect, useCallback  } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import HeaderButton from '../components/UI/HeaderButton';
import * as SchedulesAction from '../store/action/schedules';

const AddScheduleScreen = (props) => { 
  const dispatch = useDispatch()
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const userId = props.navigation.getParam('userId');

  const submitHandler = useCallback(() => {
    dispatch(SchedulesAction.createSchedule(userId, date, time, description));
    props.navigation.goBack();
  }, [dispatch,userId, date, time, description]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);


  return (
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Date</Text>
            <DatePicker
            style={styles.datePickerStyle}
            date={date} 
            mode="date" 
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
          </View>
          <View style={styles.formControl}>
              <Text style={styles.label}>Time</Text>
              <TextInput 
                  style={styles.input} 
                  value={time}
                  onChangeText={text => setTime(text)}
                />
          </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Description</Text>
              <TextInput 
                  style={styles.input} 
                  value={description} 
                  onChangeText={text => setDescription(text)}
              />
          </View>

        </View>  
      </ScrollView>
    );
  };

AddScheduleScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
    return {
      headerTitle: 'Add Schedule',
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

export default AddScheduleScreen;

