import  React , { useEffect} from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import VideoItem from '../components/VideoItem';
import Colors from '../constants/Colors';
import * as videoActions from '../store/action/videos';

const VideoScreen = (props) => {
  const videos = useSelector(state => state.videos.availableVideos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(videoActions.fetchVideos());
  }, [dispatch]);

return (
  <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
    <FlatList
      data={videos}
      keyExtractor={item => item.videoId}
      renderItem={itemData => (
        <VideoItem
          video={itemData.item.videoUri}
          title={itemData.item.title}
          onSelect={() => {
            props.navigation.navigate('VideoDetail', {
              videoTitle: itemData.item.title,
              videoId: itemData.item.videoId
            });
          }}
        />
      )}
    />
    </LinearGradient>
    );
}

VideoScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Video',
  headerRight: (
    <TouchableOpacity style={styles.headerButton}  onPress={()=>{navData.navigation.navigate('AddVideo')}}>
    <Text style={styles.headerButtonText}>Add </Text>
    </TouchableOpacity>
    
      ),
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
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Colors.primary
  }
});

export default VideoScreen;



