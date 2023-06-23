
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native';

const CustomInput = ({ placeholder, icon, keyBoardType, value, HiddenText, onChange }) => {
  const [error, setError] = useState('');
  // if (keyBoardType == 'password') {
  //   if (!value) {
  //     setError("Please fill in the field")
  //   }
  //   if (value.length() < 6) {
  //     setError("Password of 6 characters required")
  //   }
  // }
  return (
    <View style={styles.container}>
      {icon && <AntDesign name={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyBoardType != null ? keyBoardType : 'numeric'}
        secureTextEntry={HiddenText != null ? true : false}
        value={value}
        onChangeText={value => onChange(value)}
      />
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  error: {
    color: '#FF5353',
    fontSize: 18,
    fontWeight: "500"
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },

  input: {
    flex: 1,
    paddingVertical: 8,
  },

});

export default CustomInput;