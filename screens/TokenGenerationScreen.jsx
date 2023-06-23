import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Clipboard } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import tw from 'tailwind-react-native-classnames';
import Menu from '../components/Menu';
import { SafeAreaView } from 'react-native-safe-area-context';

const TokenGenerationScreen = () => {
  const [amount, setAmount] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isValidToken, setIsValidToken] = useState(true);
  const handleAmountChange = (text) => {
    setAmount(text);
  };

  const handleMeterChange = (text) => {
    setMeterNumber(text);
  };
  const handleCopyToClipboard = () => {
    Clipboard.setString(token);
    Alert.alert('Copied to Clipboard', 'The token value has been copied to the clipboard');
  };
  //handle token generation
  const handleGenerateToken = async () => {
    if (!amount || !meterNumber) {
      setError('Fill in all fields');
      Alert.alert('Error', 'Please enter the amount and meter number');
      return;
    }

    try {
      const res = await axios.post('/token/generate', { amount, meterNumber });
      if(!res.data.success){
        setIsValidToken(false);
        Alert.alert(res.data.message);
        return;
      }
      setAmount('')
      setMeterNumber('');
      setToken(res.data.token.token)
    } catch (error) {
      console.error(error);
      setError('Failed to generate token');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16, marginTop: 20 }}>
        <Text style={[styles.generate, tw`text-center`]}>Generate Token</Text>
        {!isValidToken && <Text style={styles.error}>Invalid Token</Text>}
        <CustomInput value={meterNumber} onChange={handleMeterChange} keyboardType={'numeric'} placeholder={'Meter number'} />
        <CustomInput value={amount} onChange={handleAmountChange} keyboardType={'numeric'} placeholder={'Amount'} />
        <CustomButton text={'Generate Token'} bg={'#ff6f61'} color={'white'} onPress={handleGenerateToken} />
        {token && <Text style={styles.token}>Token Value: 
        <Text style={{color:"green",marginLeft:5}}>{token}</Text>
        <CustomButton text={'Copy to Clipboard'} bg={'gray'} color={'white'} onPress={handleCopyToClipboard} />
        </Text>}
      </View>
      <Menu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
  },
  generate: {
    fontSize: 22,
    color: 'gray',
  },
  tokenValue: {
    fontSize: 18,
    color: 'black',
  },
});

export default TokenGenerationScreen;
