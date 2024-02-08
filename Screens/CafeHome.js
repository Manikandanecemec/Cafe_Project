import React, {useState} from 'react';
import styled from 'styled-components';
import CafeHomeSlider from '../Components/CafeHomeSlider';
import CafeCategoriesContainer from '../Components/CafeCategoriesContainer';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import Lottie from 'lottie-react-native';

import {
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import CafeCard from '../Components/CafeCard';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import {COLORS, icon} from '../Constant';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const CafeHome = ({navigation}) => {
  const [currentIndex, setcurrentIndex] = useState('0');
  const [firestoredata, setfirestoredata] = useState('false');
  const [CartList, setCartList] = useState([]);
  const usergetdata = auth().currentUser;
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [datafile, setdata] = useState([]);

  var Username,
    Useremail,
    UserphotoUrl,
    Useruid,
    UseremailVerified,
    UserphoneNumber;

  if (usergetdata != null) {
    Username = usergetdata.displayName;
    Useremail = usergetdata.email;
    UserphotoUrl = usergetdata.photoURL;
    UseremailVerified = usergetdata.emailVerified;
    Useruid = usergetdata.uid;
    UserphoneNumber = usergetdata.phoneNumber;
  }

  const getCartItems = async () => {
    const userId = usergetdata.uid;
    const user = await firestore().collection('users').doc(userId).get();
    setCartList(user._data.cart);
    console.log('scavgucvs');
  };

  function SplashScreenCondition() {
    setTimeout(() => SplashScreen.hide(), 1500);
  }

  function onAuthStateChanged(user) {
    if (user) {
      //   // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      //   // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      //   // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      //   // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const _user = auth().currentUser;

    if (_user == null) {
      navigation.push('login');
      console.log('user is null');
    }
    if (usergetdata != null) {
      setTimeout(function () {
        getCartItems();
        console.log('Got the cartitems data');
      }, 500); // Adjust the delay time (in milliseconds) as needed
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    setLoading(true);
    database()
      .ref('/CafeCardData')
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        const newData = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setdata(newData);
        // console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });
    return subscriber; // unsubscribe on unmount
  }, [isFocused]);

  const renderItems = ({item, index}) => {
    return (
      <TouchableWithoutFeedback key={index}>
        <View style={styles.bannerContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: '102%',
                height: '102%',
                // position: 'absolute',
                alignSelf: 'center',
              }}
              source={item.url1}
            />
          </View>
          <Text style={styles.discountText}>{item.discount1}</Text>
          <TouchableOpacity
            style={styles.TouchConatiner}
            onPress={() => {
              // this.props.addItemToCart(item),
              navigation.push('Cart');
            }}>
            <Text style={styles.clickBotteonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          // alignSelf: 'center',
          // alignContent: 'center',
        }}>
        <Lottie
          source={require('../assets/97930-loading')}
          autoPlay={true}
          loop={true}
          duration={0}
          // loop={false}
          style={{width: 100, height: 100}}
        />
      </View>
      // <Text>Data is loading...</Text>
    );
  }
  return (
    <MView>
      <SafeAreaView style={styles.container} />
      {/* <StatusBar backgroundColor="gray" /> */}
      <StatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      {SplashScreenCondition()}
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <View
          style={{
            // backgroundColor: '#fdf8f4',
            width: '100%',
            height: 40,
            marginTop: 10,
            // justifyContent: 'center',
            // alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'black',
              marginLeft: 30,
              // alignSelf: 'center',
            }}>
            Cafe
          </Text>
          <Image
            source={icon.Cart}
            style={{
              height: 30,
              width: 30,
              right: 40,
              position: 'absolute',
              alignSelf: 'center',
            }}
          />
          <TouchableWithoutFeedback onPress={() => navigation.push('Cart')}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: '#e94b64',
                position: 'absolute',
                right: 38,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 10,
                  position: 'absolute',
                  color: '#ffffff',
                }}>
                {/* 1 */}
                {CartList.length}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <HomeSliderContainer>
          <FlatList
            data={CafeHomeSliderData}
            renderItem={renderItems}
            // keyExtractor={i => i.toString()}
            keyExtractor={(e, i) => i.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setcurrentIndex((x / width).toFixed(0));
            }}
          />
        </HomeSliderContainer>
        {/* <Text>Hello </Text> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {CafeHomeSliderData.map((item, index) => (
            <View
              key={index}
              style={{
                height: 8,
                width: currentIndex == index ? 30 : 8,
                borderRadius: currentIndex == index ? 5 : 4,
                backgroundColor: currentIndex == index ? '#e94b64' : '#eeeeee',
                marginLeft: 5,
                marginTop: 10,
              }}></View>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <SearchContainer>
            <SeachText>Seach coffee, cookies or more </SeachText>
            <SearchIcon>
              <Image source={icon.Search} style={{height: 25, width: 25}} />
              {/* <MaterialCommunityIcons name="magnify" color="black" size={25} /> */}
            </SearchIcon>
          </SearchContainer>
        </TouchableOpacity>
        <CategoriesContainer>
          <TitleText>categories</TitleText>
          <TouchableOpacity
            style={{right: 30, position: 'absolute'}}
            onPress={() => {
              navigation.navigate('Testtry');
            }}>
            <CaptionText>See all</CaptionText>
          </TouchableOpacity>
        </CategoriesContainer>
        <CategoriesCon>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                // navigation.push('CategroiesCard', {
                //   product: CafeCardData,
                //   catagory: 'Coffee',
                // });

                navigation.navigate('NewSCrren', {
                  catagory: 'Coffee',
                  // catagory: 'Beverag',
                  // catagory: 'Cokkies',
                });
              }}>
              <CafeCategoriesContainer
                url={require('../assets/coffee.png')}
                Text={'Coffee'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.push('CategroiesCard', {
                //   product: CokkiesData,
                //   catagory: 'Cokkies',
                // });
                navigation.navigate('NewSCrren', {
                  // catagory: 'Coffee',
                  // catagory: 'Beverag',
                  catagory: 'Cokkies',
                });
              }}>
              <CafeCategoriesContainer
                url={require('../assets/Cokkies.png')}
                Text={'Cokkies'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NewSCrren', {
                  // catagory: 'Coffee',
                  catagory: 'Beverag',
                  // catagory: 'Cokkies',
                });
              }}>
              <CafeCategoriesContainer
                url={require('../assets/Beverag.png')}
                Text={'Beverag'}
              />
            </TouchableOpacity>
          </ScrollView>
        </CategoriesCon>
        <TouchableOpacity
          style={{
            width: '87.69%',
            height: 56,
            backgroundColor: '#F4F4F4',
            alignSelf: 'center',
            marginTop: 27,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#DADADA',
            flexDirection: 'row',
            overflow: 'hidden',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Coupon')}>
          <Image
            source={icon.HomeSCreenCoupon}
            style={{height: 56, width: 78.07}}
          />
          <Text style={{fontSize: 14, fontWeight: '700', color: '#332F2E'}}>
            Prices smashed with offer zone
          </Text>
          <Image
            source={icon.includeImage}
            style={{height: 11, width: 12, marginLeft: 17}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TitleText>Recommended for you!</TitleText>
        </View>

        <CafeContainerall>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {datafile.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.push('ProductTab2', {
                    product: data,
                    datas: datafile,
                  });
                }}>
                <CafeCard
                  url={data.url}
                  discount={data.discount}
                  QualityText={data.QualityText}
                  ProductName={data.productName}
                  RatingValue1={data.RatingValue1}
                  data={data}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </CafeContainerall>
      </ScrollView>
    </MView>
  );
};

