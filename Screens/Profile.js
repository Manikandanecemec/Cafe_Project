import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { COLORS, icon } from "../Constant";
import { useIsFocused } from "@react-navigation/native";
import database from "@react-native-firebase/database";

const screenHeight = Dimensions.get("window").height;

export default function Profile({ navigation }) {
  const [Name, setName] = useState("");
  const [mobilenumber, setmobilenumber] = useState("");
  const [profile, setprofile] = useState("false");
  const [Email, setEmail] = useState("");
  const isFocused = useIsFocused();
  const [imageuri, setimageuri] = useState(
    require("../assets/ProfileImage.png")
  );

  const [uidid, setuidid] = useState("");

  const user = auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  useEffect(() => {
    // getItem();
    // console.log(user.phoneNumber);
    // console.log("data");
    // getUserDetails();

    const AddProfileData = async () => {
      const userId = user.uid;
      const user1 = await firestore().collection("users").doc(userId).get();
      let tempDart = [];
      tempDart = user1._data;
      setName(tempDart.name);
      setmobilenumber(tempDart.mobile);
      setEmail(tempDart.email);
      setuidid(tempDart.uid);
      // console.log('222222' + tempDart.password);
      // tempDart.push({});
    };
    AddProfileData();
  }, [isFocused]);

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
    phoneNumber = user.phoneNumber;
  }

  const opencamara = () => {
    const options = {
      // title: 'Select Avatar',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        mediatype: "photo",
        path: "images",
      },
      includeBasse64: true,
    };

    launchCamera(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };

        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setimageuri(source);
        // setimageuri(require('../assets/ProfileImage.png'));

        console.log("Tag:" + source);
        setprofile("false");
        uploadImage(imageuri);

        // let uploadUri =
        //   Platform.OS === 'ios' ? source.replace('file://', '') : source;
        //   firebase
        //     .database()
        //     .ref(user.uid)
        //     .putFile(source)
        //     .catch((error) => {
        //       alert(error);
        //     });
        //     uploadUri();

        // this.setState({
        //   avatarSource: source,
        // });

        const uploadImages = async () => {
          try {
            console.log(source.fileCopyUri.replace("file://", ""));
            console.log(source.name);
            const reference = storage().ref("/${ source.name}");
            const task = reference.putFile(
              source.fileCopyUri.replace("file://", "")
            );
          } catch (error) {
            I;
            console.log("Error->", error);
            alert("Error-> ${error}");
          }
          setLoading(false);
        };
        uploadImages();
      }
    });
  };

  const uploadImage = async (uri) => {
    try {
      const storage = firebase.storage();
      const reference = storage.ref("images/" + new Date().getTime());
      const task = await reference.putFile(uri);
      const url = await task.snapshot.ref.getDownloadURL();
      // Do something with the URL
    } catch (error) {
      // Handle error
    }
  };
  const openGallary = () => {
    const options = {
      // title: 'Select Avatar',
      // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        mediatype: "photo",
        path: "images",
      },
      includeBasse64: true,
    };

    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };

        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setimageuri(source);
        console.log("Tag:" + source);
        setprofile("false");
        uploadImage(imageuri);

        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

  const removeItem = async () => {
    auth()
      .signOut()
      .then(
        function () {
          console.log("Signed Out");
          navigation.navigate("login");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  };

  const AddProfileData = async () => {
    const userId = user.uid;
    const user1 = await firestore().collection("users").doc(userId).get();
    let tempDart = [];
    tempDart = user1._data;
    setName(tempDart.name);
    setmobilenumber(tempDart.mobile);
    setEmail(tempDart.email);
    setuidid(tempDart.uid);
    // console.log('222222' + tempDart.password);
    // tempDart.push({});
  };

  useEffect(() => {
    // getItem();
    console.log(user.phoneNumber);
    console.log("data");
    // getUserDetails();

    const AddProfileData = async () => {
      const userId = user.uid;
      const user1 = await firestore().collection("users").doc(userId).get();
      let tempDart = [];
      tempDart = user1._data;
      setName(tempDart.name);
      setmobilenumber(tempDart.mobile);
      setEmail(tempDart.email);
      setuidid(tempDart.uid);
      // console.log('222222' + tempDart.password);
      // tempDart.push({});
    };
    AddProfileData();
  }, [uidid]);

  return (
    <Container>
      {/* <StatusBar hidden /> */}
      {/* {AddProfileData()} */}
      <StatusBar
        backgroundColor={"#FDF8F4"}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
      />

      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <AccountTopContainer>
          <Image source={require("../assets/AccountBackround.png")} />
        </AccountTopContainer>
        <TouchableOpacity
          style={{ position: "absolute" }}
          onPress={() => navigation.navigate("Home1")}
        >
          <SearchIcon>
            <Image source={icon.BackBotton} style={{ height: 26, width: 26 }} />
          </SearchIcon>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddProfile", {
              // uid: Name.uid,
              uid: uidid,
            });
          }}
          style={{ position: "absolute", marginTop: 40, right: 29 }}
        >
          <Image source={icon.Edit} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>

        <ProfileI>
          <TouchableOpacity
            onPress={() => {
              setprofile("true");
            }}
          >
            <ProfileIcon>
              <ImageP source={imageuri} />
            </ProfileIcon>
          </TouchableOpacity>
          <NameText>{Email == null ? "Gust" : Name}</NameText>
          <MobileNumber style={styles.MobilenumberText}>
            {Email == ""
              ? "Enter Your Mobile Number"
              : // '+91' +
                mobilenumber}
          </MobileNumber>
        </ProfileI>
        <ProfileContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyOrderTab")}
            // onPress={() => {
            //   this.props.navigation.push('Product', {
            //     product: data,
            //     datas: CafeCardData,
            //   });
            // }}
          >
            <Container1>
              <ContainerIcon>
                <ImageContainer source={icon.Myorders} />
              </ContainerIcon>
              <ContainerText>My orders</ContainerText>
            </Container1>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Container2>
              <ContainerIcon>
                <ImageContainer source={icon.Notifications} />
              </ContainerIcon>
              <ContainerText>Notifications</ContainerText>
            </Container2>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Refer")}>
            <Container2>
              <ContainerIcon>
                <ImageContainer source={icon.refer} />
              </ContainerIcon>
              <ContainerText>Refer</ContainerText>
            </Container2>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
            <Container2>
              <ContainerIcon>
                <ImageContainer source={icon.Connect} />
              </ContainerIcon>
              <ContainerText>WhishList Product</ContainerText>
            </Container2>
          </TouchableOpacity>
          <Container2>
            <ContainerIcon>
              <ImageContainer source={icon.Help} />
            </ContainerIcon>
            <ContainerText>Help & Feedback</ContainerText>
          </Container2>
        </ProfileContainer>

        <TouchableOpacity onPress={removeItem}>
          <LogoutConainer>
            <LogoutText>Log Out</LogoutText>
          </LogoutConainer>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          setprofile("false");
        }}
        style={[
          styles.blackContainer,
          profile == "true" && styles.blackContainer1,
        ]}
      />
      {/* <View style={{justifyContent: 'center', alignItems: 'center'}}> */}
      <View
        style={[
          styles.whiteContainer,
          profile == "true" && styles.whiteContainer1,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            opencamara();
          }}
        >
          <Text style={styles.sortContentText}>Open a Camera</Text>
        </TouchableOpacity>
        <View style={styles.Divider} />
        <TouchableOpacity
          onPress={() => {
            openGallary();
          }}
        >
          <Text style={styles.sortContentText}>Open a Gallary</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </Container>
  );
}
// export default Profile;
// }
const Container = styled.View`
  /* position:absolute; */
  width: 100%;
  height: 100%;
  background: white;
  /* background:gray; */
`;

