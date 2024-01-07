import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  StatusBar,
  PermissionsAndroid,
} from "react-native";
import { icon } from "../Constant";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFetchBlob from "rn-fetch-blob";
import { useIsFocused } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Share from "react-native-share";

const MyOrderTab = ({ navigation }) => {
  const [status, setstatus] = useState("Delivered");
  const [filePath, setFilePath] = useState("");
  const [orderData, setorderData] = useState([]);
  const [ShippingPrice, setShippingPrice] = useState("₹00.00");
  const [data, setdata] = useState([]);
  const [datlist, setDatalist] = useState([
    ...data.filter((e) => e.status == status),
  ]);
  const [fileName, setfilename] = useState("2222222");
  const isFocused = useIsFocused();
  const [oredrList, setOrderList] = useState([
    ...data.filter((e) => e.status == status),
  ]);
  const usergetdata = auth().currentUser;

  useEffect(() => {
    const setstatusFilter = () => {
      // console.log('SCreenVal' + status);
      setOrderList([...data.filter((e) => e.status == status)]);
    };
    setstatusFilter(status);
  }, [data]);

  useEffect(() => {
    if (usergetdata != null) {
      const getOrderItems = async () => {
        // setLoading(true);
        const userId = usergetdata.uid;
        const user = await firestore().collection("users").doc(userId).get();
        // setOrderList(user._data.orders);
        setdata(user._data.orders);
        console.log(oredrList);
        // setLoading(false);
      };
      getOrderItems();
      // console.log(condition);
    }

    // console.log(' cart screen Total:' + CartTotal);
  }, [isFocused]);

  setStatusFilter = (status) => {
    if (status !== "Delivered") {
      setOrderList([...data.filter((e) => e.status == status)]);
    } else {
      // setDatalist(data);
      setOrderList([...data.filter((e) => e.status == status)]);
    }
    setstatus(status);
  };

  // const createPDF = async () => {
  //   let options = {
  //     html: '<h1>PDF TEST</h1>',
  //     fileName: 'test2',
  //     directory: 'Download',
  //   };

  //   let file = await RNHTMLtoPDF.convert(options);
  //   console.log(file.filePath);
  //   alert(file.filePath);
  // };
  const isPermitted = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs access to Storage data",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert("Write permission err", err);
        return false;
      }
    } else {
      return true;
    }
  };
  let htmlstring = `
  

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title> Order confirmation </title>
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width; initial-scale=1.0;" />
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
    body { margin: 0; padding: 0; background: #e1e1e1; }
    div, p, a, li, td { -webkit-text-size-adjust: none; }
    .ReadMsgBody { width: 100%; background-color: #ffffff; }
    .ExternalClass { width: 100%; background-color: #ffffff; }
    body { width: 100%; height: 100%; background-color: #e1e1e1; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    html { width: 100%; }
    p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
    .visibleMobile { display: none; }
    .hiddenMobile { display: block; }
  
    @media only screen and (max-width: 600px) {
    body { width: auto !important; }
    table[class=fullTable] { width: 96% !important; clear: both; }
    table[class=fullPadding] { width: 85% !important; clear: both; }
    table[class=col] { width: 45% !important; }
    .erase { display: none; }
    }
  
    @media only screen and (max-width: 420px) {
    table[class=fullTable] { width: 100% !important; clear: both; }
    table[class=fullPadding] { width: 85% !important; clear: both; }
    table[class=col] { width: 100% !important; clear: both; }
    table[class=col] td { text-align: left !important; }
    .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
    .visibleMobile { display: block !important; }
    .hiddenMobile { display: none !important; }
    }
  </style>
  
  
  <!-- Header -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tr>
      <td height="20"></td>
    </tr>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
          <tr class="hiddenMobile">
            <td height="40"></td>
          </tr>
          <tr class="visibleMobile">
            <td height="30"></td>
          </tr>
  
          <tr>
            <td>
              <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                <tbody>
                  <tr>
                    <td>
                      <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                        <tbody>
                          <tr>
                            <td align="left"> <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Cafe_Cafe_Logo.svg/440px-Cafe_Cafe_Logo.svg.png" width="32" height="32" alt="logo" border="0" /></td>
                          </tr>
                          <tr class="hiddenMobile">
                            <td height="40"></td>
                          </tr>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                              Hello, Dinesh.
                              <br> Thank you for shopping from App and for your order.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                        <tbody>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td height="5"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                              Invoice
                            </td>
                          </tr>
                          <tr>
                          <tr class="hiddenMobile">
                            <td height="50"></td>
                          </tr>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                              <small>ORDERID:</small> ${orderData.orderID}<br />
                              <small>ORDERNUMBER:</small> ${orderData.ordernumber}<br />
                              <small>ARRAIVINGAT:</small> ${orderData.arrrivingAT}<br />
                              <small>MARCH 4TH 2016</small>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- /Header -->
  <!-- Order Details -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="40"></td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                          Item
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="left">
                          <small>SKU</small>
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                          Quantity
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                          Subtotal
                        </th>
                      </tr>
                      <tr>
                        <td height="1" style="background: #bebebe;" colspan="4"></td>
                      </tr>
                      <tr>
                        <td height="10" colspan="4"></td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #ff0000;  line-height: 18px;  vertical-align: top; padding:10px 0;" class="article">
                          ${orderData.productName}
                        </td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;"><small>MH792AM/A</small></td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="center">1</td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">${orderData.price}</td>
                      </tr>
                      <tr>
                        <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                      </tr>
                 
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="20"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Order Details -->
  <!-- Total -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
                <td>
  
                  <!-- Table Total -->
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                          Subtotal
                        </td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap;" width="80">
                        ${orderData.price}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                          Shipping &amp; Handling
                        </td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                        ${ShippingPrice}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                          <strong>Grand Total (Incl.Tax)</strong>
                        </td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                          <strong>${orderData.price}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #b0b0b0; line-height: 22px; vertical-align: top; text-align:right; "><small>TAX</small></td>
                        <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #b0b0b0; line-height: 22px; vertical-align: top; text-align:right; ">
                          <small>₹00.00</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- /Table Total -->
  
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Total -->
  <!-- Information -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="40"></td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
  
                            <tbody>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>BILLING INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  Cafe<br> Kamaraj Salai,<br> Kamaraj Nagar,<br> Puducherry,605011<br>+91 8610096883
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
  
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                            <tbody>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>PAYMENT METHOD</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  Credit Card<br> Credit Card Type: Visa<br> Worldpay Transaction ID: <a href="#" style="color: #ff0000; text-decoration:underline;">4185939336</a><br>
                                  <a href="#" style="color:#b0b0b0;">Right of Withdrawal</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                            <tbody>
                              <tr class="hiddenMobile">
                                <td height="35"></td>
                              </tr>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>SHIPPING INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  Mr.Dinesh<br> 106, Kamaraj Salai,<br> Kamaraj Nagar,<br> Puducherry,605011<br>+91 9843231375
                                </td>
                              </tr>
                            </tbody>
  
                          </table>
  
  
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                            <tbody>
                              <tr class="hiddenMobile">
                                <td height="35"></td>
                              </tr>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>   
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>SHIPPING METHOD</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  Online Payment
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="30"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Information -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
          <tr>
            <td>
              <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                <tbody>
                  <tr>
                    <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                      Have a nice day.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr class="spacer">
            <td height="50"></td>
          </tr>
  
        </table>
      </td>
    </tr>
    <tr>
      <td height="20"></td>
    </tr>
  </table>
        `;

  const sharePdf = async (item) => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: htmlstring,
        //File Name
        fileName: "Cafe" + fileName,
        //File directory
        directory: "Documents",
        base64: true,
      };
      let file = await RNHTMLtoPDF.convert(options);
      let filePath =
        RNFetchBlob.fs.dirs.DownloadDir + "/cafe " + fileName + ".pdf";
      const ShareResponse = await Share.open({ url: filePath });
      console.log(file.filePath);
      alert(file.filePath);
    }
  };

  const createPDF = async (item) => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: htmlstring,
        //File Name
        fileName: "Cafe" + fileName,
        //File directory
        directory: "Document",
        base64: true,
      };
      let file = await RNHTMLtoPDF.convert(options);
      let filePath =
        RNFetchBlob.fs.dirs.DocumentDir + "/cafe " + fileName + ".pdf";
      console.log(RNFetchBlob.fs.dirs.DocumentDir);
      RNFetchBlob.fs
        .writeFile(filePath, file.base64, "base64")

        .then((response) => {
          console.log("sucess log :", response);
        })
        .catch((response) => {
          console.log("error log:", response);
        });

      console.log(file.filePath);
      // alert(file.filePath);
      setFilePath(file.filePath);
    }
  };
  // const createPDF = async (item) => {
  //   try {
  //     if (await isPermitted()) {
  //       const options = {
  //         html: htmlstring,
  //         fileName: "Cafe" + fileName,
  //         directory: "Download",
  //         base64: true,
  //       };

  //       const file = await RNHTMLtoPDF.convert(options);

  //       const filePath =
  //         RNFetchBlob.fs.dirs.DownloadDir + "/Cafe" + fileName + ".pdf";

  //       console.log(RNFetchBlob.fs.dirs.DownloadDir);

  //       await RNFetchBlob.fs.writeFile(filePath, file.base64, "base64");

  //       console.log("Success: File saved at", filePath);
  //       setFilePath(file.filePath);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     // Handle errors appropriately, e.g., show a user-friendly message.
  //   }
  // };

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={"white"}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
      />
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={styles.BackContainer}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icon.BackBotton}
            style={{ height: 25, width: 25, marginLeft: 25 }}
          />
        </TouchableOpacity>
        {/* <Text style={styles.TitleText}>My Orders</Text> */}
        <Text style={styles.TitleText}>My Orders</Text>
      </View>
      <View style={styles.listContainer}>
        {listData.map((e, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.btnContainer,
              status == e.status && styles.btnContainerActive,
            ]}
            onPress={() => setStatusFilter(e.status)}
          >
            <Text
              style={[
                styles.btnText,
                status == e.status && styles.btnTextActive,
              ]}
            >
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {oredrList == null ? (
        <Text
          style={{
            alignSelf: "center",
            marginTop: 30,
            fontWeight: "700",
            color: "black",
            fontSize: 17,
          }}
        >
          No Data Found...
        </Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {oredrList.map((item, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.cardContainer}>
                <View style={styles.statusContainer}>
                  <Image
                    source={icon.instant}
                    style={{ width: 16, height: 16, marginLeft: 10 }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: "#332F2E",
                      marginLeft: 4,
                    }}
                  >
                    instant delivery
                  </Text>
                </View>
                <View style={styles.statusContainer2}>
                  <TouchableOpacity
                    onPress={() => {
                      createPDF(item), setorderData(item);
                      // setfilename(item.orderID);
                      // console.log('FIleName:' + item.orderID);
                      console.log("orderdata00" + item);
                    }}
                  >
                    <Image
                      source={icon.DownloadIcon}
                      style={{ width: 12, height: 12, marginLeft: 6.77 }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 1,
                      height: 11.5,
                      backgroundColor: "#00000014",
                      marginLeft: 8.5,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      sharePdf(item);
                    }}
                  >
                    <Image
                      source={icon.Share}
                      style={{ width: 11, height: 11, marginLeft: 8.46 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.ordertitleText}>ORDER ID</Text>
                  <Text style={styles.ordertitleText}>ORDER NO</Text>
                  <Text style={styles.ordertitleText}>ARRIVING AT</Text>
                  <Text style={styles.orderDynamicText}>{item.orderID}</Text>
                  <Text style={styles.orderDynamicText2}>
                    {item.ordernumber}
                  </Text>
                  <Text style={styles.orderDynamicText3}>
                    {item.arrrivingAT}
                  </Text>
                </View>
                <View
                  style={{
                    width: "77.18%",
                    height: 1,
                    backgroundColor: "#000000",
                    opacity: 0.1,
                    alignSelf: "center",
                  }}
                />
                <View style={styles.orderDetails2}>
                  <Text style={styles.ordertitleText2}>AMOUNT</Text>
                  <Text style={styles.ordertitleText3}>ITEMS</Text>
                  <Text style={styles.ordertitleText4}>STATUS</Text>
                  <Text style={styles.orderDynamicText}>{item.orderTotal}</Text>
                  <Text style={styles.orderDynamicText4}>
                    {item.Numberofitems}
                  </Text>
                  <Text style={styles.orderDynamicText5}>{item.status}</Text>
                  {/* <Image
                  source={item.icons}
                  style={{
                    width: 11,
                    height: 11,
                    marginTop: 38,
                    marginLeft: 200,
                  }}
                /> */}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity style={styles.btnCancel}>
                    <Text style={styles.btn}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.TrackContainer}>
                    <Text style={styles.Trackbtn}>Open</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* <FlatList
        data={datlist}
        keyExtractor={i => i.toString()}
        renderItem={renderItem}
      /> */}
    </View>
  );
};
export default MyOrderTab;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  BackContainer: {
    width: "100%",
    height: 25,
    // backgroundColor: 'black',
    justifyContent: "center",
    marginTop: 32,
  },
  TitleText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#332F2E",
    position: "absolute",
    marginTop: 32,
    // left: '50%',
    // marginLeft: -41,
    alignSelf: "center",
    // backgroundColor: 'black',
  },
  listContainer: {
    marginTop: 37,
    flexDirection: "row",
    marginLeft: 44,
    // backgroundColor: 'black',
  },

  btnContainer: {
    width: 135,
    height: 47,
    borderWidth: 1,
    borderColor: "#999392",
    borderRadius: 8,
    marginRight: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainerActive: {
    borderColor: "#E94B64",
  },

  btnText: {
    fontSize: 21,
    fontWeight: "400",
    color: "#332F2E",
    opacity: 0.2,
  },
  btnTextActive: {
    color: "#E94B64",
    opacity: 1,
  },
  cardContainer: {
    borderColor: "#E6E2E1",
    borderWidth: 1,
    width: 343,
    height: 276,
    alignSelf: "center",
    // backgroundColor: 'black',
    marginTop: 28,
    borderRadius: 12,
  },
  statusContainer: {
    width: 138,
    height: 32,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginLeft: 7,
    marginTop: 7,
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
  },
  statusContainer2: {
    width: 55,
    height: 24,
    backgroundColor: "#F2F2F2",
    borderRadius: 6,
    marginLeft: 7,
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 9,
  },
  orderDetails: {
    width: "100%",
    height: 66,
    // backgroundColor: 'black',
    marginTop: 15,
    flexDirection: "row",
  },
  ordertitleText: {
    fontSize: 11,
    fontWeight: "400",
    color: "#807A79",
    marginLeft: 38,
    marginTop: 16,
    // backgroundColor: 'black',
  },
  ordertitleText2: {
    fontSize: 11,
    fontWeight: "400",
    color: "#807A79",
    marginLeft: 38,
    // marginStart: 38,
    marginTop: 18,
    // backgroundColor: 'black',
  },
  ordertitleText3: {
    fontSize: 11,
    fontWeight: "400",
    color: "#807A79",
    marginLeft: 122,
    position: "absolute",
    // marginStart: 38,
    marginTop: 18,
    // backgroundColor: 'black',
  },
  ordertitleText4: {
    fontSize: 11,
    fontWeight: "400",
    color: "#807A79",
    marginLeft: 222,
    position: "absolute",
    // marginStart: 38,
    marginTop: 18,
    // backgroundColor: 'black',
  },
  orderDynamicText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#332F2E",
    position: "absolute",
    marginTop: 36,
    marginLeft: 38,
  },
  orderDynamicText2: {
    fontSize: 11,
    fontWeight: "500",
    color: "#332F2E",
    position: "absolute",
    marginTop: 36,
    marginLeft: 122,
  },
  orderDynamicText3: {
    fontSize: 11,
    fontWeight: "500",
    color: "#332F2E",
    position: "absolute",
    marginTop: 36,
    marginLeft: 222,
  },
  orderDynamicText4: {
    fontSize: 11,
    fontWeight: "500",
    color: "#332F2E",
    position: "absolute",
    marginTop: 36,
    marginLeft: 122,
  },
  orderDynamicText5: {
    fontSize: 11,
    fontWeight: "500",
    color: "#332F2E",
    position: "absolute",
    marginTop: 36,
    marginLeft: 222,
  },
  orderDetails2: {
    width: "100%",
    height: 71,
    // backgroundColor: 'black',
    // marginTop: 15,
    flexDirection: "row",
  },
  btnCancel: {
    width: 138.51,
    height: 56,
    borderWidth: 1,
    borderColor: "#4E4E4E",
    borderRadius: 12,
    marginLeft: 25,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  TrackContainer: {
    width: 138.51,
    height: 56,
    borderWidth: 1,
    borderColor: "#E94B64",
    backgroundColor: "#E94B64",
    borderRadius: 12,
    marginLeft: 25,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CDCDCD",
  },
  Trackbtn: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});

