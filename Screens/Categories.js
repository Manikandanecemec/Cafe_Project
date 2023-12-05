import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

const renderItem = ({item, index}) => {
  return (
    // <View key={index} style={styles.cardContainer}>
    <View style={styles.cardContainer}>
      <Text style={styles.MainText}>
        {/* Coffee */}
        {item.name}
      </Text>
      <Text style={styles.subText}>
        {/* Hot and cold */}
        {item.mode}
      </Text>
      <View style={styles.ImageContainer2}>
        <Image source={item.url} style={{width: '120%', height: '120%'}} />
      </View>
    </View>
    // </View>
  );
};

import {COLORS, icon} from '../Constant';

const categories = ({navigation}) => (
  <View style={styles.Container}>
    <TouchableOpacity
      // style={{position: 'absolute'}}
      onPress={() => navigation.navigate('Home1')}>
      {/* //renderItem */}
      <View style={styles.ImageContainer}>
        <Image source={icon.BackBotton} style={{height: 26, width: 26}} />
      </View>
    </TouchableOpacity>
    <FlatList
      data={data}
      keyExtractor={i => i.toString()}
      renderItem={renderItem}
    />
  </View>
);
export default categories;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ImageContainer: {
    // position: 'absolute',
    marginTop: 40,
    marginLeft: 20,
  },
  cardContainer: {
    width: 302,
    height: 141,
    borderColor: '#FE7474',
    borderWidth: 1,
    // alignSelf: 'center',
    left: '50%',
    marginLeft: -151,
    marginTop: 27,
    backgroundColor: '#FDF8F4',
    borderRadius: 8,
  },
  MainText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#E94B64',
    marginTop: 51,
    marginLeft: 30,
  },
  subText: {
    fontSize: 11,
    fontWeight: '300',
    color: '#9B9899',
    marginLeft: 30,
  },
  ImageContainer2: {
    width: 111,
    position: 'absolute',
    height: 111,
    // backgroundColor: 'black',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
    marginLeft: 172,
  },
});

const data = [
  {
    url: icon.cappuccino,
    name: 'cappuccino',
    mode: 'Hot and Cold',
  },
  {
    url: icon.Filtercoffee,
    name: 'Filtercoffee',
    mode: 'Hot and Cold',
  },
  {
    url: icon.Espresso,
    name: 'Espresso',
    mode: 'Hot and Cold',
  },
  {
    url: icon.Malli,
    name: 'Malli',
    mode: 'Hot and Cold',
  },
  {
    rl: icon.cappuccino,
    name: 'Malli',
    mode: 'Hot and Cold',
  },
];
