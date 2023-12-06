import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";

import React, { useState, useEffect } from "react";
import { ColorTheme, icon } from "../Constant";
import { useIsFocused } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useRoute } from "@react-navigation/native";

const height = Dimensions.get("window").height;

export default function AddProfile({ navigation }) {
  const [emailid, setemailid] = useState("");
  const [Name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [Invalied, setInvalied] = useState("false");

  const usergetdata = auth().currentUser;

  const AddProfileData = async () => {
    const userId = usergetdata.uid;
    firestore()
      .collection("users")
      .doc(userId)
      .update({
        email: emailid,
        name: Name,
        mobile: "+91" + mobile,
      });
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.TitleText}>Add Profile</Text>
        </View>
        <TextInput
          style={[styles.inputStyle, Name != "" && styles.selinputStyle]}
          placeholder={"Enter Name "}
          value={Name}
          onChangeText={(txt) => setName(txt)}
        />
        <TextInput
          style={[styles.inputStyle, mobile != "" && styles.selinputStyle]}
          placeholder={"Enter Mobile Number "}
          value={mobile}
          maxLength={10}
          keyboardType={"number-pad"}
          onChangeText={(txt) => setmobile(txt)}
        />
        <TextInput
          style={[styles.inputStyle, emailid != "" && styles.selinputStyle]}
          placeholder={"Enter Email Id "}
          keyboardType={"number-pad"}
          value={emailid}
          onChangeText={(txt) => setemailid(txt)}
        />
        {Invalied == "true" ? (
          <Text
            style={{
              color: "red",
              marginLeft: 20,
              marginTop: 20,
              fontWeight: "400",
              fontSize: 13,
            }}
          >
            *Invalid data, Please enter a valid data.
          </Text>
        ) : (
          <View />
        )}

        <TouchableOpacity
          style={{
            width: "89.74%",
            height: 66,
            backgroundColor: "#E94B64",
            alignSelf: "center",
            borderRadius: 15,
            // marginTop: height - 50,
            marginTop: 60,
            marginBottom: 21,
            // position: 'absolute',
            justifyContent: "center",
            alignItems: "center",
            // bottom: 30,
          }}
          onPress={() => {
            if (Name != "" && emailid != "" && mobile.length == 10) {
              AddProfileData();
            } else {
              setInvalied("true");
            }
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#ffffff" }}>
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  TextInputS: {
    width: "68.21%",
    height: 40,
    borderRadius: 15,
    marginLeft: 37,
    padding: 10,
    color: "black",
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 0.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    borderColor: "#EFEEEE",
  },
  selinputStyle: {
    backgroundColor: "#FFFBEE",
    borderColor: "#F7DD87",
  },
});

// style={{padding: 10, color: 'black'}}
