import  React from 'react';
import { View, Text, Platform, StyleSheet, ScrollView, Image} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';

const AboutScreen = (props) => {


  return (
    <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
        <ScrollView>
            <View style={styles.topContainer}>
            <View style={styles.container}>
            <Text style={styles.description}>I am Roy, 24, a fitness trainer for about two years. 
            In the past I played basketball as a child up to the age of 18, and also have a basketball instructor 
            certificate and experience coaching kids teams. I have always been involved in sports and the world of fitness 
            and I am currently a personal trainer at the 'Ninja School' complex.</Text>

            </View>
          </View>
          <View style={styles.imageContainer}>
          <Image
              style={styles.image}
              source={require('../images/8778ccc3-3714-4214-9f24-bd84a135bed8.jpg')}
        />
          </View>
        </ScrollView>
    </LinearGradient>
      );
  };

AboutScreen.navigationOptions = navData => {
  return {
  headerTitle: 'About',
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
    borderRadius: 100,
    justifyContent:'center',
    width: 200,
    height: 200,
    resizeMode: 'stretch',
    marginTop: 30
  },
 actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
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
    marginTop: 30,
    fontFamily: 'open-sans',
    fontSize: 18,
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

export default AboutScreen;

