import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
} from "react-native";

import { ColorTheme, icon } from "../Constant";
import styled from "styled-components";
import React, { useState } from "react";
import Lottie from "lottie-react-native";
import DatePicker from "react-native-date-picker";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import database from "@react-native-firebase/database";
const Height = Dimensions.get("window").height;

function renderProduct() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.cuponContainer}>
        <Image
          source={icon.AppliedCoupon}
          style={{ width: 27, height: 27, marginTop: 20, marginLeft: 26 }}
        />
        <Text style={styles.CouponName}>CAFE50</Text>
        <Text style={styles.CouponSub}>Coupon applied on the bill</Text>
        <TouchableOpacity
          style={{ marginTop: 28.65, right: 26.15, position: "absolute" }}
          onPress={() => {
            setCoupon("false");
          }}
        >
          <Image
            source={icon.close}
            style={{
              width: 9.21,
              height: 9.21,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const renderDelivery = ({ item, index }) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setstatus(item.type);
        setscheduleOrder(item.type);
        // this.setState({status: item.type}),
        //   this.setState({scheduleOrder: item.type});
      }}
    >
      <View style={{ justifyContent: "center", marginTop: 7 }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            source={item.icon}
            style={{ width: 27, height: 27, marginTop: 13, marginLeft: 26 }}
          />
          <Text style={styles.DeliveryText}>{item.type}</Text>
          <Text style={styles.DeliveryTextSub}>{item.dis}</Text>
          <TouchableOpacity
            style={{ marginTop: 18, right: 26.15, position: "absolute" }}
          >
            {status == item.type ? (
              <Image
                source={icon.SelectedDelivery}
                style={{
                  width: 14,
                  height: 14,
                }}
              />
            ) : (
              <Image
                source={icon.UnSelectedDelivery}
                style={{
                  width: 14,
                  height: 14,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// const renderItem = ({ item, index }) => {
//   return (
//     <TouchableOpacity key={index} style={{ marginTop: 16 }}>
//       <BigContainer style={{ flex: 1, backgroundColor: ColorTheme.white }}>
//         <Container>
//           <ProductContainer>
//             <Image
//               style={{ width: "100%", height: "100%" }}
//               source={item.url}
//               // {icon.Filtercoffee}
//             />
//           </ProductContainer>
//           <PerText>
//             {/* Filter coffee */}
//             {item.productName}
//           </PerText>
//           <StarContainerall>
//             <Cont>
//               <StarContainer>
//                 <StarImage source={require("../assets/star.png")} />
//               </StarContainer>
//               <StarContainer>
//                 <StarImage source={require("../assets/star.png")} />
//               </StarContainer>
//               <StarContainer>
//                 <StarImage source={require("../assets/star.png")} />
//               </StarContainer>
//               <StarContainer>
//                 <StarImage source={require("../assets/stargray.png")} />
//               </StarContainer>
//               <StarContainer>
//                 <StarImage source={require("../assets/stargray.png")} />
//               </StarContainer>
//             </Cont>
//             <RatingText>
//               {item.RatingValue1}
//               {/* 23 */}
//             </RatingText>
//           </StarContainerall>
//           <PriceText>
//             {/* ₹60 */}
//             {item.price}
//           </PriceText>

//           <CartaddContainer>
//             <TouchableOpacity onPress={() => this.props.removeItem(item)}>
//               <AddContainer>
//                 <Image source={icon.Minus} style={{ height: 15, width: 15 }} />
//               </AddContainer>
//             </TouchableOpacity>

//             <CountContainer>
//               <AddText>{/* {this.props.cartItems.length} */}1</AddText>
//             </CountContainer>

//             <TouchableOpacity onPress={() => this.props.addItemToCart(item)}>
//               <SubContainer>
//                 <Image
//                   source={icon.Addition}
//                   style={{ height: 15, width: 15 }}
//                 />
//               </SubContainer>
//             </TouchableOpacity>
//           </CartaddContainer>

//           <PercentageContainer>
//             <PerIconC>
//               <Image
//                 source={icon.Coupon}
//                 style={{ height: 9.25, width: 9.25 }}
//               />
//             </PerIconC>
//             <PerTextC>
//               <PercentageText>{item.discount}</PercentageText>
//             </PerTextC>
//           </PercentageContainer>
//           <CustomText>CUSTOMIZE</CustomText>
//         </Container>
//       </BigContainer>
//     </TouchableOpacity>
//   );
// };

const Cart = ({ navigation }) => {
  const [status, setstatus] = useState("Delivery Now");
  const [chosenDate, setchosenDate] = useState(new Date());
  const [scheduleDeliveryType, setscheduleDeliveryType] = useState("");
  const [CartList, setCartList] = useState([]);
  const isFocused = useIsFocused();
  const [CartTotal, setcartTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [Coupon, setCoupon] = useState("true");
  const [CouponText, setCouponText] = useState("");
  const [CouponData, setCouponData] = useState([]);
  const [AppliedCouponData, SetAppliedCouponData] = useState([]);
  const [AppliedCouponValue, SetAppliedCouponValue] = useState("");
  const [CouponValue, SetCouponValue] = useState("0");
  const [Comment, setComment] = useState("");
  const [CouponCode, SetCouponCode] = useState("");

  const usergetdata = auth().currentUser;

  function onAuthStateChanged(user) {
    if (user) {
      //   // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      //   // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      //   // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      //   // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    if (usergetdata != null) {
      getCartItems();
      // console.log(condition);

      const getTotal = () => {
        let total = 0;
        CartList.map((item) => {
          total = total + item.qty * item.price;
        });
        // return total;
        setcartTotal(total);
        // console.log(CartTotal);
      };
      getTotal();
    }

    // console.log(' cart screen Total:' + CartTotal);

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // setLoading(true);
    database()
      .ref("/Coupon")
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        const newData = Object.keys(data).map((key) => ({
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
  }, [isFocused]);

  const CouponCheck = (Text) => {
    CouponData.map((itm) => {
      if (itm.Code == Text) {
        console.log("Coupocheck data" + itm);
        SetAppliedCouponData(itm);
        console.log("AppliedCouponValue" + itm.Price);
        SetCouponValue(itm.Price);
        SetAppliedCouponValue(itm.Price);
        SetCouponCode(itm.Code);
        setCoupon("false");
      } else if (itm.Code != Text) {
        console.log("Data Validated not suitable");
        SetAppliedCouponValue("0");
      }
    });
  };

  function renderProduct() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.cuponContainer}>
          <Image
            source={icon.AppliedCoupon}
            style={{ width: 27, height: 27, marginTop: 20, marginLeft: 26 }}
          />
          <Text style={styles.CouponName}>{AppliedCouponData.Code}</Text>
          <Text style={styles.CouponSub}>Coupon applied on the bill</Text>
          <TouchableOpacity
            style={{ marginTop: 28.65, right: 26.15, position: "absolute" }}
            onPress={() => {
              setCoupon("true"),
                SetAppliedCouponValue(""),
                SetAppliedCouponData("");
            }}
          >
            <Image
              source={icon.close}
              style={{
                width: 9.21,
                height: 9.21,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function Applycoupon() {
    return (
      <View style={{ width: "100%", height: 36 }}>
        <View style={styles.cmtContainer}>
          <TextInput
            onChangeText={(txt) => setCouponText(txt)}
            // ref={SearchRef}
            placeholder="Enter the valid coupon code"
            keyboardType="default"
            style={{
              padding: 10,
              color: "#332F2E",
              width: 180,
              fontSize: 13,
            }}
          ></TextInput>
          <TouchableOpacity
            // style={{ position: "absolute" }}
            onPress={() => {
              CouponCheck(CouponText);
            }}
          >
            <View
              style={{
                width: 120,
                height: 38,

                // borderColor: "black",
                borderRadius: 8,
                borderTopStartRadius: 0,
                borderBottomStartRadius: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E94B64",
                // alignSelf: "center",
                // marginRight: 10,
                // marginLeft: 175,
              }}
            >
              <Text style={{ color: "white" }}>Apply</Text>
            </View>
          </TouchableOpacity>
        </View>
        {AppliedCouponValue == "0" ? (
          <Text style={{ marginLeft: 40, paddingTop: 5, color: "red" }}>
            *Invalied Coupon
          </Text>
        ) : (
          <View
            style={{
              // backgroundColor: "red",
              height: 30,
            }}
          />
        )}
      </View>
    );
  }

  const getCartItems = async () => {
    setLoading(true);
    const userId = usergetdata.uid;
    const user = await firestore().collection("users").doc(userId).get();
    setCartList(user._data.cart);

    // const TotalCartvalue = getTotal();
    // setcartTotal(TotalCartvalue);
    setLoading(false);
  };
  const getItem = () => {
    let total = 0;
    CartList.map((item) => {
      total = total + item.qty;
    });
    return total;
    // setcartTotal(total);
    // console.log(CartTotal);
  };
  const getTotal = () => {
    let total = 0;
    CartList.map((item) => {
      total = total + item.qty * item.price;
    });

    return total;
  };

  const ToPay = () => {
    let total = 0;
    CartList.map((item) => {
      total = total + item.qty * item.price;
    });
    let ToPay = total - CouponValue;

    return ToPay;
  };

  function PriceTag() {
    return (
      <View style={styles.priceContainer}>
        <Text style={styles.totalText}>Item total</Text>
        <Text style={styles.totalPrice}>
          {/* ₹300 */}₹
          {
            getTotal()

            // getItem()
          }
        </Text>
        <Text style={styles.CouponText}>Coupon discount</Text>
        <Text style={styles.couponValue}>
          {AppliedCouponData == "" ? "₹0" : "- ₹" + AppliedCouponData.Price}
        </Text>
        <View
          style={{
            width: 311,
            height: 1,
            backgroundColor: "#ebe8e4",
            position: "absolute",
            alignSelf: "center",
            marginTop: 78,
          }}
        />
        <Text style={styles.deliveryText}>Delivery Charge</Text>
        <Text style={styles.disText}>(No delivery charge for this order)</Text>
        <Text style={styles.deliveryamount}>Free</Text>
        <Text style={styles.TaxesText}>Taxes and charges</Text>
        <Text style={styles.TaxAmount}>₹0</Text>
        <View
          style={{
            width: 311,
            height: 1,
            backgroundColor: "#ebe8e4",
            position: "absolute",
            alignSelf: "center",
            marginTop: 154,
          }}
        />
        <Text style={styles.payText}>To pay</Text>
        <Text style={styles.payAmount}>
          ₹{ToPay()}
          {/* ₹{getTotal() - AppliedCouponValue} */}
          {/* {CartTotal - AppliedCouponValue} */}
          {/* {CartTotal} */}
        </Text>
      </View>
    );
  }

  const deleteitermfromCart = async (index) => {
    console.log("the deleteitermfromCart");
    const userId = usergetdata.uid;
    const user = await firestore().collection("users").doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.splice(index, 1);
    firestore().collection("users").doc(userId).update({
      cart: tempDart,
    });
    setCartList(user._data.cart);
    // getCartItems();
  };

  const RemoveitemfromCart = async (item) => {
    console.log("the RemoveitemfromCart");
    const userId = usergetdata.uid;
    // console.log(item);
    const user = await firestore().collection("users").doc(userId).get();
    let tempDart = [];
    console.log(tempDart);
    tempDart = user._data.cart;
    if (tempDart.length > 0) {
      tempDart.map((itm) => {
        if (itm.id == item.id) {
          itm.qty = itm.qty - 1;
          console.log("Remove from cart");
        }
        firestore().collection("users").doc(userId).update({
          cart: tempDart,
        });
      });
    }
    setCartList(user._data.cart);
    // getCartItems();
  };

  const addItemToCart = async (item) => {
    const userId = usergetdata.uid;
    const user = await firestore().collection("users").doc(userId).get();
    let tempDart = [];
    tempDart = user._data.cart;
    tempDart.map((itm) => {
      if (itm.id == item.id) {
        itm.qty = itm.qty + 1;
      }
    });
    firestore().collection("users").doc(userId).update({
      cart: tempDart,
    });
    setCartList(user._data.cart);
    // getCartItems();
  };

  const AddCartDataTotal = async () => {
    const userId = usergetdata.uid;
    firestore().collection("users").doc(userId).update({
      couponValue: CouponValue,
      CouponCode: CouponCode,
      orderComment: Comment,
      CartTotal: ToPay(),
    });
    navigation.navigate("Profile");
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          // alignSelf: 'center',
          // alignContent: 'center',
        }}
      >
        <Lottie
          source={require("../assets/97930-loading")}
          autoPlay={true}
          loop={true}
          duration={0}
          // loop={false}
          style={{ width: 100, height: 100 }}
        />
      </View>
      // <Text>Data is loading...</Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={"white"}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
      />

      {CartList.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              style={styles.BackContainer}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={icon.BackBotton}
                style={{ height: 25, width: 25, marginLeft: 25 }}
              />
            </TouchableOpacity>
            <Text style={styles.TitleText}>Your Order</Text>
          </View>
          <View style={styles.ImageContainer}>
            <Image
              source={icon.CartOrderSlider}
              style={{ height: 46, width: 317 }}
            />
          </View>
          <View style={{ marginTop: 20, backgroundColor: "black" }} />
          {CartList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("ProductTab2", {
                  product: item,
                  datas: item,
                });
              }}
            >
              <BigContainer style={{ flex: 1, backgroundColor: "white" }}>
                <Container>
                  <ProductContainer>
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={{
                        // {this.props.url}
                        uri: item.url,
                      }}
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
                        <StarImage source={require("../assets/stargray.png")} />
                      </StarContainer>
                      <StarContainer>
                        <StarImage source={require("../assets/stargray.png")} />
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

                  <View style={{ position: "absolute" }}>
                    <CartaddContainer>
                      <TouchableOpacity
                        onPress={() => {
                          if (item.qty > 1) {
                            RemoveitemfromCart(item);
                          } else {
                            deleteitermfromCart(index);
                          }
                          // setcondition('false');
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
                          addItemToCart(item);
                          // setcondition('false');
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
          ))}

          {Coupon == "false" ? renderProduct() : Applycoupon()}
          <View style={{ height: 15 }}></View>

          {scheduleDeliveryType !== "" ? (
            <View style={styles.scheduledOrderContainer}>
              <View
                style={{
                  flexDirection: "row",
                  right: 21,
                  marginTop: 16,
                  position: "absolute",
                  // justifyContent: 'center',
                  alignItems: "center",
                }}
              >
                <Text style={styles.scheduledOrderText}>Schedulede</Text>
                <Image
                  source={icon.scheduledelivery}
                  style={{
                    width: 18,
                    height: 18,
                    // marginTop: 13,
                    // marginLeft: 26,
                  }}
                />
              </View>
              <Text style={styles.TextName}>Hi Ruthran!</Text>
              <Text style={styles.TextTiming}>
                Your oredr arriving on
                {/* {chosenDate?.toDateString()} (
                {chosenDate?.toTimeString()}) */}
                {" " +
                  chosenDate.toDateString() +
                  " " +
                  chosenDate.getHours() +
                  ":" +
                  chosenDate.getMinutes() +
                  ":" +
                  chosenDate.getSeconds()}
                {/* {
                  chosenDate.getDate() + chosenDate.getMonth()
                  // chosenDate.getFullYear()
                } */}
                {/* {this.state.chosenDate?.toTimeString()} */}
                {/* {this.state.chosenDate?.getHours()/this.state.chosenDate?.getMinutes() } */}
              </Text>
              <View
                style={{ flexDirection: "row", marginLeft: 25, marginTop: 19 }}
              >
                <TouchableOpacity
                  style={styles.cancelButton3}
                  onPress={() => {
                    setscheduleDeliveryType("");
                    setstatus("Delivery Now");
                    // setState({scheduleDeliveryType: ''}),
                    //   setState({status: 'Delivery Now'});
                  }}
                >
                  <Text style={styles.buttonTex3}>Delivery Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.setButtonContainer}
                  onPress={() => {
                    setscheduleDeliveryType("schedule your delivery");

                    // console.log(this.state.chosenDate);
                  }}
                >
                  <Text style={styles.buttonText2}>Reschedule</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.deliveryContainer}>
              <View style={styles.divContainer} />

              {buttonData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setstatus(item.type), setscheduleDeliveryType(item.type);
                    // this.setState({status: item.type}),
                    //   this.setState({scheduleDeliveryType: item.type});
                  }}
                >
                  <View style={{ justifyContent: "center", marginTop: 6 }}>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={item.icon}
                        style={{
                          width: 27,
                          height: 27,
                          marginTop: 13,
                          marginLeft: 26,
                        }}
                      />

                      <Text style={styles.DeliveryText}>{item.type}</Text>
                      <Text style={styles.DeliveryTextSub}>{item.dis}</Text>
                      <TouchableOpacity
                        style={{
                          marginTop: 18,
                          right: 26.15,
                          position: "absolute",
                        }}
                      >
                        {status == item.type ? (
                          <Image
                            source={icon.SelectedDelivery}
                            style={{
                              width: 14,
                              height: 14,
                            }}
                          />
                        ) : (
                          <Image
                            source={icon.UnSelectedDelivery}
                            style={{
                              width: 14,
                              height: 14,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* //////// */}

          {/* //////// */}
          <View style={styles.cmtContainer2}>
            <TextInput
              // ref={SearchRef}
              placeholder="Write instructions for smoother delivery"
              keyboardType="default"
              style={{
                padding: 10,
                color: "#332F2E",
                width: "86%",
                // alignSelf: 'center',
              }}
              onChangeText={(txt) => setComment(txt)}
            ></TextInput>
            {/* <Text style={styles.cmtText}>
                Write instructions for smoother delivery
              </Text> */}
            <TouchableOpacity style={{ position: "absolute", right: 29 }}>
              <Image source={icon.Edit} style={{ width: 12, height: 12 }} />
            </TouchableOpacity>
          </View>
          {PriceTag()}
          <TouchableOpacity
            style={styles.bottomCon}
            onPress={() => {
              // addCartTotalValue();
              AddCartDataTotal();
              navigation.push("AddressPage");
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#ffffff" }}>
              Confirm Order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              style={styles.BackContainer}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={icon.BackBotton}
                style={{ height: 25, width: 25, marginLeft: 25 }}
              />
            </TouchableOpacity>
            <Lottie
              source={require("../assets/108106-empty-cart.json")}
              autoPlay={true}
              loop={false}
              duration={3500}
              style={{
                width: 300,
                height: 300,
                marginTop: 70,
                alignSelf: "center",
              }}
            />
            <Text style={styles.cartText}>Your cart is empty</Text>

            <Text style={styles.CartCaptionText}>
              Looks like you haven't added anything to your cart yet
            </Text>
            <TouchableOpacity
              style={styles.ReturnContainer}
              onPress={() => navigation.navigate("Home1")}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "700", color: "#FFFFFF" }}
              >
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.blackContainer,
          scheduleDeliveryType == "schedule your delivery" &&
            styles.blackContainer1,
        ]}
        onPress={() => {
          setscheduleDeliveryType("Delivery Now");
          // this.setState({scheduleDeliveryType: 'Delivery Now'});
        }}
      />
      <View
        style={[
          styles.scheduleOrder,
          scheduleDeliveryType == "schedule your delivery" &&
            styles.scheduleOrder1,
        ]}
      >
        <View style={styles.dateContainer}>
          <Text style={styles.TextSchodule1}>Delivery Schodule On</Text>
          <Text style={styles.TextSchodule2}>
            {/* 25 Octobar */}
            {chosenDate?.toDateString()}
            {/* {this.state.chosenDate?.toString()} */}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 32,
            // backgroundColor: 'black',
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={icon.Schoudle} style={{ width: 31, height: 31 }} />
          <Text style={styles.TextSchodule3}>
            choose your prefered delivery timing
          </Text>
        </View>
        <View style={styles.calenderContainer}>
          <DatePicker
            mode="time"
            style={{ position: "absolute", marginLeft: 25 }}
            date={chosenDate}
            is24Hour={false}
            onDateChange={(setDate) => {
              setchosenDate(setDate), console.log("data:" + setDate);
            }}
          />
        </View>

        <View
          style={{
            height: 56,
            width: "100%",
            // backgroundColor: 'black',
            justifyContent: "center",
            alignItems: "center",
            marginTop: 29,
            flexDirection: "row",
          }}
        >
          {/* onPress={() => {
            this.setState({status: item.type}),
              this.setState({scheduleOrder: item.type});
          }}> */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setstatus("Delivery Now");
              setscheduleDeliveryType("Delivery Now");
              // this.setState({scheduleDeliveryType: 'Delivery Now'});
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.setButtonContainer}
            onPress={() => {
              setscheduleDeliveryType("Delivery Now");
              // this.setState({scheduleDeliveryType: 'Delivery Now'});
              console.log(chosenDate);
            }}
          >
            <Text style={styles.buttonText2}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Cart;

const styles = StyleSheet.create({
  payAmount: {
    marginTop: 164,
    fontSize: 13,
    fontWeight: "500",
    color: "#363032",
    position: "absolute",
    right: 16,
  },
  payText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#363032",
    marginTop: 163,
    marginLeft: 16,
    position: "absolute",
  },
  TaxAmount: {
    marginTop: 128,
    fontSize: 13,
    fontWeight: "500",
    color: "#363032",
    position: "absolute",
    right: 16,
  },
  TaxesText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#363032",
    marginTop: 126,
    marginLeft: 16,
    position: "absolute",
  },
  deliveryamount: {
    marginTop: 91,
    fontSize: 13,
    fontWeight: "500",
    color: "#363032",
    position: "absolute",
    right: 16,
  },
  disText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#363032",
    marginTop: 107,
    marginLeft: 16,
    opacity: 0.4,
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#363032",
    marginTop: 89,
    marginLeft: 16,
    position: "absolute",
  },
  couponValue: {
    marginTop: 50,
    fontSize: 13,
    fontWeight: "500",
    color: "#363032",
    position: "absolute",
    right: 16,
  },
  CouponText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#363032",
    marginTop: 49,
    marginLeft: 16,
    position: "absolute",
  },
  totalPrice: {
    marginTop: 27,
    fontSize: 13,
    fontWeight: "500",
    color: "#363032",
    position: "absolute",
    right: 16,
  },
  priceContainer: {
    width: "87.69%",
    height: 210,
    backgroundColor: "#FFFDF8",
    alignSelf: "center",
    marginTop: 21,
    borderRadius: 15,
    borderColor: "#FFE39d",
    borderWidth: 1,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#363032",
    marginTop: 25,
    marginLeft: 16,
    position: "absolute",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  BackContainer: {
    width: "100%",
    height: 25,
    justifyContent: "center",
    marginTop: 32,
  },
  TitleText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#332F2E",
    marginTop: 32,
    alignSelf: "center",
    position: "absolute",
  },
  ImageContainer: {
    width: "100%",
    height: 46,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  CouponName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E94B64",
    marginLeft: 16,
    marginTop: 16,
  },
  CouponSub: {
    fontSize: 12,
    fontWeight: "400",
    color: "#332F2E",
    position: "absolute",
    marginTop: 36,
    marginLeft: 68,
  },
  DeliveryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E94B64",
    marginLeft: 68,
    position: "absolute",
    marginTop: 9,
  },
  cmtContainer2: {
    width: "87.44%",
    height: 36,
    borderWidth: 1,
    borderColor: "#99939229",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 22,
    justifyContent: "center",
  },
  DeliveryTextSub: {
    fontSize: 12,
    fontWeight: "400",
    color: "#332F2E",
    position: "absolute",
    marginTop: 28,
    marginLeft: 68,
    opacity: 0.7,
  },
  bottomCon: {
    width: "89.74%",
    height: 66,
    backgroundColor: "#E94B64",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  cmtText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#332F2E",
    opacity: 0.45,
    marginLeft: 13,
  },
  scheduledOrderContainer: {
    width: "87.69%",
    height: 169,
    backgroundColor: "#f7f7f7",
    alignSelf: "center",

    borderRadius: 15,
  },
  scheduledOrderText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#332F2E",
    marginRight: 2,
  },
  TextName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E94B64",
    marginLeft: 24,
    marginTop: 39,
  },
  TextTiming: {
    fontSize: 10,
    fontWeight: "400",
    color: "#6E6B6A",
    marginTop: 2,
    marginLeft: 22,
  },
  cmtContainer: {
    width: "50%",
    flexDirection: "row",
    height: 40,
    borderWidth: 1,
    borderColor: "#99939229",
    borderRadius: 8,

    marginLeft: 30,
    borderRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  divContainer: {
    width: "77.18%",
    height: 1,
    backgroundColor: "#000000",
    opacity: 0.1,
    alignSelf: "center",
    position: "absolute",
    marginTop: 54,
  },
  deliveryContainer: {
    width: "87.69%",
    height: 106,
    backgroundColor: "#F7F7F7",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 15,
  },
  cuponContainer: {
    width: "87.69%",
    height: 66,
    backgroundColor: "#F0FEE7",
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#A3CD5D85",
    // alignItems: 'center',
    flexDirection: "row",
  },
  cartText: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 20,
    color: "black",
  },
  CartCaptionText: {
    fontSize: 15,
    fontWeight: "400",
    width: 200,
    textAlign: "center",
    color: "gray",
    // justifyContent: 'center',
    alignSelf: "center",
    marginTop: 10,
  },
  ReturnContainer: {
    width: "77.95%",
    height: 66,
    backgroundColor: "#E94B64",
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    marginTop: Height - 150,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleOrderContainer: {
    width: "100%",
    height: 505,
    backgroundColor: "white",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    marginTop: Height - 100,

    // backgroundColor: 'black',
  },
  blackContainer: {
    backgroundColor: "black",
    opacity: 0.2,
    // flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    marginTop: Height,
  },
  blackContainer1: {
    marginTop: 0,
  },
  scheduleOrder1: {
    marginTop: Height - 505,
  },
  scheduleOrder: {
    height: 505,
    width: "100%",
    position: "absolute",
    backgroundColor: "white",
    marginTop: Height,
  },
  dateContainer: {
    width: "87.69%",
    height: 75,
    backgroundColor: "#EDEDED",
    // backgroundColor: 'black',
    alignSelf: "center",
    marginTop: 32,
    borderRadius: 15,
    alignItems: "center",
  },
  TextSchodule1: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E94B64",
    alignSelf: "center",
    marginTop: 16,
  },
  TextSchodule2: {
    fontSize: 16,
    fontWeight: "400",
    color: "#332F2E",
    // alignSelf: 'center',
    // marginTop: 37,
  },
  TextSchodule3: {
    fontSize: 17,
    fontWeight: "600",
    color: "#332F2E",
    marginLeft: 8,
  },
  calenderContainer: {
    width: "75.13%",
    height: 198,
    borderWidth: 1,
    borderColor: "#332F2E",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 8,
  },
  cancelButton: {
    height: 56,
    width: "35.52%",
    borderWidth: 1,
    borderColor: "#4E4E4E",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton3: {
    height: 56,
    width: "35.52%",
    borderWidth: 1,
    borderColor: "#4E4E4E",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    // color: 'white',
    color: "black",
  },
  buttonTex3: {
    fontSize: 15,
    fontWeight: "500",
    // color: 'white',

    color: "#CDCDCD",
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: "500",
    // color: 'white',
    color: "white",
  },
  setButtonContainer: {
    height: 56,
    width: "35.52%",
    backgroundColor: "#E94B64",
    marginLeft: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

const BigContainer = styled.View``;
const Container = styled.View`
  width: 90%;
  height: 106px;
  border: 0.25px solid #dadada;
  border-radius: 15px;
  margin-left: 20px;
  margin-bottom: 10px;
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
  width: 72.27px;
  height: 18.77px;
  position: absolute;
  align-items: center;
  flex-direction: row;
  margin-left: 122px;
  margin-top: 39px;
  border: 0.5px solid rgba(247, 221, 135, 0.54);
  border-radius: 3px;
`;

const Cont = styled.View`
  flex-direction: row;
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
  border-radius: 20px;
  margin-left: 80%;
  margin-top: 33px;
  background: #e94b64;
  border: 1px solid #e94b64;
`;

const CartaddContainer = styled.View`
  width: 28.46%;
  height: 34px;
  /* position: absolute; */
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
  border: 1px solid #c6c6c8;
  border-radius: 8px;
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
  width: 60px;
  height: 17px;
  background: #f7dd87;
  position: absolute;
  overflow: hidden;
  justify-content: center;
`;

const PerIconC = styled.View`
  margin-left: 7px;
`;

const PerTextC = styled.View`
  position: absolute;
  right: 7px;
`;

const PercentageText = styled.Text`
  font-weight: 600;
  font-size: 8px;
  color: #332f2e;
  right: 2px;
`;

const CustomText = styled.Text`
  font-weight: 400;
  font-size: 10px;
  color: #e94b64;
  right: 20px;
  position: absolute;
  margin-top: 9px;
`;

const data = [
  {
    url: icon.Filtercoffee,
    productName: "Filter coffee",
    RatingValue1: "25",
    price: "₹60",
    discount: "25% OFF",
    status: "coffee",
  },
  {
    url: icon.Espresso,
    productName: "Espresso",
    RatingValue1: "30",
    price: "₹120",
    discount: "25% OFF",
  },
  {
    url: icon.cappuccino,
    productName: "cappuccino",
    RatingValue1: "28",
    price: "₹150",
    discount: "25% OFF",
  },
];

const buttonData = [
  {
    type: "Delivery Now",
    dis: "Instant delivery",
    icon: icon.DeliveryNow,
    selectedicon: icon.SelectedDelivery,
  },
  {
    type: "schedule your delivery",
    dis: "Choose desired time by delivery date",
    icon: icon.scheduledelivery,
    selectedicon: icon.UnSelectedDelivery,
  },
];
