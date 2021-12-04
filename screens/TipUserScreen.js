import  React,  { useEffect, useCallback } from 'react';
import { View, Text, FlatList, Platform, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import TipItemUser from '../components/TipItemUser';
import * as tipsAction from '../store/action/tips';

const TipsUserScreen = (props) => {
   const dispatch = useDispatch()
   const tips = useSelector(state => state.tips.availableTips);

   useEffect(() => {
     dispatch(tipsAction.fetchTips());
   }, [dispatch]);

   if (tips.length === 0) {
    return ( 
    <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontFamily: 'open-sans-bold', fontSize: 20}}>
        <Text>No Tips found</Text>
      </View>
    </LinearGradient>
    );
  }

   return (
   <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
    <FlatList
      data={tips}
      keyExtractor={item => item.tipId}
      renderItem={itemData => (
        <TipItemUser
          title={itemData.item.title}
        />       
      )}
    />
  </LinearGradient>
  );
};

TipsUserScreen.navigationOptions = navData => {
  return {
  headerTitle: 'All Tips',
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

export default TipsUserScreen;

