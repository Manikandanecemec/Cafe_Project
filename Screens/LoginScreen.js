import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import auth from "@react-native-firebase/auth";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { icon } from "../Constant";
import database from "@react-native-firebase/database";

const LoginScreen = ({ navigation }) => {
  const pin1Ref = useRef("");
  const pin2Ref = useRef("");
  const pin3Ref = useRef("");
  const pin4Ref = useRef("");
  const pin5Ref = useRef("");
  const pin6Ref = useRef("");

  const [pin1, setpin1] = useState("");
  const [pin2, setpin2] = useState("");
  const [pin3, setpin3] = useState("");
  const [pin4, setpin4] = useState("");
  const [pin5, setpin5] = useState("");
  const [pin6, setpin6] = useState("");

  const [mobilenumber, setmobilenumber] = useState("");
  const [receivedCode, setreceivedCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [phonecode, setphonecode] = useState("+91");
  const [Account, setAccount] = useState("false");
  // const [data, setdata] = useState('');

  const [timer, setTimer] = useState(60); // Set the initial timer value in seconds
  const [intervalId, setIntervalId] = useState(null);

  const handleBackspace = (currentRef, prevRef) => {
    if (currentRef.current && currentRef.current.isFocused()) {
      currentRef.current.clear();
      if (prevRef.current) {
        prevRef.current.focus();
      }
    }
  };

  useEffect(() => {
    console.log("trier useEffect");
    const otpTextConfirm = () => {
      var otpconfirmText = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
      // console.log(otpconfirmText);
      setreceivedCode(otpconfirmText);
      // console.log(receivedCode);
      // confirmCode();
    };
    otpTextConfirm();

    /////////////////////////////???????????????????????????????????????

    if (timer > 0) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Save the interval ID to clear it later
      setIntervalId(id);
    }

    // Clear the interval and navigate to the ender mobile data screen when the timer is done
    if (timer === 0) {
      clearInterval(intervalId);
      // Call the function to navigate to the ender mobile data screen here
      // navigateToEndMobileDataScreen();
      setConfirm(null);
    }

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
    /////////////////////////////???????????????????????????????????????
  }, [pin6, timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  inputTextChange = (value) => {
    const number = phonecode + value;
    setmobilenumber(number);
    console.log("read the inpuutfuntion");
  };

  const user = auth().currentUser;
  const usergetdata = auth().currentUser;

  function onAuthStateChanged(user) {
    if (user) {
      //   // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      //   // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      //   // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      //   // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  // Do type the mobile number
  const CheckMobileNumber = () => {
    if (mobilenumber != "") {
      signInWithPhoneNumber();
      // otpTextConfirm();
    } else {
      alert("Enter the Mobile Number");
    }
  };

  // Set the firebase to mobile number
  const signInWithPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(mobilenumber);
    setConfirm(confirmation);
  };

  // Check the otp from the firebase
  const confirmCode = async () => {
    try {
      const res = await confirm.confirm(receivedCode);
      // alert('Sucess');
      console.log(res);
      var uidValue = res.user.uid;
      setAccount(uidValue);
      navigation.navigate("Home1");
    } catch (error) {
      console.log("Invalid code.");
    }
  };

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
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    // console.log('FirebaseUID' + uid);
  }

  useEffect(() => {
    // console.log("try1");

    const getData = async () => {
      if (usergetdata != null) {
        try {
          const userId = usergetdata.uid;

          // Validate user data
          if (Useruid) {
            const userDocRef = firestore().collection("users").doc(userId);

            // Check if the document already exists
            const docSnapshot = await userDocRef.get();

            if (!docSnapshot.exists) {
              // Document doesn't exist, create it
              await userDocRef.set({
                name: Username,
                email: Useremail,
                // Avoid storing passwords in plaintext
                // Use a secure authentication method instead
                password: UseremailVerified,
                mobile: UserphoneNumber,
                userId: userId,
                cart: [],
                address: [],
                orders: [],
                wishlist: [],
                couponValue: "0",
                CouponCode: "",
                orderComment: "",
                CartTotal: "0",
              });

              console.log("User document created successfully.");
            } else {
              console.log("User document already exists.");
            }
          } else {
            console.log("Invalid user data.");
          }
        } catch (error) {
          console.error("Error creating user document:", error);
        }
      }
    };
    getData();
  }, [Account]);

  if (!confirm) {
    // if (confirm) {
    return (
      <SafeAreaView>
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.BackgContainer}>
            <Image
              source={icon.LoginBackground}
              style={{ width: "100%", height: "100%", opacity: 0.1 }}
            />
            <Text style={styles.TitleText}>Hello!</Text>
            <Text style={styles.SubText}>Have a good day</Text>
          </View>
          <Text style={styles.LoginText}>Log in or Sign up</Text>
          <Text style={styles.captionText}>To place your order</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={styles.NumberContainer1}>
              <Image
                source={icon.Indianflaf}
                style={{ width: 26, height: 18 }}
              />
              <TouchableOpacity>
                <Image
                  source={icon.sortDown}
                  style={{ width: 18, height: 18, marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.NumberContainer}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#332F2E",

                  alignSelf: "center",
                  marginLeft: 16.53,
                }}
              >
                +91
              </Text>
              <TextInput
                style={styles.TextInputa}
                placeholder="Enter mobile number"
                placeholderTextColor="#B5B4B4"
                underlineColor="#F2F2F2"
                activeUnderlineColor="#F2F2F2"
                keyboardType="number-pad"
                selectionColor="#B5B4B4"
                maxLength={10}
                onChangeText={(value) => {
                  inputTextChange(value);
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => [CheckMobileNumber()]}
          >
            <Text style={styles.btnText}>Generate OTP</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.ContionText}>
          By clicking, I accept the terms and conditions & privacy policy
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.Container}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity onPress={() => setConfirm(null)}>
            <View style={styles.SeacrchIcon}>
              <Image
                source={icon.BackBotton}
                style={{ height: 26, width: 26 }}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.HeaderOtpText}>OTP Verification</Text>
        </View>
        <Text style={styles.OtpCodeText}>
          We have sent a verification code to
        </Text>
        <Text style={styles.MobileNumberText}>{mobilenumber}</Text>
        <Text style={styles.OtpHeaderText}>Enter your four digits OTP</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: "2.82%",
            justifyContent: "space-around",
            justifyContent: "space-between",
            width: "96%",
            alignSelf: "center",
          }}
        >
          <TextInput
            ref={pin1Ref}
            style={styles.TextInput}
            selectionColor="#DADADA"
            keyboardType="number-pad"
            maxLength={1}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            onChangeText={(pin1) => {
              setpin1(pin1);
              if (pin1 !== "") {
                pin2Ref.current.focus();
              }
            }}
          />
          <TextInput
            ref={pin2Ref}
            // value={pin2}
            style={styles.TextInput}
            selectionColor="#DADADA"
            keyboardType="number-pad"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            maxLength={1}
            onChangeText={(pin2) => {
              setpin2(pin2);
              if (pin2 !== "") {
                pin3Ref.current.focus();
              } else {
                handleBackspace(pin2Ref, pin1Ref);
              }
            }}
          />
          <TextInput
            ref={pin3Ref}
            // value={pin3}
            style={styles.TextInput}
            selectionColor="#DADADA"
            keyboardType="number-pad"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            maxLength={1}
            onChangeText={(pin3) => {
              setpin3(pin3);
              if (pin3 !== "") {
                pin4Ref.current.focus();
              } else {
                handleBackspace(pin3Ref, pin2Ref);
              }
            }}
          />
          <TextInput
            ref={pin4Ref}
            // value={pin4}
            style={styles.TextInput}
            selectionColor="#DADADA"
            keyboardType="number-pad"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            maxLength={1}
            onChangeText={(pin4) => {
              setpin4(pin4);
              if (pin4 !== "") {
                pin5Ref.current.focus();
              } else {
                handleBackspace(pin4Ref, pin3Ref);
              }
            }}
          />
          <TextInput
            ref={pin5Ref}
            // value={pin4}
            style={styles.TextInput}
            selectionColor="#DADADA"
            keyboardType="number-pad"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            maxLength={1}
            onChangeText={(pin5) => {
              setpin5(pin5);
              if (pin5 !== "") {
                pin6Ref.current.focus();
              } else {
                handleBackspace(pin5Ref, pin4Ref);
              }
            }}
          />
          <TextInput
            ref={pin6Ref}
            // value={pin4}
            style={styles.TextInput}
            selectionColor="#DADADA"
            keyboardType="number-pad"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            maxLength={1}
            onChangeText={(pin6) => {
              setpin6(pin6);

              if (pin6 === "") {
                handleBackspace(pin6Ref, pin5Ref);
              }
              console.log("trier ");
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.ButContainer}
          onPress={() => {
            // otpTextConfirm();
            confirmCode();
          }}
        >
          <Text style={styles.btnText}>Verify and Proceed</Text>
        </TouchableOpacity>
        <Text style={styles.captionText2}>
          Didn’t receive the OTP? Retry in {formatTime(timer)} sec
          {/* 00.08 */}
        </Text>
      </SafeAreaView>
    </>
  );
};
// }

