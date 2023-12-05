import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Lottie from 'lottie-react-native';
import {icon} from '../Constant';
import {useRoute} from '@react-navigation/native';
import Like from '../Components/Like';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const ProductTab2 = ({navigation}) => {
  const [status, setStatus] = useState('Dark');
  const [level, setLevel] = useState('Medium');
  const [volume, setVolume] = useState('High');
  const [count, setCount] = useState('');
  const [whistlist, setWhistlist] = useState('false');
  const [cartContainer, setCartContainer] = useState('true');
  const route = useRoute();
  const isFocused = useIsFocused();
  const [CartList, setCartList] = useState([]);
  const [CartTotal, setcartTotal] = useState();
  const usergetdata = auth().currentUser;
  const [Triger, setTriger] = useState('');
  const [Quality, setQuality] = useState('0');

  const item = route.params.product;

  const Addwishlist = async item => {
    const userId = usergetdata.uid;
    console.log('whish' + userId);
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.wishlist;
    // tempDart.push(item);

    let existing = false;
    tempDart.map(itm => {
      if (itm.id == item.id) {
        existing = true;
        console.log('existing to cart');
      }
      firestore().collection('users').doc(userId).update({
        wishlist: tempDart,
      });
    });
    if (existing == false) {
      tempDart.push(item);
      console.log('Added new to wishlist');
    }
    firestore().collection('users').doc(userId).update({
      wishlist: tempDart,
    });
  };

  const addItemToCart2 = async item => {
    const userId = usergetdata.uid;
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    // console.log(tempDart);
    tempDart = user._data.cart;
    if (tempDart.length > 0) {
      let existing = false;
      tempDart.map(itm => {
        if (itm.id == item.id) {
          itm.qty = itm.qty + 1;
          itm.sugarLevel = level;
          itm.volume = volume;
          itm.status = status;
          existing = true;
          console.log('existing to cart');
        }
        firestore().collection('users').doc(userId).update({
          cart: tempDart,
        });
      });
      if (existing == false) {
        tempDart.push(item);
        console.log('Added new to cart');
      }
    } else {
      tempDart.push(item);
    }
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    // setCartList(user._data.cart);
    setTriger('');
  };

  useEffect(() => {
    // console.log(item);
    if (usergetdata != null) {
      const getCartItems = async () => {
        // setLoading(true);
        const userId = usergetdata.uid;
        const user = await firestore().collection('users').doc(userId).get();
        setCartList(user._data.cart);

        const TotalCartvalue = getTotal();
        setcartTotal(TotalCartvalue);
        // setLoading(false);
      };
      getCartItems();
      // console.log('CartList' + CartList);
    }

    const quty = () => {
      let tempDart = [];
      tempDart = CartList;

      tempDart.map(itm => {
        if (itm.id == item.id) {
          let qtry = itm.qty;
          setQuality(qtry);

          // console.log('Quality Got');
        } else {
          setQuality('0');
        }
      });
    };
    quty();
    const getTotal = () => {
      let total = 0;
      CartList.map(item => {
        total = total + item.qty * item.price;
      });
      return total;
    };

    // console.log(' cart screen Total:' + CartTotal);
  }, [CartList]);

  const deleteitermfromCart = async item => {
    console.log('the deleteitermfromCart');
    const userId = usergetdata.uid;
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.splice(item, 1);
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    setCartList(user._data.cart);
    // getCartItems();
    setTriger('');
  };

  const RemoveitemfromCart = async item => {
    console.log('the RemoveitemfromCart');
    const userId = usergetdata.uid;
    // console.log(item);
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    console.log(tempDart);
    tempDart = user._data.cart;
    if (tempDart.length > 0) {
      tempDart.map(itm => {
        if (itm.id == item.id) {
          itm.qty = itm.qty - 1;
          console.log('Remove from cart');
        }
        firestore().collection('users').doc(userId).update({
          cart: tempDart,
        });
      });
    }
    setCartList(user._data.cart);
    // getCartItems();
    setTriger('');
  };

  const addItemToCart = async item => {
    const userId = usergetdata.uid;
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    // console.log(tempDart);
    tempDart = user._data.cart;
    if (tempDart.length > 0) {
      let existing = false;
      tempDart.map(itm => {
        if (itm.id == item.id) {
          itm.qty = itm.qty + 1;
          itm.sugarLevel = level;
          itm.volume = volume;
          itm.status = status;
          existing = true;
          console.log('existing to cart');
        }
        firestore().collection('users').doc(userId).update({
          cart: tempDart,
        });
      });
      if (existing == false) {
        tempDart.push(item);
        console.log('Added new to cart');
      }
    } else {
      tempDart.push(item);
    }
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    // setCartList(user._data.cart);
    setTriger('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar hidden /> */}
      <StatusBar
        backgroundColor={'#FDF8F4'}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ProductContainer}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.ImageContainer}>
              <Image
                style={styles.Image}
                source={{
                  //  {icon.cappuccino}
                  uri: item.url,
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.btnBarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <SearchIcon>
              <Image source={icon.BackBotton} style={{height: 26, width: 26}} />
            </SearchIcon>
          </TouchableOpacity>
          <ProductNameContainer>
            <Text style={styles.productText}>{item.productName}</Text>
          </ProductNameContainer>
          <TouchableOpacity
            onPress={
              () => {
                setWhistlist('true'), Addwishlist(item);
              }

              //  this.setState({whistlist: 'true'})
            }>
            <PerIcon2>
              {whistlist == 'true' ? (
                <Lottie
                  source={require('../assets/7596-like.json')}
                  autoPlay={true}
                  loop={false}
                  duration={0}
                  style={{
                    width: 70,
                    height: 70,
                    marginLeft: -50,
                    position: 'absolute',
                    marginTop: -22,
                  }}
                />
              ) : (
                <Image source={icon.Heart} style={{height: 25, width: 25}} />
              )}
            </PerIcon2>
          </TouchableOpacity>
        </View>

        <View style={styles.incrementContainer}>
          <CartaddContainer>
            {cartContainer == 'true' ? (
              <TouchableOpacity
                style={styles.addcontainer}
                onPress={() => {
                  setCartContainer('false');
                  addItemToCart(item);
                  // this.setState({cartContainer: 'false'});
                  // this.incrementValue();
                }}>
                <Text style={styles.AddCartText}>Add Cart</Text>
                <Image
                  source={icon.leftArrow}
                  style={{
                    width: 11,
                    height: 21,
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 30,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (Quality > 1) {
                      RemoveitemfromCart(item);
                    } else {
                      deleteitermfromCart(item);
                    }
                    // this.decrementValue();
                  }}>
                  <AddContainer>
                    <Image
                      source={icon.Minus}
                      style={{height: 15, width: 15}}
                    />
                  </AddContainer>
                </TouchableOpacity>

                <CountContainer>
                  <AddText>
                    {/* {count > 0 ? deleteitermfromCart(index) : Quality} */}
                    {Quality}
                  </AddText>
                </CountContainer>

                <TouchableOpacity
                  onPress={() => {
                    addItemToCart(item);
                    // this.incrementValue();
                    // this.props.addItemToCart(item);
                  }}>
                  <SubContainer>
                    <Image
                      source={icon.Addition}
                      style={{height: 15, width: 15}}
                    />
                  </SubContainer>
                </TouchableOpacity>
              </>
            )}
          </CartaddContainer>
        </View>
        <Text style={styles.tiltleText}>Coffee Strength</Text>
        {/* maplist Comment */}
        <View style={styles.listContainer}>
          {strengthData.map((e, index) => (
            <TouchableOpacity
              key={index}
              onPress={
                () => setStatus(e.status)
                // this.setState({status: e.status})
              }
              style={[
                styles.btnContainer,
                status === e.status && styles.btnContainerActive,
              ]}>
              <Text
                style={[
                  styles.btnText,
                  status === e.status && styles.btnTextActive,
                ]}>
                {e.status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.tiltleText}>Sugar level</Text>
        <View style={styles.listContainer}>
          {levelData.map((e, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setLevel(e.level)}
              // this.setState({level: e.level})}
              // onPress={()=>setlevel(e.level)}
              // onPress={()=>this.setState(status:"Medium")}
              // onPress={()=>{this.setState({status:"Come”});}}
              style={[
                styles.btnContainer,
                level === e.level && styles.btnContainerActive,
              ]}
              // style={styles.btnContainerActive}
            >
              <Text
                style={[
                  styles.btnText,
                  level === e.level && styles.btnTextActive,
                ]}>
                {e.level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.tiltleText}>Volume</Text>
        <View style={styles.listContainer}>
          {volumeDat.map((a, index) => (
            <TouchableOpacity
              key={index}
              // onPress={()=>setvolume(a.volume)}
              onPress={() =>
                // this.setState({volume: a.volume})
                setVolume(a.volume)
              }
              style={[
                styles.btnContainer,
                volume === a.volume && styles.btnContainerActive,
              ]}
              // style={styles.btnContainerActive}
            >
              <Text
                style={[
                  styles.btnText,
                  volume === a.volume && styles.btnTextActive,
                ]}>
                {a.volume}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.priceBarContainer}>
          <Text style={styles.itemText}>
            {CartList.length} Items | ₹{/* {getTotal()} */}
            {CartTotal}
          </Text>
          <TouchableOpacity
            style={styles.ViewCartContainer}
            // onPress={() => this.props.navigation.push('cart')}
            onPress={() => {
              navigation.navigate('Cart');
              //   this.props.navigation.push('Cart');
            }}>
            <Text style={styles.cartText}>View cart</Text>
          </TouchableOpacity>
        </View>
        <Like />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductTab2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ProductContainer: {
    width: '100%',
    height: 378,
    backgroundColor: '#FDF8F4',
    borderBottomLeftRadius: 63,
    borderBottomRightRadius: 63,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    width: 250,
    height: 250,
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  productText: {
    fontSize: 15,

    fontWeight: '700',
    color: '#332F2E',
    position: 'absolute',
  },

  btnBarContainer: {
    width: '100%',
    height: 25,
    position: 'absolute',
    marginTop: 32,
  },

  incrementContainer: {
    width: '100%',
    height: 107,
    justifyContent: 'center',
    // backgroundColor: 'black',
    alignItems: 'center',
  },
  tiltleText: {
    color: '#332F2E',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 19,
  },
  listContainer: {
    width: '89.74%',
    height: 55,
    backgroundColor: '#EDD99C1C',
    marginLeft: 20,
    marginTop: 8,
    opacity: 0.9,
    borderRadius: 4,
    alignContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  btnContainer: {
    width: '24.36%',
    height: 45,
    borderRadius: 4,
    marginLeft: 6,
    marginRight: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  btnContainerActive: {
    backgroundColor: '#FAECBF',
    borderColor: '#FFB90A',
    borderRadius: 4,
    borderWidth: 0.5,
  },
  btnText: {
    color: '#332F2E',
    fontSize: 15,
    fontWeight: '400',
  },
  btnTextActive: {
    fontSize: 15,
    fontWeight: '600',
    color: '#332F2E',
  },
  priceBarContainer: {
    width: '89.74%',
    height: 66,
    marginTop: 35,
    backgroundColor: '#E94B64',
    borderRadius: 15,
    left: '50%',
    marginLeft: '-44.87%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 25,
  },
  ViewCartContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 28,
  },

  cartText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 25,
    right: 28,
    position: 'absolute',
  },
  addcontainer: {
    height: 56,
    width: 196,
    alignSelf: 'center',
    backgroundColor: '#E94B64',
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    // marginTop: 32,
  },
  AddCartText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    marginLeft: 24,
  },
});

const SearchIcon = styled.View`
  position: absolute;
  width: 26.07px;
  height: 26.07px;
  margin-left: 20px;
`;

const ProductNameContainer = styled.View`
  left: 50%;
  width: 244px;
  height: 25px;
  position: absolute;
  align-items: center;
  margin-left: -122px;
`;

const PerIcon2 = styled.View`
  position: absolute;
  right: 27px;
  /* background: black; */
`;

const strengthData = [
  {
    status: 'Dark',
  },
  {
    status: 'Medium',
  },
  {
    status: 'High',
  },
];

const levelData = [
  {
    level: 'Low',
  },
  {
    level: 'Medium',
  },
  {
    level: 'High',
  },
];

const volumeDat = [
  {
    volume: 'Low',
  },
  {
    volume: 'Medium',
  },
  {
    volume: 'High',
  },
];

const CartaddContainer = styled.View`
  width: 54.1%;

  height: 56px;
  /* background-color: black; */

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AddContainer = styled.View`
  width: 57px;
  height: 57px;
  background: #e5e5ea;
  border-radius: 8px;
  opacity: 0.6;
  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;

const AddText = styled.Text`
  color: #22292e;
  font-weight: 400;
  font-size: 16px;
`;

const CountContainer = styled.View`
  width: 57px;
  height: 57px;

  border: 1px solid #c6c6c8;
  border-radius: 8px;

  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.View`
  width: 57px;
  height: 57px;
  background: #e5e5ea;
  border-radius: 8px;
  opacity: 0.6;
  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;
