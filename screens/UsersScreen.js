import  React,  { useEffect } from 'react';
import { FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import UserItem from '../components/UserItem';
import HeaderButton from '../components/UI/HeaderButton';
import * as usersAction from '../store/action/users';
import Colors from '../constants/Colors';

const UsersScreen = (props) => {
   const dispatch = useDispatch()

   useEffect(() => {
    dispatch(usersAction.fetchUsers());
  }, [dispatch]);

   const users = useSelector(state => state.users.availableUsers);
   return (
  <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
      <Button
          color={Colors.primary}
          title="Tips Screen"
          onPress={()=>{props.navigation.navigate('Tips')}}
        />
    <FlatList
      data={users}
      keyExtractor={item => item.userId}
      renderItem={itemData => (
        <UserItem
          name={itemData.item.name}
          onSchedule={() => {
            props.navigation.navigate('Schedule', {userId: itemData.item.userId});
          }}
          onEdit={() => {
            props.navigation.navigate('EditUser', {userId: itemData.item.userId});
          }}
          onEditDiet={() => {
            props.navigation.navigate('EditDiet', {userId: itemData.item.userId});
          }}
          onEditTraining={() => {
            props.navigation.navigate('Training', {userId: itemData.item.userId});
          }}
          onDelete={() => {
            dispatch(usersAction.deleteUser(itemData.item.userId));
          }}
        />       
      )}
    />
  </LinearGradient>
  );
};

UsersScreen.navigationOptions = navData => {
  return {
  headerTitle: 'All Users',
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
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default UsersScreen;