export default LoginScreen;

const styles = StyleSheet.create({
  TextCon: {
    color: "black",
  },
  BackgContainer: {
    width: "100%",
    height: 289,
    backgroundColor: "#FFEDED",
  },
  TitleText: {
    fontSize: 85,
    fontWeight: "800",
    color: "#E94B64",
    position: "absolute",
    alignSelf: "center",
    marginTop: 80,
  },
  SubText: {
    fontSize: 24,
    fontWeight: "400",
    color: "#403C3B",
    letterSpacing: 0.1,
    textTransform: "uppercase",
    position: "absolute",
    alignSelf: "center",
    marginTop: 170,
  },
  LoginText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#332F2E",
    marginTop: 341,
    position: "absolute",
    alignSelf: "center",
  },
  captionText: {
    fontSize: 10,
    fontWeight: "400",
    color: "#332F2E",
    opacity: 0.5,
    position: "absolute",
    marginTop: 366,
    alignSelf: "center",
  },
  NumberContainer1: {
    width: "16.85%",
    height: 36,
    // backgroundColor: 'black',
    // position: 'absolute',
    marginTop: 109,
    borderRadius: 8,
    borderColor: "#EFEEEE",
    borderWidth: 1,
    marginRight: 11.77,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  NumberContainer: {
    width: "58.08%",
    height: 36,
    // backgroundColor: 'black',
    // position: 'absolute',
    justifyContent: "center",
    marginTop: 109,
    borderRadius: 8,
    borderColor: "#EFEEEE",
    flexDirection: "row",
    borderWidth: 1,
  },
  btnContainer: {
    width: "77.95%",
    height: 66,
    backgroundColor: "#E94B64",
    borderRadius: 15,
    position: "absolute",
    marginTop: 475,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnContainer1: {
    width: "77.95%",
    height: 66,
    backgroundColor: "#E94B64",
    borderRadius: 15,
    position: "absolute",
    marginTop: 700,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "white",
  },
  ContionText: {
    fontSize: 10,
    fontWeight: "400",
    // color: '#999392',
    color: "black",
    position: "absolute",
    marginTop: 777,
    // marginBottom: 59,
    alignSelf: "center",
  },
  TextInputa: {
    width: 200,
    height: 22,
    // alignSelf: 'center',
    backgroundColor: "FFFFFF",
    // padding: 7,
    justifyContent: "center",
  },

  //////////////////////////////////////////
  Container: {
    flex: 1,
    // width: '100%',
    // height: '100%',
    backgroundColor: "#ffffff",
  },
  SeacrchIcon: {
    width: 26.07,
    height: 26.07,
    marginLeft: 20,
    // alignSelf: 'center',
  },
  HeaderContainer: {
    marginTop: 25,
    flexDirection: "row",
    // alignItems: 'center',
  },
  HeaderOtpText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#332F2E",
    // marginRight: '50%',
    marginLeft: "23.08%",
    alignSelf: "center",
  },
  OtpCodeText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#706D6D",
    alignSelf: "center",
    marginTop: "14.87%",
  },
  MobileNumberText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#332F2E",
    alignSelf: "center",
  },
  OtpHeaderText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#706D6D",
    alignSelf: "center",
    marginTop: "13.33%",
  },
  TextInput: {
    width: 55,
    height: 55,
    backgroundColor: "#fffff",
    borderColor: "#E94B64",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 29,
    textAlign: "center",
    fontWeight: "700",
    // alignContent: 'center',
    // marginLeft: 30,
  },
  ButContainer: {
    width: "77.95%",
    height: 66,
    backgroundColor: "#E94B64",
    marginTop: "7.44%",
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
  },
  captionText2: {
    fontSize: 15,
    fontWeight: "400",
    color: "#706D6D",
    alignSelf: "center",
    marginTop: "2.45%",
  },
});