const listData = [
  {
    status: "Delivered",
  },
  {
    status: "In progress",
  },
];

const data = [
  {
    id: 1,
    orderID: "#8765763",
    ordernumber: "98695951",
    arrrivingAT: "18min Left (Today)",
    amount: "$40",
    items: "6",
    status: "In progress",
    icons: icon.InProgress,
    productName: "Espresso",
    price: "₹40",
  },
  {
    id: 6,
    orderID: "#8765760",
    ordernumber: "98695952",
    arrrivingAT: "32min Left (Today)",
    amount: "$40",
    items: "2",
    status: "Delivered",
    icons: icon.InProgress,
    productName: "Espresso",
    price: "₹60",
  },
  {
    id: 2,
    status: "Delivered",
    orderID: "#8765764",
    ordernumber: "98695982",
    arrrivingAT: "16 Nov,21",
    amount: "$240",
    items: "2",
    icons: icon.Success,
    productName: "Espresso",
    price: "₹240",
  },
  {
    id: 3,
    orderID: "#8765764",
    ordernumber: "98695952",
    arrrivingAT: "32min Left (Today)",
    amount: "$40",
    items: "2",
    status: "In progress",
    icons: icon.InProgress,
    productName: "Espresso",
    price: "₹40",
  },
  {
    id: 4,
    status: "Delivered",
    orderID: "#8765764",
    ordernumber: "98695952",
    arrrivingAT: "1 Nov,21",
    amount: "$120",
    items: "2",
    icons: icon.Success,
    productName: "Espresso",
    price: "₹120",
  },
  {
    id: 5,
    status: "Delivered",
    orderID: "#876554",
    ordernumber: "99595952",
    arrrivingAT: "6 Nov,21",
    amount: "$80",
    items: "2",
    icons: icon.Success,
    productName: "Espresso",
    price: "₹80",
  },
];

