import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePassChange = (text) => {
    setPassword(text);
  };

  const handleProceedLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      // Simulating login process
      // Replace with your actual login logic using API requests
      const resp=await axios.post("/auth/login",{email,password});
      if(!resp.data.success){
        Alert.alert(resp.data.message);
        return;
      }
      const token=resp.data.message;
      await SecureStore.setItemAsync("token",token);
        setLoading(false);
        navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      Alert.alert('Login Failed', error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>App Logo</Text>
      </View>
      <View style={styles.formContainer}>
        <CustomInput
          value={email}
          placeholder="Your Email"
          icon="mail"
          keyBoardType="email-address"
          onChange={handleEmailChange}
        />
        <CustomInput
          value={password}
          placeholder="Password"
          icon="lock"
          keyBoardType="password"
          HiddenText
          onChange={handlePassChange}
        />
        <CustomButton
          text={loading ? 'Signing in ...' : 'Sign in'}
          onPress={handleProceedLogin}
          bg="#ff6f61"
          color="white"
        />
        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('Signup')}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 50,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    width: '80%',
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#ff6f61',
  },
});

export default LoginScreen;