const AccountTopContainer = styled.View`
  /* width:100%; */
  width: 413px;
  height: 190px;
  border-radius: 10px;

  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const SearchIcon = styled.View`
  position: absolute;
  margin-top: 40px;
  margin-left: 20px;
  /* background-color: 'black'; */
  /* background: lightgray; */
`;

const ProfileI = styled.View`
  position: absolute;
  margin-top: 90px;
  margin-left: 20px;

  width: 290px;
  height: 82px;
`;

const ProfileContainer = styled.View`
  width: 180px;
  height: 276px;
  /* background:lightgray; */
  margin-left: 38px;
  margin-top: 40px;
`;

const LogoutConainer = styled.View`
  height: 67px;
  width: 350px;
  /* background: black; */
  /* align-items:center; */
  left: 50%;
  margin-left: -175px;
  margin-top: 50px;
  margin-bottom: 20px;
  border: 1px solid #999392;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const LogoutText = styled.Text`
  font-weight: 700;
  font-size: 15px;
  color: #332f2e;
  opacity: 0.5;
`;

const Container1 = styled.View`
  height: 28px;
  /* background:red; */
  /* background: lightgray; */
  justify-content: center;
`;
const Container2 = styled.View`
  height: 28px;
  margin-top: 38px;
  /* background:red; */
  /* background:lightgray; */
  justify-content: center;
`;

const ContainerIcon = styled.View`
  height: 28px;
  width: 28px;
  /* background:black; */
`;

const ContainerText = styled.Text`
  position: absolute;
  font-weight: 500;
  /* text-align:center; */
  font-size: 16px;
  color: #332f2e;
  margin-left: 47px;
`;

const ImageContainer = styled.Image`
  width: 100%;
  height: 100%;
  /* background:black; */
`;
const ProfileIcon = styled.View`
  /* position:absolute; */
  width: 82px;
  height: 82px;
  /* background: lightgray; */
  border-radius: 41px;
  overflow: hidden;
`;

const ImageP = styled.Image`
  width: 100%;
  height: 100%;
`;

const NameText = styled.Text`
  position: absolute;
  font-weight: 700;
  font-size: 17px;
  /* color: #332F2E; */
  margin-left: 94px;
  margin-top: 17px;
`;
const MobileNumber = styled.Text`
  position: absolute;
  font-weight: 400;
  font-size: 16px;
  color: #332f2e;
  opacity: 0.5;
  margin-left: 94px;
  margin-top: 38px;
`;

const styles = StyleSheet.create({
  MobilenumberText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#332F2E",
  },
  blackContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    position: "absolute",
    opacity: 0.4,
    marginTop: screenHeight - 10,
    // 0,
    justifyContent: "center",
    alignItems: "center",
  },
  blackContainer1: {
    marginTop: 0,
  },
  whiteContainer: {
    width: "70.41%",
    height: 50,
    backgroundColor: "#ffffff",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: screenHeight - 10,
    borderRadius: 12,
    // justifyContent: 'center',
  },
  whiteContainer1: {
    marginTop: "80%",
  },
  sortContentText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#332F2E",
    alignSelf: "center",
    paddingVertical: 20,
    // backgroundColor: '#f2f2f2',
  },
  Divider: {
    backgroundColor: "#332F2E42",
    width: "80%",
    height: 1,
    opacity: 0.26,
    alignSelf: "center",
  },
});
