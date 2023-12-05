import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Share from 'react-native-share';

import Clipboard from '@react-native-clipboard/clipboard';

const copyToClipboard = () => {
  Clipboard.setString('HFDKJF FDKJ 4345');
  console.log(' Text copied');
  // this.setState((Texta ='true'));
  // this.setState({Texta: 'true'});
};
const AppName = '@Cafe';
const referralLink = '@Cafe';
const referraCode = 'https://www.cafecoffeeday.com/';

const SingleshareoptionWHATSAPP = {
  title: 'Share via',
  message: `Hey coffee lover! ☕️ Join ${AppName} and get amazing rewards. Use my referral code ${referraCode} when you sign up: ${referralLink}`,
  url: 'some share url',
  social: Share.Social.WHATSAPP,
  // whatsAppNumber: '9199999999',
};

const SingleshareoptionINSTAGRAM = {
  title: 'Share via',
  message: `Hey coffee lover! ☕️ Join ${AppName} and get amazing rewards. Use my referral code ${referraCode} when you sign up: ${referralLink}`,
  url: 'some share url',
  social: Share.Social.INSTAGRAM,
};

const SingleshareoptionMESSENGER = {
  title: 'Share via',
  message: `Hey coffee lover! ☕️ Join ${AppName} and get amazing rewards. Use my referral code ${referraCode} when you sign up: ${referralLink}`,
  url: 'some share url',
  social: Share.Social.MESSENGER,
};

const Singleshareoptiontelegram = {
  title: 'Share via',
  message: `Hey coffee lover! ☕️ Join ${AppName} and get amazing rewards. Use my referral code ${referraCode} when you sign up: ${referralLink}`,
  url: 'some share url',
  social: Share.Social.TELEGRAM,
};

import {icon} from '../Constant';
class Refer extends React.Component {
  state = {
    SharedText: 'copy',
    Platform: 'Singleshareoption',
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <StatusBar
          backgroundColor={'white'}
          barStyle={'dark-content'}
          showHideTransition={'fade'}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.BackContainer}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={icon.BackBotton}
              style={{height: 25, width: 25, marginLeft: 25}}
            />
          </TouchableOpacity>
          <Text style={styles.TitleText}>Refer Friend</Text>
        </View>
        <View style={styles.COnContainer}>
          <Text style={styles.ReferText}>Invite friends & businesses</Text>
          <Text style={styles.ReferCaption}>
            Copy your code, share it with your friends.
          </Text>
          <Text style={styles.CodeTextHeader}>Your personal code</Text>
          <View style={styles.CodeContainer}>
            <Text style={styles.CodeText}>HFDKJF FDKJ 4345</Text>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={() => {
                this.setState({SharedText: 'Copied'}), copyToClipboard();
              }}>
              <Text style={styles.copytText}>{this.state.SharedText}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.OrText}>OR</Text>
          <View
            style={{
              width: '66.92%',
              height: 56,
              // backgroundColor: 'black',
              alignSelf: 'center',
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                width: 51,
                height: 51,
                borderRadius: 25.5,
                backgroundColor: 'white',
                borderColor: '#E9E9E9',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                Share.shareSingle(SingleshareoptionMESSENGER).then(res => {
                  console.log(res).catch(err => {
                    console.log(err);
                  });
                });
              }}>
              <Image source={icon.Messanger} style={{width: 30, height: 30}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 51,
                height: 51,
                borderRadius: 25.5,
                backgroundColor: 'white',
                borderColor: '#E9E9E9',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                Share.shareSingle(SingleshareoptionWHATSAPP)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    console.log(err);
                  }),
                  {};
              }}>
              <Image source={icon.WhatsApp} style={{width: 30, height: 30}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 51,
                height: 51,
                borderRadius: 25.5,
                backgroundColor: 'white',
                borderColor: '#E9E9E9',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              // onPres={() => {
              //   // Share.shareSingle(SingleshareoptionEMAIL)
              //   //   .then(res => {
              //   //     console.log(res);
              //   //   })
              //   //   .catch(err => {
              //   //     console.log(err);
              //   //   });
              //   Share.shareSingle(SingleshareoptionWHATSAPP)
              //     .then(res => {
              //       console.log(res);
              //     })
              //     .catch(err => {
              //       console.log(err);
              //     }),
              //     {};
              // }}
              onPress={() => {
                Share.shareSingle(SingleshareoptionINSTAGRAM)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    console.log(err);
                  }),
                  {};
              }}>
              <Image source={icon.instagram} style={{width: 25, height: 25}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 51,
                height: 51,
                borderRadius: 25.5,
                backgroundColor: 'white',
                borderColor: '#E9E9E9',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                Share.shareSingle(Singleshareoptiontelegram)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    console.log(err);
                  }),
                  {};
              }}>
              <Image source={icon.telegram} style={{width: 30, height: 30}} />
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <View style={styles.shareContainer}>
                <Text style={styles.shareText}>Share a Friend</Text>
                <Image
                  source={icon.invitefriends}
                  style={{width: 25, height: 21.43, marginLeft: 10}}
                />
              </View>
            </TouchableOpacity> */}
          </View>
          <Text style={styles.HeaderText}>How it works?</Text>
          <View style={styles.containerHow}>
            <View style={styles.ellipse}>
              <Text style={styles.Rowtext}>1</Text>
            </View>
            <Text style={styles.contentText}>
              Invite your friends and business.
            </Text>
          </View>
          <View style={styles.containerHow}>
            <View style={styles.ellipse}>
              <Text style={styles.Rowtext}>2</Text>
            </View>
            <Text style={styles.contentText}>
              They hit the road with $10 off.
            </Text>
          </View>
          <View style={styles.containerHow}>
            <View style={styles.ellipse}>
              <Text style={styles.Rowtext}>3</Text>
            </View>
            <Text style={styles.contentText}>You make saving!</Text>
          </View>
          <Text style={styles.HeaderText}>Statistics</Text>
          {/* <TouchableOpacity style={styles.containerHow2}>
            <View style={styles.ellipse}>
              <Image
                source={icon.invitefriends}
                style={{width: 25, height: 21.43}}
              />
            </View>
            <Text style={styles.contentText}>Friends Invited</Text>
          </TouchableOpacity> */}
          <View style={styles.containerHow2}>
            <View style={styles.ellipse}>
              {/* <Text style={styles.Rowtext}>3</Text> */}
              <Image
                source={icon.Businessesinvite}
                style={{width: 22, height: 22}}
              />
            </View>
            <Text style={styles.contentText}>Friends Invited</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Refer;

