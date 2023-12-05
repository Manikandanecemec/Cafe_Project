import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import { icon } from "../Constant";

import Clipboard from "@react-native-clipboard/clipboard";

const CouponPage = ({ route, navigation }) => {
  const item = route.params.Coupon;
  const CouponValue = useState(new Animated.Value(170))[0];
  const BorderValue = useState(new Animated.Value(10))[0];
  const DottedlineValue = useState(new Animated.Value(188))[0];
  const CouponIcon = useState(new Animated.Value(100)[0]);
  const RectangleContainer = useState(new Animated.Value(54)[0]);

  const [RedeemOption, setRedeemOption] = useState("true");

  const [viewed, setviewed] = useState("false");

  const copyclipboard = (code) => {
    Clipboard.setString(code);
  };

  function CouponCall() {
    setRedeemOption("false");
    Animated.timing(CouponValue, {
      toValue: 190,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    console.log(RedeemOption);

    Animated.timing(BorderValue, {
      toValue: 27,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(DottedlineValue, {
      toValue: 205,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }
  function CouponReCall() {
    setRedeemOption("true");
    Animated.timing(CouponValue, {
      toValue: 170,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(BorderValue, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(DottedlineValue, {
      toValue: 188,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  function couponIconfun() {
    Animated.timing(CouponIcon, {
      toValue: 118,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  function RectangleContainerfun() {
    Animated.timing(RectangleContainer, {
      toValue: 274,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  function Combined() {
    CouponCall();
    // couponIconfun();
    console.log("Combined");
  }

  function CombinedRe() {
    CouponReCall();
    // RectangleContainerfun();
    console.log("CombinedRe");
  }

  const RectangleContainerer = {
    width: RectangleContainer,
  };

  return (
    <View style={styles.BackgroundContainer}>
      <StatusBar
        backgroundColor={"white"}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
      />
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
        <Text style={styles.TitleText}>Coupon</Text>
      </View>
      <View style={styles.CouponContainer}>
        <Animated.View
          // style={{
          //   height: couponIcon,
          //   width: couponIcon,
          //   alignSelf: 'center',
          //   marginTop: 35,
          //   position: 'absolute',
          // }}
          style={[
            styles.ImageContainer,
            // {height: CouponIcon, width: CouponIcon},
          ]}
        >
          <Image
            source={{
              // {this.props.url}
              uri: item.CopounImage,
            }}
            // source={item.CopounImage}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
        <Animated.View
          style={[styles.dotlineContainer, { marginTop: DottedlineValue }]}
        />
        {RedeemOption == "true" ? (
          <View style={{ position: "absolute" }}>
            <Text style={styles.ContentText1}>$15 off your next H&M buy</Text>
            <Text style={styles.ContentText2}>
              Valid at all H&M stores in the USA.
            </Text>
            <Text style={styles.ContentText3P}>
              Not valid with other discounts and campaigns.
            </Text>
            <Text style={styles.ContentText4P}>It has no cash value.</Text>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: 354,
                position: "absolute",
                // bottom: 0,
                // right: 10,
              }}
            >
              <Text style={styles.ContentText3}>
                Valid unltil is {item.Validity}
              </Text>

              <Image
                source={icon.info}
                style={{
                  height: 20,
                  width: 20,
                  position: "absolute",
                  right: -240,
                  // marginTop: 355,
                }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text style={styles.CouponText}>{item.Code}</Text>
            {viewed == "false" ? (
              <TouchableOpacity
                style={styles.CouponCopyConta}
                onPress={() => {
                  copyclipboard(item.Code);
                  setviewed("true");
                }}
              >
                <Text style={styles.ContentText4}>Copy Coupon</Text>
                <Image
                  source={icon.copy}
                  style={{
                    height: 17,
                    width: 17,
                    position: "absolute",
                    right: 18,
                    marginTop: 2,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.CouponCopyConta}>
                <Text style={styles.ContentText4}>Copied</Text>
              </View>
            )}

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: 27,
                // position: 'absolute',
                // bottom: 0,
              }}
            >
              <Text style={styles.ContentText3}>
                Valid unltil is {item.Validity}
              </Text>

              <Image
                source={icon.info}
                style={{
                  height: 20,
                  width: 20,
                  position: "absolute",
                  right: -260,
                  // marginTop: 355,
                }}
              />
            </View>
          </View>
        )}

        <Animated.View
          style={[styles.EllipseCoupon, { marginTop: CouponValue }]}
        />
        <Animated.View
          style={[styles.EllipseCouponleft, { marginTop: CouponValue }]}
        />
      </View>

      {RedeemOption == "false" ? (
        <Animated.View
          style={[styles.footerContainer2, { borderRadius: BorderValue }]}
        >
          <TouchableOpacity style={{ padding: 24 }} onPress={CombinedRe}>
            <Image source={icon.closewhite} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        // <Animated.View style={[styles.footerContainer, RectangleContainerer]}>
        <View style={[styles.footerContainer, { width: "70.26%" }]}>
          <TouchableOpacity
            style={{
              paddingLeft: 54,
              paddingRight: 54,
              position: "absolute",
              padding: 20,
            }}
            // style={[styles.footerContainer,{width: '70.26%',}]}

            onPress={Combined}
          >
            <Text style={styles.NowText}>Redeem Now</Text>
          </TouchableOpacity>
        </View>
        // </Animated.View>
      )}
    </View>
  );
};

export default CouponPage;

const styles = StyleSheet.create({
  BackgroundContainer: {
    flex: 1,
    backgroundColor: "white",
    // width: '100%',
    // height: '100%',
  },
  BackContainer: {
    width: "100%",
    height: 25,
    justifyContent: "center",
    marginTop: 15,
  },
  TitleText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#332F2E",
    marginTop: 15,
    left: "50%",
    marginLeft: -44,
    position: "absolute",
  },
  CouponContainer: {
    width: "73.33%",
    height: 392,
    backgroundColor: "#E94B64",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 33,
  },
  ImageContainer: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 35,
    position: "absolute",
  },
  CouponText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#ffffff",
    // position: 'absolute',
    alignSelf: "center",
    // marginLeft: 66,
    marginTop: 241,
  },
  CouponCopyConta: {
    width: 179,
    height: 38,
    backgroundColor: "#ffffff",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 6,

    marginTop: 25,
  },
  EllipseCoupon: {
    position: "absolute",
    width: 36,
    height: 36,
    backgroundColor: "white",
    borderRadius: 18,
    // marginTop: CouponValue,
    marginLeft: -18,
  },
  EllipseCouponleft: {
    position: "absolute",
    right: -18,
    width: 36,
    height: 36,
    backgroundColor: "white",
    borderRadius: 18,
    // marginTop: CouponValue,
  },
  dotlineContainer: {
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: "white",

    // position: 'absolute',
  },
  ContentText1: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "700",
    marginTop: 231,
    // alignSelf: 'center',
    // position: 'absolute',
    marginLeft: 27,
  },
  ContentText2: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ffffff",
    position: "absolute",
    marginTop: 255,
    marginLeft: 27,
  },
  ContentText3P: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ffffff",
    position: "absolute",
    marginTop: 275,
    marginLeft: 27,
  },
  ContentText4P: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ffffff",
    position: "absolute",
    marginTop: 305,
    marginLeft: 27,
  },

  ContentText3: {
    fontSize: 8,
    fontWeight: "500",
    color: "#ffffff",
    marginTop: 3,
    marginLeft: 93,
    alignSelf: "center",
    // marginTop: 38,
    position: "absolute",
  },
  ContentText4: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E94B64",
    marginTop: 3,
    // marginLeft: 93,
    alignSelf: "center",
    // marginTop: 38,
    position: "absolute",
  },
  footerContainer: {
    // width: '70.26%',
    height: 54,
    backgroundColor: "#E94B64",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    bottom: 151,
    borderRadius: 6,
  },
  footerContainer2: {
    width: 54,
    height: 54,
    backgroundColor: "#E94B64",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    bottom: 151,
    // borderRadius: 6,
  },
  footerContainer5: {
    width: "13.85%",
    height: 54,
    backgroundColor: "black",
    // position: 'absolute',
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    bottom: 151,
    // borderRadius: 6,
  },
  NowText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
  },
});
