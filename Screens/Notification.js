import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {ColorTheme, icon} from '../Constant';
import styled from 'styled-components';

export default function Notification({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorTheme.white}}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home1')}>
            <SearchIcon>
              <Image source={icon.BackBotton} style={{height: 26, width: 26}} />
            </SearchIcon>
          </TouchableOpacity>
          <Text style={styles.TitleText}>Notification</Text>
        </View>
        {/* <View style={styles.EllipseImage}></View> */}
        {CafeHomeSliderData.map((item, index) => (
          <View key={index}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: '#FFE1DD',
                  marginTop: 40,
                  marginLeft: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={icon.AppliedCoupon}
                  style={{
                    width: 30,
                    height: 30,
                    // marginTop: 40,
                    // marginLeft: 22,
                  }}
                />
              </View>
              <View style={styles.TextContainer}>
                <Text style={styles.NotiText}>
                  {/* Enjoy a 10% discount on your next purchase with code:
                   **DISCOUNT10** */}
                  {item.data}
                </Text>
                <Text style={styles.TimeText}>A MINUTE AGO</Text>
              </View>
            </View>
            <View style={styles.UnderContainer} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TitleText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#332F2E',
    position: 'absolute',
    marginTop: 25,
    left: '50%',
    marginLeft: -41,
    // alignSelf: "center",
    // backgroundColor: 'black',
  },
  NotiText: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 42,
    marginLeft: 15,
    width: 266,
    color: 'black',
  },
  ellipseImage: {
    width: 52,
    height: 52,
    // borderRadius: 26,
    backgroundColor: 'black',
    // marginTop: 40,
    // marginLeft: 22,
  },
  TimeText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'gray',
    marginLeft: 15,
  },
  TextContainer: {
    // flexDirection: 'coloum',
  },
  UnderContainer: {
    width: '88.46%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: '#F0F0F0',
    marginTop: 29,
  },
});

const SearchIcon = styled.View`
  width: 26.07px;
  height: 26.07px;
  margin-top: 25px;
  margin-left: 20px;
`;

const CafeHomeSliderData = [
  {
    data: 'Enjoy a 10% discount on your next purchase with code: **DISCOUNT50**',
  },
  {
    data: 'Enjoy a 10% discount on your next purchase with code: **DISCOUNT10**',
  },
  {
    data: 'Order Number: #123456 ** Date and Time: January 29, 2024, 10:30 AM',
  },
];