const htmlStyles = `
$primary: #F14C4C;

html{
  font-size: 12px;
  line-height: 1.5;
  color: #000;
  background: #ddd;
  box-sizing: border-box;
}
body{
  margin: 6rem auto 0;
  max-width: 800px;
  background: white;
  border: 1px solid #aaa;
  padding: 2rem;
}
.container{
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

*,*:before,*:after{
  box-sizing: inherit;
}

[contenteditable],
input{
  &:hover,
  &:focus{
    background: rgba($primary,.1);
    outline: 2px solid $primary;
  }
}

.group:after {
  content: "";
  display: table;
  clear: both;
}

/**
* Small Grid
**/ 
.row{
  @extend .group;
  position: relative;
  display: block;
  width: 100%;
  font-size: 0;
}
.col,
[class*="col-"]{
  vertical-align: top;
  display: inline-block;
  font-size: 1rem;
  padding: 0 1rem;
  min-height: 1px;
}
.col-4{
  width: 25%;
}
.col-3{
  width: 33.33%;
}
.col-2{
  width: 50%;
}
.col-2-4{
  width: 75%;
}
.col-1{
  width: 100%;
}
.text-center{
  text-align: center;
}
.text-right{
  text-align: right;
}


a{
  color: $primary;
  text-decoration: none;
}

p{
  margin: 0;
}
.control-bar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $primary;
  color: white;
  line-height: 4rem;
  height: 4rem;
  
  .slogan{
    font-weight: bold;
    font-size: 1.2rem;
    display: inline-block;
    margin-right: 2rem;
  }
  
  label{
    margin-right: 1rem;
  }
  
  a{
    margin: 0;
    padding: .5em 1em;
    background: rgba(white,.8);
    &:hover{
      background: rgba(white,1);
    }
  }
  input{
    border: none;
    background: rgba(white,.2);
    padding: .5rem 0;
    max-width: 30px;
    text-align: center;
    
    &:hover{
      background: rgba(white,.3);
    }
  }
}

.hidetax{
  .taxrelated{
    display: none;
  }
}
.showtax{
  .notaxrelated{
    display: none;
  }
}
.hidedate{
  .daterelated{
    display: none;
  }
}
.showdate{
  .notdaterelated{
    display: none;
  }
}
/**
 * HEADER
 */
header{
  margin: 1rem 0 0;
  padding: 0 0 2rem 0;
  border-bottom: 3pt solid $primary;
  
  p{
    font-size: .9rem;
  }
  
  a{
    color: #000;
  }
}
.logo{
  margin: 0 auto;
  width: auto;
  height: auto;
  border: none;
  fill: $primary;
}
.logoholder{
  @extend .col;
  width: 10%;
}
.me{
  @extend .col;
  width: 30%;
}
.info{
  @extend .col;
  width: 30%;
}
.bank{
  @extend .col;
  width: 30%;
  //color: #666;
  //p{font-size: .8rem}
}

/**
 * SECTION
 */
.section{
  margin: 3rem 0 0;
}

.smallme{
  display: inline-block;
  text-transform: uppercase;
	//border-bottom: 1pt solid black;
  margin: 0 0 2rem 0;
  font-size: .9rem;
}
.client{
  margin: 0 0 3rem 0;
}
h1{
  margin: 0;
  padding: 0;
  font-size: 2rem;
  //font-weight: normal;  
  //text-transform: uppercase;
  color: $primary;
  //border-top: 3pt solid #999;
}
.details{
  
  input{
    display: inline;
    margin: 0 0 0 .5rem;
    border: none;
    width: 50px;
    min-width: 0;
    background: transparent;
    text-align: left;
  }
}


// CURRENCY Symbol
.rate,
.price,
.sum,
.tax,
#total_price,
#total_tax{
  &:before{
    content: '€';
  }
}

/**
 * INVOICELIST BODY
 */
.invoicelist-body{
  margin: 1rem;

  table{
    width: 100%;
  }
  thead{
    text-align: left;
    border-bottom: 2pt solid #666;
    //color: $primary;
  }
  td,th{
    position: relative;
    padding: 1rem;
  }
  tr:nth-child(even){
    background: #ccc;
  }
  tr{
    &:hover{
      .removeRow{
        display: block;
      }
    }
  }
  
  input{
    display: inline;
    margin: 0;
    border: none;
    width: 80%;
    min-width: 0;
    background: transparent;
    text-align: left;
  }
  .control{
    display: inline-block;
    color: white;
    background: $primary;
    padding: 3px 7px;
    font-size: .9rem;
    text-transform: uppercase;
    cursor: pointer;
    &:hover{
      background: lighten($primary,5%);
    }
  }
  .newRow{
    margin: .5rem 0;
    float: left;
  }
  .removeRow{
    display: none;
    position: absolute;
    top: .1rem;
    bottom: .1rem;
    left: -1.3rem;
    font-size: .7rem;
    border-radius: 3px 0 0 3px;
    padding: .5rem;
  }
}

/**
 * INVOICE LIST FOOTER
 */
.invoicelist-footer{
  @extend .group;
  margin: 1rem;
  
  table{
    //border-top: 2pt solid #666;
    float: right;
    //background: #ccc;
    width: 25%;
    
    td{
      padding: 1rem 2rem 0 1rem;
      text-align: right;
    }
    tr:nth-child(2){
      td{
        padding-top: 0;
      }
    }
    #total_price{
      //font-weight: bold;
      font-size: 2rem;
      color: $primary;
    }
  }
}

/**
 * NOTE
 */
.note{
  margin: 1rem;
  
  .hidenote & {
    display: none;
  }

  h2{
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
  }
  p{
    //background: #ccc;
    //padding: 1rem;
  }
}

/**
 * FOOTER
 */
footer{
  display: block;
  margin: 1rem 0;
  padding: 1rem 0 0;
  
  p{
    font-size: .8rem;
  }
}


/**
 * PRINT STYLE
 */
@media print {
  html{
    margin: 0;
    padding: 0;
    background: #fff;
  }
  body{
    width: 100%;
    border: none;
    background: #fff;
    margin: 0;
    padding: 0;
  }
  .control,
  .control-bar{
    display: none !important;
  }

  [contenteditable] {
    &:hover,
    &:focus{
      outline: none;
    }
  }
}


`;
