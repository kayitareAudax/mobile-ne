import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';
import { useNavigation, useRoute } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;

  // Function to check if the current screen matches the provided screen name
  const isCurrentScreen = (screenName) => {
    return current === screenName;
  };

  return (
    <View style={[tw`bg-white flex-row justify-around items-center h-16 mt-2 rounded-t-3xl mx-2`]}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={tw`flex items-center justify-center`}>
        <Icon name="home" size={26} color={isCurrentScreen('Home') ? '#ff6f61' : 'black'} />
        <Text style={isCurrentScreen('Home') ? { color: '#ff6f61' } : null}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CarRegistration')} style={tw`flex items-center justify-center`}>
        <Icon name="car" size={22} color={isCurrentScreen('CarRegistration') ? '#ff6f61' : 'black'} />
        <Text style={isCurrentScreen('CarRegistration') ? { color: '#ff6f61' } : null}>Vehicles</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('History')} style={tw`flex items-center justify-center`}>
        <Icon name="history" size={24} color={isCurrentScreen('History') ? '#ff6f61' : 'black'} />
        <Text style={isCurrentScreen('History') ? { color: '#ff6f61' } : null}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex items-center justify-center`}>
        <Icon name="user" size={24} color={isCurrentScreen('Profile') ? '#ff6f61' : 'black'} />
        <Text style={isCurrentScreen('Profile') ? { color: '#ff6f61' } : null}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
