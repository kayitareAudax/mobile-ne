import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import CarRegistrationScreen from './screens/CarRegistrationScreen';
import axios from 'axios';

const Stack = createStackNavigator();

const App = () => {
  axios.defaults.baseURL='http://192.168.0.15:5000'
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CarRegistration" component={CarRegistrationScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;