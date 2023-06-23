import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import tw from 'tailwind-react-native-classnames';
import Menu from '../components/Menu';

const TokenValidationScreen = () => {
  const [tokenValue, setTokenValue] = useState('');
  const [data, setData] = useState('');
  const [purchasedDate,setPurchasedDate]=useState('');
  
  const handleTokenValidation = async () => {
    if (!tokenValue) {
      Alert.alert('Error', 'Please enter the token value');
      return;
    }
    try {
      const response = await axios.post('/token/validate', { token:tokenValue });
      if(!response.data.success){
        Alert.alert("Error",response.data.message);
        return;
      }
      setData(response.data.data)
      setPurchasedDate(response.data.purchased);
      setTokenValue('');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Token validation failed');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16, marginTop: 20 }}>
        <Text style={[styles.validate, tw`text-center`]}>Validate Token</Text>
        <CustomInput
        value={tokenValue}
        onChange={setTokenValue}
        placeholder="Token Value"
        keyboardType="numeric"
      />
      <CustomButton
        text="Validate Token"
        bg="#ff6f61"
        color="white"
        onPress={handleTokenValidation}
      />
        {/* Your input and button components */}
        {data && (
          <View style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <View style={styles.daysCont}>
            {/* Your text components */}
            <Text>Number of days to use it: </Text>
            <Text style={{color:"green",fontSize:22}}>{data}</Text>
          </View>
          </View>
        )}
      </View>
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  validate: {
    fontSize: 22,
    color: 'gray',
  },
  daysCont:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  days:{
    fontSize:21,
    color:"green"
  },
  valid: {
    fontSize: 18,
    color: 'green',
  },
  invalid: {
    fontSize: 18,
    color: 'red',
  },
});

export default TokenValidationScreen;
