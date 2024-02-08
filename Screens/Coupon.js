import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {icon} from '../Constant';

const Coupon = ({navigation}) => {
  const [CouponData, setCouponData] = useState([]);

  function onAuthStateChanged(user) {
    if (user) {
      //   // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      //   // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      //   // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      //   // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    // userAccount();
    // const _user = auth().currentUser;

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // setLoading(true);
    database()
      .ref('/Coupon')
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        const newData = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setCouponData(newData);
        // console.log(data);
      })
      .finally(() => {
        // setLoading(false);
      });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={styles.BackgroundContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          backgroundColor={'white'}
          barStyle={'dark-content'}
          showHideTransition={'fade'}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.BackContainer}
            onPress={() => {
              navigation.navigate('Home1');
            }}>
            <Image
              source={icon.BackBotton}
              style={{height: 25, width: 25, marginLeft: 25}}
            />
          </TouchableOpacity>
          <Text style={styles.TitleText}>Coupon</Text>
        </View>

        {CouponData.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              navigation.navigate('CouponPage', {
                Coupon: item,
                datas: CouponData,
              });
            }}>
            <View style={styles.CouponContainer}>
              <Image
                source={{
                  // {this.props.url}
                  uri: item.CopounImage,
                }}
                // source={item.CopounImage}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 33,
                  marginLeft: 32,
                  position: 'absolute',
                  // backgroundColor: '#FFFBEE',
                }}
              />
              <View
                style={{
                  width: 1,
                  height: 88,
                  backgroundColor: 'white',
                  marginLeft: 113,
                  position: 'absolute',
                  marginTop: 15,
                  opacity: 0.2,
                  // borderStyle: 'dotted',
                  // borderheight: 1,
                  // borderRadius: 1,
                  // borderColor: 'white',
                }}></View>
              <Text style={styles.CouponText}>{item.Code}</Text>
              <Text style={styles.CouponText1}>₹{item.Price}</Text>
              <Text style={styles.CouponText2}>
                Valid unltil is {item.Validity}
              </Text>

              <View style={styles.EllipseCoupon} />
              <View style={styles.EllipseCouponleft} />
            </View>
          </TouchableWithoutFeedback>
        ))}
        <View style={{height: 33}} />
      </ScrollView>
    </View>
  );
};
export default Coupon;

const styles = StyleSheet.create({
  BackContainer: {
    width: '100%',
    height: 25,
    justifyContent: 'center',
    marginTop: 15,
  },
  TitleText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#332F2E',
    marginTop: 15,
    left: '50%',
    marginLeft: -44,
    position: 'absolute',
  },
  BackgroundContainer: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  CouponContainer: {
    width: '73.33%',
    height: 116,
    backgroundColor: '#E94B64',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 33,
  },
  CouponText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 21,
    marginLeft: 131,
    position: 'absolute',
  },
  CouponText1: {
    fontSize: 15,
    fontWeight: '400',
    color: '#FFFFFF',
    marginTop: 47,
    marginLeft: 131,
    position: 'absolute',
  },
  CouponText2: {
    fontSize: 8,
    fontWeight: '400',
    color: '#FFFFFF',
    marginTop: 89,
    marginLeft: 131,
    position: 'absolute',
  },
  EllipseCoupon: {
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: 18,
    marginTop: 39,
    marginLeft: -18,
  },
  EllipseCouponleft: {
    position: 'absolute',
    right: -18,
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: 18,
    marginTop: 39,
  },
});

// const CouponData = [
//   {
//     CouponName: "COUPON100",
//     Discount: "₹100",
//     Validity: "31 August 2023",
//     CopounImage: icon.Copoun,
//   },
//   {
//     CouponName: "COUPON80",
//     Discount: "₹80",
//     Validity: "31 August 2023",
//     CopounImage: icon.Copoun1,
//   },
//   {
//     CouponName: "COUPON60",
//     Discount: "₹60",
//     Validity: "31 August 2023",
//     CopounImage: icon.Copoun3,
//   },
//   {
//     CouponName: "COUPON40",
//     Discount: "40",
//     Validity: "31 August 2023",
//     CopounImage: icon.Copoun3,
//   },
//   {
//     CouponName: "COUPON20",
//     Discount: "20",
//     Validity: "31 August 2023",
//     CopounImage: icon.Copoun3,
//   },
// ];
