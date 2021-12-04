import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';

const VideoDetailScreen = props => {
  const videoId = props.navigation.getParam('videoId');
  const selectedVideo = useSelector(state =>state.videos.availableVideos.find(video => video.videoId === videoId));
  console.log(selectedVideo)
  return (
  <LinearGradient colors={['#D03B29','#FEFEDF']} style={styles.gradient}> 
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedVideo.videoUri }} style={styles.image} />
      <View style={styles.locationContainer}>
      </View>
    </ScrollView>
  </LinearGradient>
  );
};

VideoDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('videoTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  

});

export default VideoDetailScreen;
