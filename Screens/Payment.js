import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {icon} from '../Constant';

import icons from '../Constant/icons';

const Payment = ({navigation}) => {
  const [card, setcard] = useState('HDFC Bank');
  // const [mode, setmode] = useState('UPI');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.BackContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={icon.BackBotton}
              style={{height: 25, width: 25, marginLeft: 25}}
            />
          </TouchableOpacity>
          <Text style={styles.TitleText}>Payment</Text>
        </View>
        <View style={styles.ImageContainer}>
          <Image
            source={icon.PaymentOrderSlider}
            style={{height: 46, width: 317}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '600',
              color: '#332F2E',
              marginTop: 48,
              marginLeft: 21,
            }}>
            Saved Cards
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', marginTop: 48, right: 23}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#FE7474',
              }}>
              + Add New Card
            </Text>
          </TouchableOpacity>
        </View>
        {/* Card Details */}

        {CardDetailsData.map((i, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // console.log(this.card);
              setcard(i.name);
            }}>
            <View
              style={{
                width: '93.99%',
                height: 71,
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                marginTop: 21,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#EBEBEB',
              }}>
              <Image
                source={i.icon}
                style={{width: 26, height: 25, marginTop: 14, marginLeft: 23}}
              />
              <Text
                style={{
                  position: 'absolute',
                  marginTop: 13,
                  marginLeft: 62,
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#332F2E',
                }}>
                {i.name}
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  marginTop: 36,
                  marginLeft: 62,
                  fontSize: 10,
                  fontWeight: '600',
                  color: '#615D5D',
                }}>
                {i.cardNumber}
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  marginTop: 36,
                  marginLeft: 181,
                  fontSize: 10,
                  fontWeight: '600',
                  color: '#615D5D',
                }}>
                {i.expDate}
              </Text>
              {card == i.name ? (
                <Image
                  source={icon.SelectedButton}
                  style={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    marginLeft: 304,
                    marginTop: 25,
                  }}
                />
              ) : (
                <Image
                  source={icon.UnSelectedButton}
                  style={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    marginLeft: 304,
                    marginTop: 25,
                  }}
                />
              )}
              {/* <Image
                source={icon.UnSelectedButton}
                style={{
                  position: 'absolute',
                  width: 20,
                  height: 20,
                  marginLeft: 304,
                  marginTop: 25,
                }}
              /> */}
            </View>
          </TouchableOpacity>
        ))}
        {/* Card Details */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: '#332F2E',
            marginTop: 24,
            marginLeft: 20,
          }}>
          Other payment options
        </Text>
        {/* Payment Platform */}
        {PlatformData.map((i, index) => (
          <TouchableOpacity key={index} onPress={() => setcard(i.name)}>
            <View
              style={{
                width: '93.99%',
                height: 64,
                backgroundColor: '#FFFFFF',
                borderRadius: 15,
                alignSelf: 'center',
                marginTop: 15,
                borderWidth: 1,
                borderColor: '#EBEBEB',
              }}>
              <Image
                source={i.icon}
                style={{
                  width: 29,
                  height: 29,
                  marginTop: 15.85,
                  marginLeft: 17,
                }}
              />
              <Text
                style={{
                  position: 'absolute',
                  marginLeft: 63.08,
                  marginTop: 12,
                  fontSize: 15,
                  color: '#332F2E',
                  fontWeight: '600',
                }}>
                {i.name}
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  marginTop: 35,
                  marginLeft: 63.08,
                  fontSize: 10,
                  color: '#615D5D',
                  fontWeight: '600',
                }}>
                {i.caption}
              </Text>
              {card == i.name ? (
                <Image
                  source={icon.SelectedButton}
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    marginTop: 22,
                    right: 20,
                  }}
                />
              ) : (
                <Image
                  source={icon.UnSelectedButton}
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    marginTop: 22,
                    right: 20,
                  }}
                />
              )}
              {/* <Image
                source={icon.UnSelectedButton}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  marginTop: 22,
                  right: 20,
                }}
              /> */}
            </View>
          </TouchableOpacity>
        ))}
        {/* Payment Platform */}
        <View
          style={{
            width: '88.21%',
            height: 175,
            // backgroundColor: 'black',
            alignSelf: 'center',
            marginTop: 38,
            borderRadius: 15,
            backgroundColor: '#f7f7f7',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#332F2E',
              alignSelf: 'center',
              marginTop: 29,
            }}>
            Total Payable ₹724
          </Text>
          <TouchableOpacity
            style={{
              width: '77.95%',
              height: 66,
              backgroundColor: '#E94B64',
              borderRadius: 15,
              marginTop: 28,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            onPress={() => {
              navigation.navigate('Success');
            }}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#ffffff'}}>
              Confirm payment
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Payment;

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
    left: '50%',
    marginLeft: -41,
    // alignSelf: 'center',
    position: 'absolute',
    // backgroundColor: 'black',
  },
  ImageContainer: {
    width: '100%',
    height: 46,
    // backgroundColor: 'black',
    marginTop: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CardDetailsData = [
  {
    icon: icon.HDFCIcon,
    name: 'HDFC Bank',
    cardNumber: '******** **** 1690',
    expDate: 'Exp 01/32',
  },
  {
    icon: icon.Icicicon,
    name: 'ICICI Bank',
    cardNumber: '******** **** 2510',
    expDate: 'Exp 07/26',
  },
];

const PlatformData = [
  {
    icon: icon.UPIicon,
    name: 'UPI',
    caption: 'Unified Payment Interface',
  },
  {
    icon: icon.GPayIcon,
    name: 'Google Pay',
    caption: 'Welcome to Google Pay!',
  },
  {
    icon: icon.PaypalIcon,
    name: 'PayPal',
    caption: 'New. Faster. Easier',
  },
  {
    icon: icon.CashOnIcon,
    name: 'Cash on delivery',
    caption: 'Not applicable for your location',
  },
];
