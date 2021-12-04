import  React,  { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Platform, TextInput, Button, ScrollView , FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';
import MessageItem from '../components/MessageItem';
import * as messagesAction from '../store/action/messages';

const ChatScreen = (props) => {

  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  const messages = useSelector(state => state.messages.allMessages);
  const userId = useSelector(state => state.auth.userId);
  const loginUser = useSelector(state => state.users.loginUser);
  const d = new Date();
  const date = d.toLocaleTimeString();
  const name = loginUser.name

  useEffect(() => {
   dispatch(messagesAction.fetchMessages());
 }, [dispatch]);

 const submitHandler = useCallback(() => {
  dispatch(messagesAction.sendMessage(userId,name,date,message));
  dispatch(messagesAction.fetchMessages());
}, [dispatch,userId,name,date,message]);

return (
<LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
 <View style={styles.screen}>
  <ScrollView contentContainerStyle={styles.messages}>
   <FlatList
     data={messages}
     keyExtractor={item => item.messageId}
     renderItem={itemData => (
     <MessageItem
       name={itemData.item.name}
       date={itemData.item.date}
       message={itemData.item.message}
     />   
     )}
   /> 
  </ScrollView>
      <View style={styles.footer}>
        <View style={styles.formControl}>
           <TextInput 
              placeholder={"New Message"}
              style={styles.input} 
              value={message} 
              onChangeText={text => setMessage(text)}
              multiline={true}
              blurOnSubmit={true}

           />
           <View style={styles.button}>
             <Button
              color={Colors.primary}
              title="SEND"
              onPress={submitHandler}
              />
           </View> 
        </View>
      </View>  
    </View>
  </LinearGradient>
 );
};



ChatScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Chat',
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
  screen: {
    alignItems: 'center',    
    justifyContent: 'center',
    height: 600
   },
  messages: {
    height: 550
   },
  footer: {
    flexDirection:'column',
    justifyContent:'flex-end',
    position: 'absolute',
    bottom: 0,
    height: 40
  },
  formControl: {
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: 340
  },
  button: {
    width: 70
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
 }
);

export default ChatScreen;


