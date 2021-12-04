import  React,  { useEffect } from 'react';
import { View, Text, Platform, StyleSheet, ScrollView, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import * as dietsAction from '../store/action/diets';

const MyDietScreen = (props) => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.users.loginUser);
  const userId = useSelector(state => state.auth.userId);
  const dietExists = useSelector(state =>state.diets.allDiets.find(diet => diet.userId === userId));

  useEffect(() => {
    dispatch(dietsAction.fetchDiets(userId));
  }, [dispatch,userId]);

  return (
    <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
        <ScrollView>
            <Text style={styles.title}>{loginUser.name}</Text>
            <View style={styles.topContainer}>
            <View style={styles.container}>
            <Text style={styles.description}><Text style={styles.title2}>Breakfast: </Text>{dietExists ? dietExists.breakfast : ''}</Text>
            <Text style={styles.description}><Text style={styles.title2}>Lunch: </Text>{dietExists ? dietExists.lunch : ''}</Text>
            <Text style={styles.description}><Text style={styles.title2}>Dinner: </Text>{dietExists ? dietExists.dinner : ''}</Text>
            <Text style={styles.description}><Text style={styles.title2}>Snacks: </Text>{dietExists ? dietExists.snacks : ''}</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
          <Image
              style={styles.image}
              source={{
                uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/healthy-diet-2184718-1830260.png',
          }}
        />
          </View>
        </ScrollView>
    </LinearGradient>
      );
  };

MyDietScreen.navigationOptions = navData => {
  return {
  headerTitle: 'My Diet',
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
  imageContainer: {
    justifyContent:'center',
    alignItems: 'center',
  },
  image: {
    justifyContent:'center',
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    marginTop: 30
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
    marginLeft: 40,
    marginLeft: 0
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 17,
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

export default MyDietScreen;

