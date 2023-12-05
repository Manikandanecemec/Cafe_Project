// mycoffee code

import React, {useState} from 'react';
import styled from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import CafeCardLand from '../Components/CafeCardLand';
import {ColorTheme, icon} from '../Constant';

const height = Dimensions.get('window').height;

function mapStateToProps(state) {
  return {cartItems: state};
}

function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: item =>
      dispatch({
        type: 'ADD_TO_CART',
        payload: item,
      }),
  };
}

// const MyCoffee = ({navigation, props}) => {

// if (this.props.state !== 'All') {
//   setDatalist([...data.filter(() => i.status == this.props.state)]);
// } else {
//   setDatalist(data);
// }

class MyCoffee extends React.Component {
  state = {
    AddCondition: 'OPEN',
  };
  render(navigation) {
    const item = this.props.route.params.catagory;
    console.log(item);

    // const datasheet={...datafile.filter(e => e.catagory == 'Beverag')}

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: ColorTheme.white}}>
        {/* coustom container */}
        <View style={{position: 'absolute'}}></View>
        <View style={{flexDirection: 'row', marginTop: 25}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home1')}>
            <SearchIcon>
              <Image source={icon.BackBotton} style={{height: 26, width: 26}} />
            </SearchIcon>
          </TouchableOpacity>
          <Text style={{alignSelf: 'center', marginLeft: '30%'}}>Coffee</Text>
        </View>

        <ScrollView>
          {item.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                this.props.navigation.navigate('Product', {
                  product: item,
                  datas: item,
                });
              }}>
              <BigContainer style={{flex: 1, backgroundColor: 'white'}}>
                <Container>
                  <ProductContainer>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={
                        // {this.props.url}
                        item.url
                      }
                    />
                  </ProductContainer>
                  <PerText>
                    {/* {this.props.productName} */}
                    {item.productName}
                  </PerText>
                  <StarContainerall>
                    <Cont>
                      <StarContainer>
                        <StarImage source={require('../assets/star.png')} />
                      </StarContainer>
                      <StarContainer>
                        <StarImage source={require('../assets/star.png')} />
                      </StarContainer>
                      <StarContainer>
                        <StarImage source={require('../assets/star.png')} />
                      </StarContainer>
                      <StarContainer>
                        <StarImage source={require('../assets/stargray.png')} />
                      </StarContainer>
                      <StarContainer>
                        <StarImage source={require('../assets/stargray.png')} />
                      </StarContainer>
                    </Cont>
                    <RatingText>
                      {/* {this.props.RatingValue1} */}
                      {item.RatingValue1}
                      {/* 23 */}
                    </RatingText>
                  </StarContainerall>

                  <PriceText>
                    {/* ₹60 */}
                    {/* {this.props.price} */}
                    {item.price}
                  </PriceText>

                  {this.state.AddCondition == item.id ? (
                    <View style={{position: 'absolute'}}>
                      <CartaddContainer>
                        <TouchableOpacity
                          onPress={() => this.props.removeItem(item)}>
                          <AddContainer>
                            <Image
                              source={icon.Minus}
                              style={{height: 15, width: 15}}
                            />
                          </AddContainer>
                        </TouchableOpacity>

                        <CountContainer>
                          <AddText>0</AddText>
                        </CountContainer>

                        <TouchableOpacity
                          onPress={() => this.props.addItemToCart(item)}>
                          <SubContainer>
                            <Image
                              source={icon.Addition}
                              style={{height: 15, width: 15}}
                            />
                          </SubContainer>
                        </TouchableOpacity>
                      </CartaddContainer>
                      <CustomText>CUSTOMIZE</CustomText>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 37.58,
                        marginTop: 33,
                      }}
                      onPress={() => this.setState({AddCondition: item.id})}>
                      <Image
                        source={icon.Ellipsewithplus}
                        style={{
                          height: 39.42,
                          width: 39.42,
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  )}

                  <PercentageContainer>
                    <PerIconC>
                      <Image
                        source={icon.Coupon}
                        style={{height: 9.25, width: 9.25}}
                      />
                    </PerIconC>
                    <PerTextC>
                      <PercentageText>
                        {/* {this.props.discount} */}
                        {item.discount}% OFF
                      </PercentageText>
                    </PerTextC>
                  </PercentageContainer>
                </Container>
              </BigContainer>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* </TouchableOpacity> */}
        {/* coustom container */}
        {this.props.cartItems.length > 0 ? <View style={{height: 75}} /> : null}

        {this.props.cartItems.length > 0 ? (
          <View
            style={{
              width: '89.74%',
              height: 66,

              position: 'absolute',
              alignSelf: 'center',
              borderRadius: 15,
              backgroundColor: '#E94B64',
              borderRadius: 15,

              marginTop: height - 100,
              justifyContent: 'center',
            }}>
            <Text style={styles.itemText}>
              {this.props.cartItems.length} Items | ₹218
            </Text>
            <TouchableOpacity
              style={styles.ViewCartContainer}
              onPress={() => {
                this.props.navigation.push('Cart');
              }}>
              <Text style={styles.cartText}>View cart</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCoffee);

const SearchIcon = styled.View`
  width: 26.07px;
  height: 26.07px;
  /* margin-top: 25px; */
  margin-left: 20px;
`;
const BigContainer = styled.View`
  margin-top: 7.57px;
  /* background-color:black; */
  /* background:black; */
`;
const Container = styled.View`
  width: 90%;
  height: 106px;
  border: 0.25px solid #dadada;
  border-radius: 15px;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const ProductContainer = styled.View`
  width: 109px;
  height: 106px;
  background: rgba(233, 230, 228, 0.32);
  border: 0.25px solid #ffffff;
  overflow: hidden;
  border-radius: 15px;
`;

const Imagee = styled.Image`
  width: 100%;
  height: 100%;
`;

const PerText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: #332f2e;
  position: absolute;
  margin-left: 128px;
  margin-top: 16px;
`;

const StarContainerall = styled.View`
  top: 3.98px;
  left: 5px;
  /* width:31px;
  height: 5.23px; */
  width: 72.27px;
  height: 18.77px;
  position: absolute;
  /* justify-content:center; */
  align-items: center;
  /* background:black; */
  flex-direction: row;
  margin-left: 122px;
  margin-top: 39px;
  border: 0.5px solid rgba(247, 221, 135, 0.54);
  border-radius: 3px;
`;

const Cont = styled.View`
  flex-direction: row;
  /* position:absolute; */
  margin-left: 6.57px;
`;

const StarContainer = styled.View`
  width: 6.55px;
  height: 6.87px;
  margin-right: 1.52px;
`;
const StarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const RatingText = styled.Text`
  font-weight: 400;
  font-size: 8px;
  color: #332f2e;
  left: 5.7px;
  justify-content: center;
`;

const PriceText = styled.Text`
  position: absolute;
  font-weight: 500;
  font-size: 11px;
  color: #e94b64;
  margin-left: 128px;
  margin-top: 76px;
`;

const Add = styled.View`
  width: 40px;
  height: 40px;
  /* background:black; */
  border-radius: 20px;
  /* position:absolute; */
  /* margin-left:256px; */
  margin-left: 80%;
  /* right:37.58px; */
  margin-top: 33px;
  background: #e94b64;
  border: 1px solid #e94b64;
`;

const CartaddContainer = styled.View`
  width: 28.46%;
  /* width:111px; */
  height: 34px;
  /* background:lightgrey; */
  position: absolute;
  margin-top: 59px;
  margin-left: 210px;
  flex-direction: row;
`;

const AddContainer = styled.View`
  width: 32px;
  height: 32px;
  background: #e5e5ea;
  border-radius: 8px;
  opacity: 0.6;
  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;

const AddText = styled.Text`
  color: #22292e;
  font-weight: 400;
  font-size: 15px;
  /* background:black; */
`;

const CountContainer = styled.View`
  width: 32px;
  height: 32px;
  /* background: #E5E5EA; */
  border: 1px solid #c6c6c8;
  border-radius: 8px;
  /* opacity:0.6; */
  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.View`
  width: 32px;
  height: 32px;
  background: #e5e5ea;
  border-radius: 8px;
  opacity: 0.6;
  margin-right: 6px;
  justify-content: center;
  align-items: center;
`;

const PercentageContainer = styled.View`
  /* width: 46px;
height: 13px; */
  width: 60px;
  height: 17px;
  background: #f7dd87;
  /* background:black; */
  /* border-radius: 3px; */
  position: absolute;
  overflow: hidden;
  /* margin-left:20px; */
  justify-content: center;
`;

const PerIconC = styled.View`
  margin-left: 7px;
  /* margin-top:3.94px; */
`;

const PerTextC = styled.View`
  position: absolute;
  right: 2px;
  /* margin-top:2px; */
`;

const PercentageText = styled.Text`
  font-weight: 600;
  font-size: 8px;
  color: #332f2e;
  /* left:5.92px; */
  right: 2px;
  /* background:black; */
`;

const CustomText = styled.Text`
  font-weight: 400;
  font-size: 9px;
  color: #e94b64;
  right: 20px;
  margin-left: 83.21%;
  margin-top: 9px;

  /* font-weight: 400;
  font-size: 10px;
  color: #e94b64;
  right: 20px;
  position: absolute;
  margin-top: 9px; */
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop:30,
  },
  ProductContainer: {
    width: '100%',
    height: 378,
    // marginTop:10,
    backgroundColor: '#FDF8F4',
    borderBottomLeftRadius: 63,
    borderBottomRightRadius: 63,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    width: 250,
    height: 250,
    // alignSelf:"center",
    // alignItems:"center",
    // backgroundColor:"black",
    // justifyContent:"center"
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  productText: {
    fontSize: 15,

    fontWeight: '700',
    // alignSelf:"center",
    color: '#332F2E',
    position: 'absolute',
  },

  btnBarContainer: {
    width: '100%',
    height: 25,
    // backgroundColor:"black",
    position: 'absolute',
    marginTop: 32,
  },
  incrementContainer: {
    width: '100%',
    height: 107,
    // backgroundColor:"lightgray",
    justifyContent: 'center',
    alignItems: 'center',
  },
  tiltleText: {
    color: '#332F2E',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 19,
  },
  listContainer: {
    // width:"89.74%",
    width: 350,
    height: 55,
    // backgroundColor:"#F7DD87",
    backgroundColor: '#EDD99C1C',
    marginLeft: 20,
    marginTop: 8,
    opacity: 0.9,
    borderRadius: 4,
    alignContent: 'center',
    // justifyContent:"center",
    flexDirection: 'row',
    marginBottom: 10,
  },
  btnContainer: {
    // width:"24.36%",
    width: 95,
    height: 45,
    // backgroundColor:"#FDFBF6",
    // backgroundColor:"black",
    borderRadius: 4,
    marginLeft: 6,
    marginRight: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  btnContainerActive: {
    // width:"24.36%",
    // height:45,
    backgroundColor: '#FAECBF',
    borderColor: '#FFB90A',
    borderRadius: 4,
    borderWidth: 0.5,
  },
  btnText: {
    color: '#332F2E',
    fontSize: 15,
    fontWeight: '400',
  },
  btnTextActive: {
    fontSize: 15,
    fontWeight: '600',
    color: '#332F2E',
  },
  priceBarContainer: {
    width: '89.74%',
    width: 350,
    height: 66,
    // marginTop: 35,
    backgroundColor: '#E94B64',
    borderRadius: 15,
    left: '50%',
    marginLeft: '-44.87%',

    marginBottom: 20,
    justifyContent: 'center',
    // position: 'absolute',
  },
  itemText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 25,
  },
  ViewCartContainer: {
    // width:80,
    // height:28,
    // backgroundColor:"white",
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 28,
  },

  cartText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 25,
    right: 28,
    position: 'absolute',
  },
});
