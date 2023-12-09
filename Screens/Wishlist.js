import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import styled from "styled-components";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { ColorTheme, icon } from "../Constant";
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

const Wishlist = ({ navigation }) => {
  const [AddCondition, setAddCondition] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [Resgistered, setResgistered] = useState("false");
  const [wishlist, setwishlist] = useState([]);
  const isFocused = useIsFocused();
  const [Update, SetUpdate] = useState("");

  const increaseQuantity = (productId) => {
    setdata((prevdata) =>
      prevdata.map((product) =>
        product.id === productId
          ? { ...product, qty: product.qty + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setdata((prevdata) =>
      prevdata.map((product) =>
        product.id === productId && product.qty > 1
          ? { ...product, qty: product.qty - 1 }
          : product
      )
    );
  };

  function onAuthStateChanged(user) {
    if (user) {
      //   // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      //   // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      //   // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      //   // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }
  const usergetdata = auth().currentUser;

  var Username, Useremail, UserphotoUrl, Useruid, UseremailVerified;

  if (usergetdata != null) {
    Username = usergetdata.displayName;
    Useremail = usergetdata.email;
    UserphotoUrl = usergetdata.photoURL;
    UseremailVerified = usergetdata.emailVerified;
    Useruid = usergetdata.uid;
    UserphoneNumber = usergetdata.phoneNumber;
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    // console.log('FirebaseUID' + uid);
  }
  console.log(Useruid);

  const addItemToCart = async (item) => {
    const userId = Useruid;

    const user = await firestore().collection("users").doc(userId).get();
    let tempDart = [];
    console.log(tempDart);
    tempDart = user._data.cart;
    if (tempDart.length > 0) {
      let existing = false;
      tempDart.map((itm) => {
        if (itm.id == item.id) {
          itm.qty = itm.qty + 1;
          existing = true;
          console.log("existing to cart");
        }
        firestore().collection("users").doc(userId).update({
          cart: tempDart,
        });
      });
      if (existing == false) {
        tempDart.push(item);
        console.log("Added new to cart");
      }
    } else {
      tempDart.push(item);
    }
    firestore().collection("users").doc(userId).update({
      cart: tempDart,
    });
    // setCartList(user._data.cart);
  };

  const deleteitermfromCart = async (index) => {
    const userId = Useruid;
    const user = await firestore().collection("users").doc(userId).get();
    let tempDart = [];
    tempDart = user._data.wishlist;
    tempDart.splice(index, 1);
    firestore().collection("users").doc(userId).update({
      wishlist: tempDart,
    });
    console.log("the selected product is deleted to whishlist");
    // setCartList(user._data.cart);
    getwishlist();
  };

  const RemoveitemfromCart = async (item) => {
    const userId = Useruid;
    // console.log(item);
    const user = await firestore().collection("users").doc(userId).get();
    let tempDart = [];
    console.log(tempDart);
    tempDart = user._data.wishlist;
    if (tempDart.length > 0) {
      tempDart.map((itm) => {
        if (itm.id == item.id) {
          itm.qty = itm.qty - 1;
          console.log("Remove from cart");
        }
        firestore().collection("users").doc(userId).update({
          wishlist: tempDart,
        });
      });
    }
    // setCartList(user._data.cart);
    // getCartItems();
  };
  const getwishlist = async () => {
    const userId = usergetdata.uid;
    const user = await firestore().collection("users").doc(userId).get();
    setwishlist(user._data.wishlist);
    // saveUser();
  };
  useEffect(() => {
    if (Resgistered == "false") {
      // console.log('useffert cartlist:' + CartList);
      getwishlist();
      console.log("use effect");
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    database()
      .ref("/CafeCardData")
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        const newData = Object.keys(data).map((key) => ({
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
  }, [isFocused, Update]);

  if (loading) {
    return <Text>Data is loading...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.btnBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <SearchIcon>
            <Image source={icon.BackBotton} style={{ height: 26, width: 26 }} />
          </SearchIcon>
        </TouchableOpacity>
        <ProductNameContainer>
          <Text style={styles.productText}>Wishlist Product</Text>
        </ProductNameContainer>
      </View>
      {wishlist == "" ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50%",
            // position: 'absolute',
            // flex: 1,
          }}
        >
          <Text>No Have a wishlist</Text>
        </View>
      ) : (
        <ScrollView>
          {wishlist.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("TestProduct", {
                    product: item,
                    datas: data,
                  });
                }}
              >
                <BigContainer
                  style={{ flex: 1, backgroundColor: "white", marginTop: 10 }}
                >
                  <Container>
                    <ProductContainer>
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        // source={item.url ? {uri: item.url }}
                        source={{ uri: item.url !== "" ? item.url : undefined }}
                        // source={require(item.url)}
                        // source={item.url}
                      />
                    </ProductContainer>
                    <PerText>
                      {/* {this.props.productName} */}
                      {item.productName}
                    </PerText>
                    <StarContainerall>
                      <Cont>
                        <StarContainer>
                          <StarImage source={require("../assets/star.png")} />
                        </StarContainer>
                        <StarContainer>
                          <StarImage source={require("../assets/star.png")} />
                        </StarContainer>
                        <StarContainer>
                          <StarImage source={require("../assets/star.png")} />
                        </StarContainer>
                        <StarContainer>
                          <StarImage
                            source={require("../assets/stargray.png")}
                          />
                        </StarContainer>
                        <StarContainer>
                          <StarImage
                            source={require("../assets/stargray.png")}
                          />
                        </StarContainer>
                      </Cont>
                      <RatingText>
                        {/* {this.props.RatingValue1} */}
                        {item.RatingValue1}
                        {/* 23 */}
                      </RatingText>
                    </StarContainerall>

                    <PriceText>
                      {/* ₹60 */}
                      {/* {this.props.price} */}₹{item.price}
                    </PriceText>

                    {AddCondition == item.id ? (
                      <View style={{ position: "absolute" }}>
                        <CartaddContainer>
                          <TouchableOpacity
                            onPress={() => {
                              // RemoveitemfromCart(item);
                              deleteitermfromCart(index);
                              SetUpdate("updated");
                              // decreaseQuantity(item.id);
                              // // deleteitermfromCart(index);
                              // if (item.qty > 1) {
                              //   RemoveitemfromCart(item);
                              // } else {
                              //   deleteitermfromCart(index);
                              // }
                            }}
                          >
                            <AddContainer>
                              <Image
                                source={icon.Minus}
                                style={{ height: 15, width: 15 }}
                              />
                            </AddContainer>
                          </TouchableOpacity>

                          <CountContainer>
                            <AddText>{item.qty}</AddText>
                          </CountContainer>

                          <TouchableOpacity
                            onPress={() => {
                              // console.log(item.qty);
                              addItemToCart(item),
                                increaseQuantity(item.id),
                                SetUpdate("updated");
                            }}
                          >
                            <SubContainer>
                              <Image
                                source={icon.Addition}
                                style={{ height: 15, width: 15 }}
                              />
                            </SubContainer>
                          </TouchableOpacity>
                        </CartaddContainer>
                        <CustomText>CUSTOMIZE</CustomText>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          right: 37.58,
                          marginTop: 33,
                        }}
                        onPress={() => {
                          setAddCondition(item.id);
                          // console.log(item);
                        }}
                      >
                        <Image
                          source={icon.Ellipsewithplus}
                          style={{
                            height: 39.42,
                            width: 39.42,
                            alignSelf: "center",
                          }}
                        />
                      </TouchableOpacity>
                    )}

                    <PercentageContainer>
                      <PerIconC>
                        <Image
                          source={icon.Coupon}
                          style={{ height: 9.25, width: 9.25 }}
                        />
                      </PerIconC>
                      <PerTextC>
                        <PercentageText>
                          {/* {this.props.discount} */}
                          {item.discount}% OFF
                        </PercentageText>
                      </PerTextC>
                    </PercentageContainer>
                  </Container>
                </BigContainer>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Wishlist;

const SearchIcon = styled.View`
  width: 26.07px;
  height: 26.07px;
  /* margin-top: 25px; */
  margin-left: 20px;
`;

const dataData = [
  {
    id: 1,
    url: icon.Filtercoffee,
    productName: "Filter coffee",
    RatingValue1: "25",
    price: "₹60",
    discount: "25",
    status: "coffee",
  },
  {
    id: 2,
    url: icon.Espresso,
    productName: "Espresso",
    RatingValue1: "30",
    price: "₹120",
    discount: "25",
  },
  {
    id: 3,
    url: icon.cappuccino,
    productName: "cappuccino",
    RatingValue1: "28",
    price: "₹150",
    discount: "25",
  },
  {
    id: 4,
    url: icon.Filtercoffee,
    productName: "Filter coffee",
    RatingValue1: "25",
    price: "₹60",
    discount: "25",
  },
  {
    id: 5,
    url: icon.cappuccino,
    productName: "Filter coffee",
    RatingValue1: "25",
    price: "₹60",
    discount: "25",
  },
  {
    id: 6,
    url: icon.cappuccino,
    productName: "Filter coffee",
    RatingValue1: "25",
    price: "₹60",
    discount: "25",
  },
  {
    id: 7,
    url: icon.Espresso,
    productName: "Espresso",
    RatingValue1: "30",
    price: "₹120",
    discount: "25",
  },
];

const BigContainer = styled.View`
  margin-top: 7.57px;
  /* background-color:black; */
  /* background:black; */
`;
const Container = styled.View`
  width: 90%;
  height: 106px;
  border: 0.25px solid #dadada;
  border-radius: 15px;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const ProductContainer = styled.View`
  width: 109px;
  height: 106px;
  background: rgba(233, 230, 228, 0.32);
  border: 0.25px solid #ffffff;
  overflow: hidden;
  border-radius: 15px;
`;

const Imagee = styled.Image`
  width: 100%;
  height: 100%;
`;

const PerText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: #332f2e;
  position: absolute;
  margin-left: 128px;
  margin-top: 16px;
`;

const StarContainerall = styled.View`
  top: 3.98px;
  left: 5px;
  /* width:31px;
  height: 5.23px; */
  width: 72.27px;
  height: 18.77px;
  position: absolute;
  /* justify-content:center; */
  align-items: center;
  /* background:black; */
  flex-direction: row;
  margin-left: 122px;
  margin-top: 39px;
  border: 0.5px solid rgba(247, 221, 135, 0.54);
  border-radius: 3px;
`;

const Cont = styled.View`
  flex-direction: row;
  /* position:absolute; */
  margin-left: 6.57px;
`;

const StarContainer = styled.View`
  width: 6.55px;
  height: 6.87px;
  margin-right: 1.52px;
`;
const StarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const RatingText = styled.Text`
  font-weight: 400;
  font-size: 8px;
  color: #332f2e;
  left: 5.7px;
  justify-content: center;
`;

const PriceText = styled.Text`
  position: absolute;
  font-weight: 500;
  font-size: 11px;
  color: #e94b64;
  margin-left: 128px;
  margin-top: 76px;
`;

const Add = styled.View`
  width: 40px;
  height: 40px;
  /* background:black; */
  border-radius: 20px;
  /* position:absolute; */
  /* margin-left:256px; */
  margin-left: 80%;
  /* right:37.58px; */
  margin-top: 33px;
  background: #e94b64;
  border: 1px solid #e94b64;
`;

const CartaddContainer = styled.View`
  width: 28.46%;
  /* width:111px; */
  height: 34px;
  /* background: lightgrey; */
  margin-top: 59px;
  margin-left: 210px;
  flex-direction: row;
`;

const AddContainer = styled.View`
  width: 32px;
  height: 32px;
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
  font-size: 15px;
  /* background:black; */
`;

const CountContainer = styled.View`
  width: 32px;
  height: 32px;
  /* background: #E5E5EA; */
  border: 1px solid #c6c6c8;
  border-radius: 8px;
  /* opacity:0.6; */
  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.View`
  width: 32px;
  height: 32px;
  background: #e5e5ea;
  border-radius: 8px;
  opacity: 0.6;
  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;

const PercentageContainer = styled.View`
  /* width: 46px;
height: 13px; */
  width: 60px;
  height: 17px;
  background: #f7dd87;
  /* background:black; */
  /* border-radius: 3px; */
  position: absolute;
  overflow: hidden;
  /* margin-left:20px; */
  justify-content: center;
`;

const PerIconC = styled.View`
  margin-left: 7px;
  /* margin-top:3.94px; */
`;

const PerTextC = styled.View`
  position: absolute;
  right: 5px;
  /* margin-top:2px; */
`;

const PercentageText = styled.Text`
  font-weight: 600;
  font-size: 8px;
  color: #332f2e;
  /* left:5.92px; */
  right: 2px;
`;

const CustomText = styled.Text`
  font-weight: 400;
  font-size: 10px;
  color: #e94b64;
  position: absolute;
  margin-top: 9px;
  right: 10px;
  /* background: black; */
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  ProductContainer: {
    width: "100%",
    height: 378,
    backgroundColor: "#FDF8F4",
    borderBottomLeftRadius: 63,
    borderBottomRightRadius: 63,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageContainer: {
    width: 250,
    height: 250,
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  productText: {
    fontSize: 15,

    fontWeight: "700",
    color: "#332F2E",
    position: "absolute",
  },

  btnBarContainer: {
    width: "100%",
    height: 25,
    // position: 'absolute',
    marginTop: 32,
  },
  incrementContainer: {
    width: "100%",
    height: 107,
    justifyContent: "center",
    alignItems: "center",
  },
  tiltleText: {
    color: "#332F2E",
    fontWeight: "700",
    fontSize: 17,
    marginLeft: 19,
  },
  listContainer: {
    width: 350,
    height: 55,
    backgroundColor: "#EDD99C1C",
    marginLeft: 20,
    marginTop: 8,
    opacity: 0.9,
    borderRadius: 4,
    alignContent: "center",
    // justifyContent:"center",
    flexDirection: "row",
    marginBottom: 10,
  },
  btnContainer: {
    width: 95,
    height: 45,
    borderRadius: 4,
    marginLeft: 6,
    marginRight: 21,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  btnContainerActive: {
    // width:"24.36%",
    // height:45,
    backgroundColor: "#FAECBF",
    borderColor: "#FFB90A",
    borderRadius: 4,
    borderWidth: 0.5,
  },
  btnText: {
    color: "#332F2E",
    fontSize: 15,
    fontWeight: "400",
  },
  btnTextActive: {
    fontSize: 15,
    fontWeight: "600",
    color: "#332F2E",
  },
  priceBarContainer: {
    width: "89.74%",
    width: 350,
    height: 66,
    // marginTop: 35,
    backgroundColor: "#E94B64",
    borderRadius: 15,
    left: "50%",
    marginLeft: "-44.87%",

    marginBottom: 20,
    justifyContent: "center",
    // position: 'absolute',
  },
  itemText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 25,
  },
  ViewCartContainer: {
    // width:80,
    // height:28,
    // backgroundColor:"white",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 28,
  },

  cartText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 25,
    right: 28,
    position: "absolute",
  },
});

const ProductNameContainer = styled.View`
  left: 50%;
  width: 244px;
  height: 25px;
  position: absolute;
  align-items: center;
  margin-left: -122px;
`;
