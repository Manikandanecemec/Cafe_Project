import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { icon } from "../Constant";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RazorpayCheckout from "react-native-razorpay";

const AddressPage = ({ navigation }) => {
  const [Adressdata, setAdressdata] = useState("");
  const isFocused = useIsFocused();
  const usergetdata = auth().currentUser;
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [CartList, setCartList] = useState([]);
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [Name, setName] = useState("");
  const [userId, setuserId] = useState("");
  const [orderId, setorderId] = useState("");
  const [oredrNumber, setoredrNumber] = useState("");
  const [CartTotal, setCartTotal] = useState("");
  const [CouponCode, setCouponCode] = useState("");
  const [orderComment, setorderComment] = useState("");
  const [couponValue, SetcouponValue] = useState("");

  useEffect(() => {
    getAddressList();
    getCartItems();
    getorderDetails();
  }, [isFocused]);

  const getorderDetails = async () => {
    const user = await firestore().collection("OderDetails").doc("cafe").get();
    setorderId(user._data.orderID);
    setoredrNumber(user._data.oredrNumber);
  };

  const getCartItems = async () => {
    const userId = usergetdata.uid;
    const user = await firestore().collection("users").doc(userId).get();
    setCartList(user._data.cart);
    setmobile(user._data.mobile);
    setName(user._data.name);
    setemail(user._data.userId);
    setCartTotal(user._data.CartTotal);
    setCouponCode(user._data.CouponCode);
    setorderComment(user._data.orderComment);
    SetcouponValue(user._data.couponValue);
  };

  const saveDeafultAddress = async (item) => {
    // console.log(item.addressId);
    await AsyncStorage.setItem("ADDRESS", item.addressId);
    let tempDart = [];
    tempDart = Adressdata;
    tempDart.map((itm) => {
      if (itm.addressId == item.addressId) {
        itm.selected = true;
      } else {
        itm.selected = false;
      }
    });
    let temp = [];
    tempDart.map((item) => {
      temp.push(item);
      // console.log('check' + item);
    });
    setAdressdata(temp);
  };

  const getAddressList = async () => {
    const userId = usergetdata.uid;
    // const userId = await AsyncStorage.getItem('USERID');
    const addressId = await AsyncStorage.getItem("ADDRESS");

    // console.log(addressId);
    const user = await firestore().collection("users").doc(userId).get();
    let tempDart = [];
    tempDart = user._data.address;
    tempDart.map((item) => {
      if (item.addressId == addressId) {
        let temp = [];
        temp.push(item);
        setSelectedAddress(temp);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={"white"}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.BackContainer}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={icon.BackBotton}
            style={{ height: 25, width: 25, marginLeft: 25 }}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}>Address</Text>
      </View>
      <View style={styles.ImageContainer}>
        <Image
          source={icon.AddressOrderSlider}
          style={{ height: 46, width: 317 }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            color: "#332F2E",
            marginTop: 48,
            marginLeft: 21,
          }}
        >
          Saved Address
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", marginTop: 48, right: 23 }}
          onPress={() => {
            navigation.navigate("AddressList");
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#FE7474",
            }}
          >
            Change Address
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{marginTop: 20, height: 20, backgroundColor: 'black'}} /> */}
      {/* AdressContainer */}

      {/* AdressContainer */}
      <View style={{ marginTop: 29 }} />
      {selectedAddress == "" ? (
        <Text style={{ alignSelf: "center" }}>Add the Address** </Text>
      ) : (
        <FlatList
          // style={{height: 800}}
          data={selectedAddress}
          renderItem={({ item, index }) => {
            return (
              // <TouchableOpacity
              //   key={index}
              //   onPress={() => {
              //     // setstatus(i.street);
              //     // saveDeafultAddress(item);
              //   }}>
              <View key={index} style={[styles.ActiveContainer]}>
                <Image
                  source={icon.HomeAddress}
                  style={{
                    width: 30,
                    height: 30,
                    marginTop: 27,
                    marginLeft: 30,
                    position: "absolute",
                  }}
                />
                {/* <View style={{}}> */}
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#332F2E",
                    marginTop: 12,

                    marginLeft: 95,
                  }}
                >
                  {item.Name}
                </Text>
                <View
                  style={{
                    width: "50%",
                    height: 50,
                    // backgroundColor: 'black',
                    marginLeft: 95,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#363032",
                      opacity: 0.6,
                    }}
                  >
                    {/* No.31,Thirvalluvar salai, Villianur, Puducherry - 605 110 */}
                    No.
                    {item.DoorNumber +
                      ", " +
                      item.Street +
                      ", \n" +
                      item.City +
                      ", " +
                      item.Pincode +
                      ",\n" +
                      "+91 " +
                      item.mobile}
                  </Text>
                </View>
                {/* </View> */}
                <TouchableOpacity
                  style={{ position: "absolute", right: 15, marginTop: 15 }}
                >
                  <Image source={icon.Edit} style={{ width: 12, height: 12 }} />
                </TouchableOpacity>
              </View>
              // </TouchableOpacity>
            );
          }}
        />
      )}

      <TouchableOpacity
        style={{
          width: "89.74%",
          height: 66,
          backgroundColor: "#E94B64",
          alignSelf: "center",
          borderRadius: 15,
          marginTop: 650,
          marginBottom: 21,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
        // onPress={() => navigation.navigate('Payment')}
        onPress={() => {
          var options = {
            description: "Credits towards consultation",
            image:
              "https://firebasestorage.googleapis.com/v0/b/cafe-b2e32.appspot.com/o/2.png?alt=media&token=2721ad38-c18a-4a05-b0a6-aee349afe5f6&_gl=1*1j857e9*_ga*NjM4MDcxMDE2LjE2NjA4NzQyODI.*_ga_CW55HF8NVT*MTY5OTE1MDQxMi44My4xLjE2OTkxNTA2MzQuNTIuMC4w",
            currency: "INR",
            key: "rzp_test_JGJygOiH7WhpBX",
            amount: CartTotal * 100,
            name: "Cafe",
            order_id: "", //Replace this with an order_id created using Orders API.
            prefill: {
              email: "gaurav.kumar@example.com",
              contact:
                // '9191919191'
                mobile,
              // usergetdata.phoneNumber,
              name: Name,
            },
            theme: { color: "#53a20e" },
          };

          //         const[CouponCode,setCouponCode]=useState("");
          // const[orderComment,setorderComment]=useState('')
          // const[couponValue,SetcouponValue]=useState("")

          RazorpayCheckout.open(options)
            .then((data) => {
              // handle success
              navigation.navigate("Success", {
                status1: "success",
                paymentId: data.razorpay_payment_id,
                cartList: CartList,
                total: CartTotal,
                address: selectedAddress,
                userId: usergetdata.uid,
                userName: Name,
                userEmail: email,
                userMobile: mobile,
                CouponCode: CouponCode,
                orderComment: orderComment,
                couponValue: couponValue,

                orderID: orderId,

                ordernumber: oredrNumber,
                arrrivingAT: "18min Left (Today)",
                Numberofitems: CartList.length,
                status: "In progress",
                // status: "Delivered",
              });
              console.log(`Success: ${data.razorpay_payment_id}`);
              // alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch((error) => {
              // handle failure
              alert(`Error: ${error.code} | ${error.description}`);
            });
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#ffffff" }}>
          Confirm Order
        </Text>
      </TouchableOpacity>
      {/* Confirm Order Botton */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default AddressPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  BackContainer: {
    width: "100%",
    height: 25,
    // backgroundColor: 'black',
    justifyContent: "center",
    marginTop: 32,
  },
  ImageContainer: {
    width: "100%",
    height: 46,
    // backgroundColor: 'black',
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  TitleText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#332F2E",
    marginTop: 32,
    left: "50%",
    marginLeft: -41,
    // alignSelf: 'center',
    position: "absolute",
    // backgroundColor: 'black',
  },
  ActiveContainer: {
    width: "87.95%",
    height: 85,
    backgroundColor: "#FFFBEE",
    borderWidth: 1,
    borderColor: "#F7DD87",
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 15,
  },
  InActiveConatiner: {
    backgroundColor: "#FFFFFF",
    width: "87.95%",
    height: 85,
    borderWidth: 1,
    borderColor: "#F7DD87",
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 15,
  },
});

const data = [
  {
    AddressType: "Home",
    icon: icon.HomeAddress,
  },
  {
    AddressType: "Office",
    icon: icon.OfficeAddress,
  },
];
