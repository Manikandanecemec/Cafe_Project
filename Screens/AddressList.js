import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {icon} from '../Constant';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressList = ({navigation}) => {
  const [status, setstatus] = useState('Home');
  const [Adressdata, setAdressdata] = useState('');
  const isFocused = useIsFocused();
  const usergetdata = auth().currentUser;
  const [addressId, setaddressId] = useState('');

  useEffect(
    () => {
      getAddressList();
      console.log('useeffect:' + addressId);
    },
    [isFocused],
    Adressdata,
  );

  const getAddressList = async () => {
    const addressIdA = await AsyncStorage.getItem('ADDRESS');
    setaddressId(addressIdA);
    const userId = usergetdata.uid;
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    // setAdressdata(tempDart);
    // console.log(tempDart);
    // tempDart.map(item => {
    //   if (item.addressId == addressId) {
    //     item.selected = true;
    //   } else {
    //     item.selected = false;
    //   }
    // });
    setAdressdata(tempDart);
  };

  const saveDeafultAddress = async item => {
    // console.log(item.addressId);
    await AsyncStorage.setItem('ADDRESS', item.addressId);
    let tempDart = [];
    tempDart = Adressdata;
    tempDart.map(itm => {
      if (itm.addressId == item.addressId) {
        itm.selected = true;
      } else {
        itm.selected = false;
      }
    });
    let temp = [];
    tempDart.map(item => {
      temp.push(item);
      // console.log('check' + item);
    });
    setAdressdata(temp);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={{flexDirection: 'row'}}>
        {/* <TouchableOpacity
          style={styles.BackContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={icon.BackBotton}
            style={{height: 25, width: 25, marginLeft: 25}}
          />
        </TouchableOpacity> */}
        <Text style={styles.TitleText}>Address</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '600',
            color: '#332F2E',
            marginTop: 48,
            marginLeft: 21,
          }}>
          Saved Address
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', marginTop: 48, right: 23}}
          onPress={() => {
            navigation.navigate('AddNewAdress');
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#FE7474',
            }}>
            Add New Address
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 29}} />

      <FlatList
        // style={{height: 800}}
        data={Adressdata}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // setstatus(i.street);
                saveDeafultAddress(item);
              }}>
              <View
                style={[
                  styles.InActiveConatiner,
                  addressId == item.addressId && styles.ActiveContainer,
                ]}>
                <Image
                  source={icon.HomeAddress}
                  style={{
                    width: 30,
                    height: 30,
                    marginTop: 27,
                    marginLeft: 30,
                    position: 'absolute',
                  }}
                />
                {/* <View style={{}}> */}
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#332F2E',
                    marginTop: 12,

                    marginLeft: 95,
                  }}>
                  {item.Name}
                </Text>
                <View
                  style={{
                    width: '50%',
                    height: 50,
                    // backgroundColor: 'black',
                    marginLeft: 95,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: '#363032',
                      opacity: 0.6,
                    }}>
                    {/* No.31,Thirvalluvar salai, Villianur, Puducherry - 605 110 */}
                    No.
                    {item.DoorNumber +
                      ', ' +
                      item.Street +
                      ', \n' +
                      item.City +
                      ', ' +
                      item.Pincode +
                      ',\n' +
                      '+91 ' +
                      item.mobile}
                  </Text>
                </View>
                {/* </View> */}
                <TouchableOpacity
                  style={{position: 'absolute', right: 15, marginTop: 15}}>
                  <Image source={icon.Edit} style={{width: 12, height: 12}} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  BackContainer: {
    width: '100%',
    height: 25,
    // backgroundColor: 'black',
    justifyContent: 'center',
    marginTop: 32,
  },
  ImageContainer: {
    width: '100%',
    height: 46,
    // backgroundColor: 'black',
    marginTop: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#332F2E',
    marginTop: 32,
    // paddingBottom: 25,

    left: '50%',
    marginLeft: -41,
    // alignSelf: 'center',
    position: 'absolute',
    // backgroundColor: 'black',
  },
  ActiveContainer: {
    width: '87.95%',
    height: 85,
    backgroundColor: '#FFFBEE',
    borderWidth: 1,
    borderColor: '#F7DD87',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 15,
  },
  InActiveConatiner: {
    backgroundColor: '#FFFFFF',
    width: '87.95%',
    height: 85,
    borderWidth: 1,
    borderColor: '#F7DD87',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 15,
  },
});

const data = [
  {
    AddressType: 'Home',
    icon: icon.HomeAddress,
  },
  {
    AddressType: 'Office',
    icon: icon.OfficeAddress,
  },
];
