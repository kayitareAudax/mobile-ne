import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView,TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import tw from 'tailwind-react-native-classnames';
import { API_URL, getConfig } from '../utils/api';
import axios from 'axios';
import Menu from '../components/Menu';

const CarRegistrationScreen = () => {
  //form input states
  const [modelName, setModelName] = useState('');
  const [price, setPrice] = useState('');
  const [owner, setOwner] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [manufactureCompany, setManufactureCompany] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);  //loading state with initial state set to false

  useEffect(() => {
    getPermission();
  }, []);

  // Request permission to access the photo library
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to the photo library');
    }
  };

  //handle input change
  const handleModelNameChange = (text) => {
    setModelName(text);
  };

  const handlePriceChange = (text) => {
    setPrice(text);
  };

  const handleOwnerChange = (text) => {
    setOwner(text);
  };

  const handleYearChange = (text) => {
    setYear(text);
  };

  const handleCompanyChange = (text) => {
    setCompany(text);
  };

   // Handle photo upload
  const handlePhotoUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    //if there is a photo url found in the assets array
    if (!result.canceled && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };
  
  // Handle car registration
  const handleProceed = async () => {
    if (!modelName || !price || !company || !owner || !year || !photo) {
      Alert.alert('Error', 'Please provide all fields and upload a photo');
      return;
    }
  
    const config = await getConfig();
  
    setLoading(true);
  
    const formData = new FormData();
    //append all field values to the form data
    formData.append('photo', {
      uri: photo,
      name: 'photo',
      type: 'image/*',
    });
  
    formData.append('manufactureCompany', company);
    formData.append('manufactureYear', year);
    formData.append('price', price);
    formData.append('modelName', modelName);
    formData.append('owner', "648c1f44eacf8653b61635e4");
  
    axios
      .post(API_URL + '/vehicle', formData, {
        headers: {
          ...config,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setLoading(false);
        if (res?.data?.message === 'Vehicle registered successfully') {
          setModelName('');
          setPrice('');
          setOwner('');
          setYear('');
          setCompany('');
          setPhoto(null);
          Alert.alert('Success', res?.data?.message);
        } else {
          Alert.alert('Error', res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, 'catch err');
        alert(
          err?.response?.data?.message === undefined ? 'Network Error' : err?.response?.data?.message
        );
      });
  };
  

  // const handleProceed = async () => {
  //   // check if any of the field is empty
  //   if (!modelName || !price || !company || !owner || !year || !photo) {
  //     Alert.alert('Error', 'Please provide all fields and upload a photo');
  //     return;
  //   }

  //   const config = await getConfig(); // retrieving token

  //   setLoading(true);
  //   axios
  //     .post(
  //       API_URL + '/vehicle',
  //       {
  //         photo,
  //         manufactureCompany: company,
  //         manufactureYear: year,
  //         price,
  //         modelName,
  //         owner: "648c1f44eacf8653b61635e4",
  //       },
  //       config
  //     )
  //     .then((res) => {
  //       setLoading(false);
  //       if (res?.data?.message === 'Vehicle registered successfully') {
  //         setModelName('');
  //         setPrice('');
  //         setOwner('');
  //         setYear('');
  //         setCompany('');
  //         setPhoto(null);
  //         Alert.alert('Success', res?.data?.message);
  //       } else {
  //         Alert.alert('Error', res?.data?.message);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err, 'catch err');
  //       alert(
  //         err?.response?.data?.message === undefined ? 'Network Error' : err?.response?.data?.message
  //       );
  //     });
  // };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <ScrollView style={tw`flex-1`}>
        <View style={styles.content}>
          <View style={styles.minicontainer}>
            <Text style={styles.text}>App Title</Text>
            <View style={styles.microcontainer}>
              <Text style={styles.subtitles}>Car Registration</Text>
            </View>
            <View style={[styles.container,{width:'100%'}]}>
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={modelName}
        onChangeText={setModelName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Owner"
        value={owner}
        onChangeText={setOwner}
      />
      <TextInput
        style={styles.input}
        placeholder="Manufacture Year"
        value={manufactureYear}
        onChangeText={setManufactureYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={manufactureCompany}
        onChangeText={setManufactureCompany}
      />
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
    {/* </View> */}

              {/* <CustomButton
                text="Upload Photo"
                onPress={handlePhotoUpload}
                // bg="#092468"
                color="gray"
                border="border border-gray-400"
              /> */}
              {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}
              <CustomButton
                text={loading ? 'Registering car ...' : 'Register Car'}
                onPress={handleProceed}
                bg="#FF5353"
                color="white"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.menuContainer}>
        <Menu />
      </View>
      </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  menuContainer: {
    width: '100%',
  },
  minicontainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  microcontainer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  text: {
    fontSize: 30,
    fontWeight: '900',
    marginTop: 15,
  },
  subtitles: {
    color: '#222582',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    width: '95%',
    padding: 20,
    paddingLeft: 10
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderRadius:5,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default CarRegistrationScreen;
