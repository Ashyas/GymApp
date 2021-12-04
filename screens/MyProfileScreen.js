import  React,  { useEffect } from 'react';
import { View, Text, Platform, StyleSheet, ScrollView, Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import * as usersAction from '../store/action/users';
import Colors from '../constants/Colors';

const MyProfileScreen = (props) => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.users.loginUser);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
   dispatch(usersAction.fetchUsers());
 }, [dispatch]);
 
return (
  <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
      <ScrollView>
          <Text style={styles.title}>{loginUser.name}</Text>
          <View style={styles.topContainer}>
          <View style={styles.container}>
          <Text style={styles.description}><Text style={styles.title2}>Phone:  </Text>{loginUser.phone}</Text>
          <Text style={styles.description}><Text style={styles.title2}>Age:  </Text>{loginUser.age}</Text>
          <Text style={styles.description}><Text style={styles.title2}>Weight:  </Text>{loginUser.weight}</Text>
          <Text style={styles.description}><Text style={styles.title2}>Height:  </Text>{loginUser.height}</Text>
          <Text style={styles.description}><Text style={styles.title2}>BMI:  </Text>{loginUser.BMI}</Text>
          <Text style={styles.description}><Text style={styles.title2}>Scope:  </Text>{loginUser.scope}</Text>
          <Text style={styles.description}><Text style={styles.title2}>Fat:  </Text>{loginUser.fat}</Text>
          </View>
          <View style={styles.actions}>
            <Button color={Colors.primary} title="Edit Details" onPress={() => { props.navigation.navigate('EditUser', {userId: userId})} } />
          </View>
        </View>
    </ScrollView>
  </LinearGradient>

    );
};

MyProfileScreen.navigationOptions = navData => {
  return {
  headerTitle: 'My Profile',
  headerLeft: () => (
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
  topContainer: {
    alignItems: 'center',    
    justifyContent: 'center'
  },
 actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
 title: {
    fontFamily: 'open-sans-bold',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginVertical: 20
  },
  title2: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 1,
    marginBottom: 20,
    marginLeft: 20
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 20,
    padding: 2,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default MyProfileScreen;