const styles = StyleSheet.create({
  BackContainer: {
    width: '100%',
    height: 25,
    justifyContent: 'center',
    marginTop: 15,
  },
  TitleText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#332F2E',
    marginTop: 25,
    left: '50%',
    marginLeft: -44,
    position: 'absolute',
  },
  COnContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#FAFAFE',
    marginTop: 13,
  },
  ReferText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#332F2E',
    alignSelf: 'center',
    marginTop: 28,
  },
  ReferCaption: {
    fontSize: 15,
    fontWeight: '400',
    color: '#332F2E',
    alignSelf: 'center',
    marginTop: 3,
  },
  CodeTextHeader: {
    fontSize: 15,
    fontWeight: '500',
    color: '#A7A7A7',
    alignSelf: 'center',
    marginTop: 20,
  },
  CodeContainer: {
    width: '89.23%',
    height: 53,
    alignSelf: 'center',
    marginTop: 11,
    borderRadius: 23,
    borderStyle: 'dashed',
    borderColor: '#FE7474',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  CodeText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#616167',
    marginLeft: 41,
  },
  copyBtn: {
    width: '21.54%',
    height: 29,
    backgroundColor: '#f5eeda',
    right: 8,
    position: 'absolute',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copytText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#332F2E',
  },
  OrText: {
    fontWeight: '400',
    fontSize: 15,
    color: '#332F2E',
    alignSelf: 'center',
    marginTop: 13,
  },
  shareContainer: {
    // width: '100%',
    // backgroundColor: 'lightgray',
    marginHorizontal: 40,
    flexDirection: 'row',
  },
  shareText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#332F2E',
    // backgroundColor: 'gray',
  },
  HeaderText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#332F2E',
    marginTop: 24,
    marginLeft: 44,
  },
  containerHow: {
    width: '100%',
    height: 40,
    // backgroundColor: '#FAFAFE',
    marginTop: 22,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerHow2: {
    width: '100%',
    height: 52,
    backgroundColor: '#FAFAFE',
    marginTop: 22,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ellipse: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    backgroundColor: 'white',
    marginLeft: 48,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#332F2E',
    marginLeft: 17,
  },
  Rowtext: {
    fontSize: 15,
    fontWeight: '600',
    color: '#332F2E',
  },
});
