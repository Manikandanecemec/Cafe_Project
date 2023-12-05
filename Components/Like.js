import React from 'react';
import {View, Text, Image} from 'react-native';
import Lottie from 'lottie-react-native';

class Like extends React.Component {
  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'black',
        }}>
        {/* <LottieView
          source={require('../assets/98288-loading.json')}
          autoPlay
          loop
        /> */}
        <Lottie
          source={require('../assets/7596-like.json')}
          autoPlay={true}
          loop={true}
        />
      </View>
    );
  }
}

export default Like;
