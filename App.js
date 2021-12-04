import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';

import AppNavigator from '../gymapp/navigation/AppNavigator';
import authReducer from './store/reducer/auth';
import usersReducer from './store/reducer/users';
import messagesReducer from './store/reducer/messages';
import dietsReducer from './store/reducer/diets';
import exercisesReducer from './store/reducer/exercises';
import trainingsReducer from './store/reducer/trainings';
import scheduleReducer from './store/reducer/schedules';
import tipsReducer from './store/reducer/tips';
import videosReducer from './store/reducer/videos';

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  messages: messagesReducer,
  diets: dietsReducer,
  exercises: exercisesReducer,
  trainings: trainingsReducer,
  schedules: scheduleReducer,
  tips: tipsReducer,
  videos: videosReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    ...Ionicons.font,
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
 const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {setFontLoaded(true); }}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}
