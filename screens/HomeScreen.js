import  React,  { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground, LogBox } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/UI/HeaderButton';
import * as usersAction from '../store/action/users';

const HomeScreen = (props) => {
  const loginUser = useSelector(state => state.users.loginUser);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(usersAction.fetchUsers());
  }, [dispatch]);

  LogBox.ignoreAllLogs();

return (
        <View style={styles.container}>
          <ImageBackground source={{
                        uri: 'https://i.pinimg.com/originals/aa/a4/7a/aaa47ad4601719dad19d9fc212bdab9b.jpg',
                      }} style={styles.image}>
               <Text style={styles.text}>Welocme To GymApp</Text>
               <Text style={styles.text}>{loginUser.name}</Text>
          </ImageBackground>
      </View>
    );
}

HomeScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Home',
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
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});


export default HomeScreen;



