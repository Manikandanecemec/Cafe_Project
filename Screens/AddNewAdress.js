import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {ColorTheme, icon} from '../Constant';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const height = Dimensions.get('window').height;

export default function AddNewAdress({navigation}) {
  const [City, setCity] = useState('');
  const [Street, setStreet] = useState('');
  const [Pincode, setPincode] = useState('');
  const [mobile, setmobile] = useState('');
  const [addresslist, setaddresslist] = useState([]);
  const isFocused = useIsFocused();
  const [Name, setName] = useState('');
  const [DoorNumber, setDoorNumber] = useState('');
  const [OrderId, setOrderId] = useState('');

  useEffect(() => {
    getAddressList();
  }, [isFocused]);

  const getAddressList = async () => {
    const userId = usergetdata.uid;
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    setaddresslist(tempDart);
    console.log('GetAddressData:' + tempDart);
    if (addresslist == null) {
      addresslistS();
    }
  };

  const addresslistS = async () => {
    const userId = usergetdata.uid;
    let tempDart = [];
    firestore().collection('users').doc(userId).update({
      address: tempDart,
    });
  };

  const usergetdata = auth().currentUser;

  const Saveaddress = async () => {
    const userId = usergetdata.uid;

    // const orderId = () => {
    //   var S4 = () => {
    //     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    //   };
    //   return (
    //     S4() +
    //     S4() +
    //     '-' +
    //     S4() +
    //     '-' +
    //     S4() +
    //     '-' +
    //     S4() +
    //     '-' +
    //     S4() +
    //     S4() +
    //     S4()
    //   );
    // };
    // UUID = orderId();
    // setOrderId(UUID);

    function broofa() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    }

    const addressId = broofa();

    // const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    // tempDart = user._data.address;

    tempDart.push({Name, mobile, DoorNumber, Street, City, Pincode, addressId});
    firestore()
      .collection('users')
      .doc(userId)
      .update({
        address: tempDart,
      })
      .then(res => {
        console.log('successfully added');
      })
      .catch(error => {
        console.log(error);
      });
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity
            style={styles.BackContainer}
            onPress={() => navigation.goBack()}>
            <Image
              source={icon.BackBotton}
              style={{height: 25, width: 25, marginLeft: 25}}
            />
          </TouchableOpacity>
          <Text style={styles.TitleText}>Add Adress</Text>
        </View>
        <TextInput
          style={[styles.inputStyle, Name != '' && styles.selinputStyle]}
          placeholder={'Enter Name '}
          value={Name}
          onChangeText={txt => setName(txt)}
        />
        <TextInput
          style={[styles.inputStyle, DoorNumber != '' && styles.selinputStyle]}
          placeholder={'Enter Door Number '}
          // keyboardType={'number-pad'}
          value={DoorNumber}
          onChangeText={txt => setDoorNumber(txt)}
        />
        <TextInput
          style={[styles.inputStyle, Street != '' && styles.selinputStyle]}
          placeholder={'Enter Street '}
          value={Street}
          onChangeText={txt => setStreet(txt)}
        />
        <TextInput
          style={[styles.inputStyle, City != '' && styles.selinputStyle]}
          placeholder={'Enter City '}
          value={City}
          onChangeText={txt => setCity(txt)}
        />
        <TextInput
          style={[styles.inputStyle, Pincode != '' && styles.selinputStyle]}
          placeholder={'Enter Pincode '}
          value={Pincode}
          keyboardType={'number-pad'}
          onChangeText={txt => setPincode(txt)}
        />
        <TextInput
          style={[styles.inputStyle, mobile != '' && styles.selinputStyle]}
          placeholder={'Enter mobile '}
          value={mobile}
          maxLength={10}
          keyboardType={'number-pad'}
          onChangeText={txt => setmobile(txt)}
        />
        <TouchableOpacity
          style={{
            width: '89.74%',
            height: 66,
            backgroundColor: '#E94B64',
            alignSelf: 'center',
            borderRadius: 15,
            // marginTop: height - 50,
            marginTop: 60,
            marginBottom: 21,
            // position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            // bottom: 30,
          }}
          onPress={() => {
            if (Street != '' && City != '' && Pincode != '' && mobile != '') {
              Saveaddress();
            }
          }}>
          <Text style={{fontSize: 15, fontWeight: '700', color: '#ffffff'}}>
            Save Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  BackContainer: {
    width: '100%',
    height: 25,
    justifyContent: 'center',
    marginTop: 32,
  },
  TitleText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#332F2E',
    marginTop: 32,
    alignSelf: 'center',
    position: 'absolute',
  },
  TextInputS: {
    width: '68.21%',
    height: 40,
    borderRadius: 15,
    marginLeft: 37,
    padding: 10,
    color: 'black',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
    borderColor: '#EFEEEE',
  },
  selinputStyle: {
    backgroundColor: '#FFFBEE',
    borderColor: '#F7DD87',
  },
});

// style={{padding: 10, color: 'black'}}
