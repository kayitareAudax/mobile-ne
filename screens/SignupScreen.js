import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import tw from 'tailwind-react-native-classnames';
import { API_URL } from '../utils/api';
import axios from 'axios';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nid, setNid] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (text) => {
    setNames(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const handleNidChange = (text) => {
    setNid(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleProceed = () => {
    if (!names || !email || !phone || !password) {
      Alert.alert('Error', 'Please provide all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password and Confirm Password must match');
      return;
    }

    setLoading(true);
    axios
      .post(API_URL + '/user/register', {
        names,
        phoneNumber: phone,
        email,
        password: password,
        reEnterPassword: confirmPassword,
        nationalID: nid,
      })
      .then((res) => {
        setLoading(false);
        if (res?.data?.message === 'user created successfully') {
          navigation.navigate('Login');
        } else {
          Alert.alert('Registration Failed', res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(
          err?.response?.data?.message === undefined
            ? 'Network Error'
            : err?.response?.data?.message
        );
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.text}>App Title</Text>
        <View style={styles.microcontainer}>
          <Text style={styles.subtitles}>Create account</Text>
        </View>
        <View style={styles.form}>
          <CustomInput
            value={names}
            placeholder="Full Name"
            keyBoardType="default"
            onChange={handleNameChange}
          />
          <CustomInput
            value={phone}
            placeholder="Phone Number"
            keyBoardType="numeric"
            onChange={handlePhoneChange}
          />
          <CustomInput
            value={email}
            placeholder="Your Email"
            keyBoardType="email-address"
            onChange={handleEmailChange}
          />
          <CustomInput
            value={nid}
            placeholder="National Id"
            keyBoardType="default"
            onChange={handleNidChange}
          />
          <CustomInput
            value={password}
            placeholder="Password"
            keyBoardType="default"
            HiddenText
            onChange={handlePasswordChange}
          />
          <CustomInput
            value={confirmPassword}
            placeholder="Confirm Password"
            keyBoardType="default"
            HiddenText
            onChange={handleConfirmPasswordChange}
          />
          <CustomButton
            text={loading ? 'Creating account...' : 'Signup'}
            onPress={handleProceed}
            bg="#ff6f61"
            color="white"
          />
          <Text style={[tw`text-right`,styles.loginText]}>
            Already have an account?{' '}
            <Text
              style={[tw`underline`, styles.loginLink]}
              onPress={() => navigation.navigate('Login')}
            >
              Signin
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#092468',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  subcontainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginTop: 80,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fc9403',
  },
  microcontainer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  subtitles: {
    color: '#222582',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  loginText: {
    // marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#ff6f61',
  },
});

export default SignupScreen;