export default CafeHome;

const MView = styled.View`
  width: 100%;
  height: 100%;
  background: white;
`;

const TextInput = styled.TextInput`
  width: 89.74%;
  height: 57.16px;
  border-radius: 15px;
  left: 50%;
  margin-left: -44.87%;
  margin-top: 20.61px;
  color: black;
  font-size: 13px;
  padding-left: 5.35%;
  border: 1px solid #e94b64;
`;

const HomeSliderContainer = styled.View`
  /* margin-top:6%; */
  width: 100%;
  /* height: 230px; */
  /* background:black; */
  flex-direction: row;
`;

const SearchContainer = styled.View`
  width: 89.74%;
  height: 57.16px;
  border: 1px solid #e94b64;
  /* margin-top: 20.61px; */
  border-radius: 15px;
  left: 50%;
  margin-left: -44.87%;
  padding-left: 5.35%;
  justify-content: center;
  margin-top: 20.61px;
`;
const SeachText = styled.Text`
  color: black;
  font-size: 13px;
`;

const SearchIcon = styled.View`
  position: absolute;
  right: 20.79px;
`;

const TitleText = styled.Text`
  font-weight: 700;
  font-size: 17px;
  /* color: #332F2E; */
  color: black;
  margin-top: 13.83px;
  margin-left: 19px;
  /* position:absolute; */
`;

const Container = styled.View`
  width: 100%;
  height: 20px;
`;

const CafeContainerall = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

const ContainerC = styled.View`
  width: 100%;
  height: 20px;
  position: absolute;
  /* background:black; */
`;

const Card = styled.View`
  width: 100%;
  height: 200px;
  background: black;
`;

const Con = styled.View`
  width: 200px;
  height: 200px;
  /* position:absolute; */
  background: black;
`;
const CategoriesContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
const CategoriesCon = styled.View`
  /* width:100%; */
`;

