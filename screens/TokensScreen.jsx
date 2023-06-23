import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Menu from '../components/Menu';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
const TokensScreen = () => {
  const [meterNumber, setMeterNumber] = useState(null);
  const [data, setData] = useState([]);
  const [started,setStarted]=useState(false);

  const handleMeterChange = (text) => {
    setMeterNumber(text);
  };
  const calculateExpiryDate = (purchasedDate, tokenValueDays) => {
    const expiryDate = new Date(purchasedDate);
    expiryDate.setDate(expiryDate.getDate() + tokenValueDays);
    return expiryDate.toLocaleDateString();
  };
  const handleSearch = async () => {
    setStarted(true)
    if(!meterNumber){
        Alert.alert("Enter meter number");
        return;
    }
    if(meterNumber.length<6){
        Alert.alert("Enter meter number of 6 digits")
    }
    const res = await axios.post('/token/getTokensByMeter', { meterNumber });
    console.log(res.data);
    setData(res.data.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>See All Generated Tokens by Meter</Text>
        <Text style={tw`text-center mt-2`}>Enter the meter number to see all tokens</Text>
        <CustomInput placeholder="Meter number" keyboardType="numeric" value={meterNumber} onChange={handleMeterChange} />
        <CustomButton text="Search Tokens" bg="#ff6f61" color="white" onPress={handleSearch} />
      </View>
      <View style={styles.tokenContainer}>
        {started && data && data.length > 0 ? (
            <>
        <Text style={styles.tokenTitle}>Generated Tokens</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.tokenItem}>
                <View style={styles.tokenInfo}>
                  <Text style={styles.tokenText}>Meter Number: {item.meterNumber}</Text>
                  <Text style={styles.tokenText}>Number of Days: 
                  <Text style={{color:"green",marginLeft:7}}>{item.token_value_days}</Text>
                  </Text>
                  <Text style={styles.tokenText}>Purchased Date: {new Date(item.purchasedDate).toLocaleDateString()}</Text>
                  <Text style={styles.tokenText}>
                  Expiry Date: <Text style={{color:"red",fontWeight:"bold"}}>{calculateExpiryDate(item.purchasedDate, item.token_value_days)}</Text>
                </Text>
                  <Text style={[tw`text-right`,styles.tokenAmount]}>{item.amount} Rwf</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
        ) : (
          <Text style={styles.noTokensText}>No tokens found</Text>
        )
        }
      </View>
      <Menu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
  tokenContainer: {
    flex: 1,
    padding: 20,
  },
  tokenTitle: {
    color: '#092468',
    fontSize: 20,
    marginTop: 40,
    marginLeft: 35,
    marginBottom: 10,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F8F8FB',
  },
  tokenInfo: {
    flex: 1,
  },
  tokenText: {
    marginTop: 5,
  },
  tokenAmount: {
    color: '#ff6f61',
    fontWeight: 'bold',
  },
  noTokensText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default TokensScreen;
