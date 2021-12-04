import  React , { useEffect} from 'react';
import { View} from 'react-native';
 
const LogoutScreen = (props) => {

useEffect(() => {
    props.navigation.navigate('Login');
    },);

return (
      <View/>     
    );
}
export default LogoutScreen;