const CaptionText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: #fe7474;
  /* position: absolute; */
  margin-top: 18.83px;
  /* right: 20px; */
  /* left: 26; */
`;

// const CafeCategoriesContainerData = [
//   {
//     url: require('../assets/coffee.png'),
//     Text: 'Coffee',
//   },
//   {
//     url: require('../assets/Cokkies.png'),
//     Text: 'Cokkies',
//     RatingValue: '23',
//   },
//   {
//     url: require('../assets/Beverag.png'),
//     Text: 'Beverag',
//     RatingValue: '20',
//   },
// ];

const CokkiesData = [
  {
    id: 1,
    url: icon.donut,
    productName: 'Crinkle cookie',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
    status: 'coffee',
  },
  {
    id: 2,
    url: icon.frenchfries,
    productName: 'french fries',
    RatingValue1: '30',
    price: '₹120',
    discount: '25',
  },
  {
    id: 3,
    url: icon.macaroons,
    productName: 'Macaroons',
    RatingValue1: '28',
    price: '₹150',
    discount: '25',
  },
  {
    id: 4,
    url: icon.Heartcokkies,
    productName: 'Sugar cookie',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
  },
  {
    id: 5,
    url: icon.BCokkies,
    productName: 'Oatmeal raisin',
    RatingValue1: '25',
    price: '₹60',
    discount: '25% OFF',
  },
  {
    id: 6,
    url: icon.BCokkies1,
    productName: 'Molasses cookie',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
  },
  {
    id: 7,
    url: icon.Oatmealraisin,
    productName: 'Fortune cookie',
    RatingValue1: '30',
    price: '₹120',
    discount: '25',
  },
];

const BeverageData = [
  {
    id: 1,
    url: icon.bloodymary,
    productName: 'Bloody mary',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
    status: 'coffee',
  },
  {
    id: 2,
    url: icon.cocktail,
    productName: 'Cocktail',
    RatingValue1: '30',
    price: '₹120',
    discount: '25',
  },
  {
    id: 3,
    url: icon.cosmopolitan,
    productName: 'Cosmopolitan',
    RatingValue1: '28',
    price: '₹150',
    discount: '25',
  },
  {
    id: 4,
    url: icon.mojito,
    productName: 'Mojito',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
  },
  {
    id: 5,
    url: icon.pinacolada,
    productName: 'Pinacolada',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
  },
  {
    id: 6,
    url: icon.daiquiri,
    productName: 'Daiquiri',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
  },
];

const CafeCardData = [
  {
    id: 1,
    url: icon.Filtercoffee,
    productName: 'Filter coffee',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
    status: 'coffee',
  },
  {
    id: 2,
    url: icon.Espresso,
    productName: 'Espresso',
    RatingValue1: '30',
    price: '₹120',
    discount: '25',
  },
  {
    id: 3,
    url: icon.cappuccino,
    productName: 'cappuccino',
    RatingValue1: '28',
    price: '₹150',
    discount: '25',
  },
  {
    id: 4,
    url: icon.Filtercoffee,
    productName: 'Filter coffee',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
  },
  {
    id: 5,
    url: icon.cappuccino,
    productName: 'Filter coffee',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
  },
  {
    id: 6,
    url: icon.cappuccino,
    productName: 'Filter coffee',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
  },
  {
    id: 7,
    url: icon.Espresso,
    productName: 'Espresso',
    RatingValue1: '30',
    price: '₹120',
    discount: '25',
  },
];

const CafeHomeSliderData = [
  {
    url1: icon.Home1,
    discount1: 'Flat 25% offer',
    id: 1,
    url: icon.Filtercoffee,
    productName: 'Filter coffee',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
    status: 'coffee',
  },
  {
    url1: icon.Home2,
    discount1: 'Flat 20% offer',
    id: 2,
    url: icon.Filtercoffee,
    productName: 'Filter coffee',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
    status: 'coffee',
  },
  {
    url1: icon.Home1,
    discount1: 'Flat 27% offer',
    id: 3,
    url: icon.Filtercoffee,
    productName: 'Filter coffee',
    RatingValue1: '25',
    price: '₹60',
    discount: '25',
    status: 'coffee',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 6,
    // justifyContent:"center",
  },
  bannerContainer: {
    width: width - 30,
    height: 182.13,
    backgroundColor: 'black',
    borderRadius: 18,
    // marginLeft: 22,
    marginStart: 20,
    marginRight: 10,
    overflow: 'hidden',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
  },
  discountText: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: '800',
    color: 'black',
    marginLeft: 29,
    width: 146,
    marginTop: 15,
  },
  TouchConatiner: {
    width: '27.44%',
    height: 28,
    backgroundColor: '#e94b64',
    marginTop: 118.74,
    marginLeft: 29,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  clickBotteonText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ffffff',
  },
});
