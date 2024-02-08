import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Test from "./Screens/Test";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./Screens/Profile";
import Searchfilter from "./Screens/Searchfilter";
import MyCoffee from "./Screens/MyCoffee";
import CafeHome from "./Screens/CafeHome";
import { Image } from "react-native";
import ProdutTab from "./Screens/ProductTab";
import ProductTab2 from "./Screens/ProductTab2";
import AddProfile from "./Screens/AddProfile";
import Wishlist from "./Screens/Wishlist";

import MyOrderTab from "./Screens/MyOrderTab";
import Coupon from "./Screens/Coupon";
import NewSCrren from "./Screens/NewSCrren";

import "react-native-gesture-handler";
import { COLORS, icon } from "./Constant";
import categories from "./Screens/Categories";
import Cart from "./Screens/Cart";
import AddressPage from "./Screens/AddressPage";
import Payment from "./Screens/Payment";
import Success from "./Screens/Sucess";
import CategroiesCard from "./Screens/CategroiesCard";

import LoginScreen from "./Screens/LoginScreen";
import Refer from "./Screens/Refer";
import CouponPage from "./Screens/CouponPage";
import Testtry from "./Screens/TestTry";
import TestProduct from "./Screens/TestProduct";
import AddNewAdress from "./Screens/AddNewAdress";
import AddressList from "./Screens/AddressList";
import Notification from "./Screens/Notification";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Home1"
      barStyle={{ backgroundColor: "#FFFFFF" }}
      activeColor="#E94B64"
      inactiveColor="#999392"
    >
      <Tab.Screen
        name="Home1"
        component={CafeHome}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? icon.home : icon.homeUn}
              style={{ height: 23, width: 23 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyCoffee"
        component={MyCoffee}
        options={{
          tabBarLabel: "My Coffee",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? icon.Heart : icon.HeartUn}
              style={{ height: 23, width: 23 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Searchfilter}
        options={{
          tabBarLabel: "Search",

          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? icon.SearchSel : icon.SearchUn}
              style={{ height: 23, width: 23 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? icon.ProfileSel : icon.ProfileUn}
              style={{ height: 23, width: 23 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyTabs() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="Product" component={ProdutTab} />
        {/* <Stack.Screen name="Coffee" component={MyCoffee} /> */}
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="AddressPage" component={AddressPage} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="CategroiesCard" component={CategroiesCard} />
        <Stack.Screen name="MyOrderTab" component={MyOrderTab} />
        <Stack.Screen name="Refer" component={Refer} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="CouponPage" component={CouponPage} />
        <Stack.Screen name="Testtry" component={Testtry} />
        <Stack.Screen name="TestProduct" component={TestProduct} />
        <Stack.Screen name="AddNewAdress" component={AddNewAdress} />
        <Stack.Screen name="AddressList" component={AddressList} />
        <Stack.Screen name="NewSCrren" component={NewSCrren} />
        <Stack.Screen name="ProductTab2" component={ProductTab2} />
        <Stack.Screen name="AddProfile" component={AddProfile} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MyTabs;
