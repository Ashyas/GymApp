import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import * as videoActions from '../store/action/videos';
import ImagePicker from '../components/ImagePicker';

const AddVideoScreen = (props) => {
  const dispatch = useDispatch()
  const [titleValue, setTitleValue] =useState('')
  const [selectedImage, setSelectedImage] =useState('')

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const saveVideoHandler = () => {
    dispatch(videoActions.createVideo(titleValue, selectedImage));
    props.navigation.goBack(); 
  };
  
  const imageTakenHandler = ImagePath => {
      setSelectedImage(ImagePath);
  };


return (
  <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
    <ScrollView>
      <View style={styles.form}>
          <Text style={styles.label}>Name:</Text>
          <TextInput 
              style={styles.textInput} 
              onChangeText={titleChangeHandler} 
              value={titleValue}
          />
          <ImagePicker onImageTaken={imageTakenHandler} />
          <View style={styles.button}>
          <Button title="Save" color={Colors.primary} onPress={saveVideoHandler} />
          </View>
      </View> 
   </ScrollView>
  </LinearGradient>       
    );
}

AddVideoScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Add Video',
 };  
};

 const styles = StyleSheet.create({
    form: {
    margin:30,
    },
    label: {
      fontSize: 20,
      marginBottom: 15,
      justifyContent: 'center',
      marginRight: 30
     },
    textInput: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginBottom: 30,
      paddingVertical: 4,
      paddingHorizontal: 2
    },
    gradient: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      marginTop:10,
      width:'45%',
      marginLeft: 50
    }
  }
);

export default AddVideoScreen;

