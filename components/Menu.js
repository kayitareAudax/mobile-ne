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
      <TouchableOpacity onPress={() => navigation.navigate('Token')} style={tw`flex items-center justify-center`}>
        <Icon name="plus" size={26} color={isCurrentScreen('Token') ? '#ff6f61' : 'black'} />
        <Text style={isCurrentScreen('Token') ? { color: '#ff6f61' } : null}>Generate</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Validate')} style={tw`flex items-center justify-center`}>
        <Icon name="lock" size={22} color={isCurrentScreen('Validate') ? '#ff6f61' : 'black'} />
        <Text style={isCurrentScreen('Validate') ? { color: '#ff6f61' } : null}>Validate</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Tokens')} style={tw`flex items-center justify-center`}>
        <Icon name="history" size={24} color={isCurrentScreen('Tokens') ? '#ff6f61' : 'black'} />
        <Text style={isCurrentScreen('Tokens') ? { color: '#ff6f61' } : null}>History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
