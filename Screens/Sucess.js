import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {icon} from '../Constant';
import CafeHome from './CafeHome';
import Lottie from 'lottie-react-native';
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const height = Dimensions.get('window').height;

const Success = ({navigation}) => {
  const route = useRoute();
  // const route = this.props.route.params.product;

  useEffect(() => {
    if (route.params.status1 == 'success') {
      placeOrder();
      // console.log('sucess screen' + route.params.userId);
    }
    // status: 'success',
    //             paymentId: data.razorpay_payment_id,
    //             cartList: CartList,
    //             total: getTotal(),
    //             address: selectedAddress,
    //             userId: usergetdata.uid,
    //             userName: Name,
    //             userEmail: email,
    //             userMobile: mobile,
  }, []);
  const placeOrder = async () => {
    console.log('sucess screen' + route.params.userId);
    const user = await firestore()
      .collection('users')
      .doc(route.params.userId)
      .get();
    // let user = await firestore()
    //   .collection('users')
    //   .doc(route.params.userId)
    //   .get();
    let tempOver = [];
    tempOver = user._data.orders;
    tempOver.push({
      items: route.params.cartList,
      address: route.params.address,
      orderBy: route.params.userName,
      userEmail: route.params.userEmail,
      userMobile: route.params.userMobile,
      userId: route.params.userId,
      orderTotal: route.params.total,
      paymentId: route.params.paymentId,
      arrrivingAT: route.params.arrrivingAT,
      ordernumber: route.params.ordernumber,
      orderID: route.params.orderID,
      // status: 'In progress',
      status: route.params.status,
      Numberofitems: route.params.Numberofitems,
    });
    firestore().collection('users').doc(route.params.userId).update({
      cart: [],
      orders: tempOver,
    });
    firestore()
      .collection('orders')
      .add({
        data: {
          items: route.params.cartList,
          address: route.params.address,
          orderBy: route.params.userName,
          userEmail: route.params.userEmail,
          userMobile: route.params.userMobile,
          userId: route.params.userId,
          orderTotal: route.params.total,
          paymentId: route.params.paymentId,
        },
        orderBy: route.params.userId,
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}>
        <Lottie
          source={
            route.params.status1 == 'success'
              ? require('../assets/SUccess.json')
              : require('../assets/97930-loading.json')
          }
          autoPlay={true}
          loop={false}
          duration={0}
          style={{
            width: 300,
            height: 300,
            marginTop: 70,
          }}
        />
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 50,
            fontSize: 17,
            fontWeight: '700',
            color: '#332F2E',
          }}>
          Thank you for Shopping!
        </Text>
        <Text
          style={{
            width: '70%',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 12,
            fontWeight: '500',
            color: '#332F2E',
            opacity: 0.5,
            marginTop: 12,
          }}>
          Your order has been successfully placed and has been processed for
          delivery
        </Text>
      </View>
      <View
        style={{
          marginTop: height - 200,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginHorizontal: 50}}
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: '#332F2E',
            }}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '77.95%',
            height: 66,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E94B64',
            alignSelf: 'center',
            marginTop: 29,
            // marginTop: height - 100,
            borderRadius: 15,
            position: 'absolute',
          }}
          onPress={() => {
            navigation.navigate('Home1');
          }}>
          <Text style={{fontSize: 15, fontWeight: '700', color: '#FFFFFF'}}>
            Track your order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Success;
