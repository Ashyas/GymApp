import  React,  { useEffect, useCallback } from 'react';
import { View, Text, FlatList, Platform, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import TipItem from '../components/TipItem';
import * as tipsAction from '../store/action/tips';

const TipsScreen = (props) => {
   const dispatch = useDispatch()
   const tips = useSelector(state => state.tips.availableTips);

   useEffect(() => {
     dispatch(tipsAction.fetchTips());
   }, [dispatch]);

   const submitHandler = useCallback(() => {
   props.navigation.navigate('AddTip');
  }, [dispatch]);
   
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);


   if (tips.length === 0) {
    return ( 
    <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontFamily: 'open-sans-bold', fontSize: 20}}>
        <Text>No Tips found, maybe start creating some</Text>
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
        <TipItem
          title={itemData.item.title}
          onDelete={() => {
            dispatch(tipsAction.deleteTip(itemData.item.tipId));
          }}
        />       
      )}
    />
  </LinearGradient>
  );
};

TipsScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
  headerTitle: 'All Tips',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="add"
        iconName={
          Platform.OS === 'android' ? 'md-add' : 'ios-add'
        }
        onPress={submitFn}
      />
    </HeaderButtons>
  ),
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

export default TipsScreen;

