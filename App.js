import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import axios from 'axios';
import TokenGenerationScreen from './screens/TokenGenerationScreen';
import TokenValidationScreen from './screens/TokenValidationScreen';
import TokensScreen from './screens/TokensScreen';

const Stack = createStackNavigator();

const App = () => {
  axios.defaults.baseURL='http://192.168.8.131:5000'
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Token' component={TokenGenerationScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Validate' component={TokenValidationScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Tokens' component={TokensScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;