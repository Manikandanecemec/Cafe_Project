import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, icon} from '../Constant';
import Lottie from 'lottie-react-native';
import {connect} from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: item =>
      dispatch({
        type: 'ADD_TO_CART',
        payload: item,
      }),
  };
}

class CafeCard extends React.Component {
  state = {
    wishlist: 'false',
    commend: 'false',
  };
  render() {
    return (
      // {this.state.commend == 'false'?():()}
      <Container style={{height: this.state.commend == 'true' ? 250 : 241}}>
        <ProductContainer>
          <ProductImageContainer>
            <Image
              source={{uri: this.props.url !== '' ? this.props.url : undefined}}
              // source={require(this.props.url)}
            />
            {/* <Image source={{uri: this.props.url}} /> */}
          </ProductImageContainer>
          <TileContainer>
            <PercentageContainer>
              <PerIcon>
                <Image source={icon.Coupon} />
              </PerIcon>
              <PerText>
                <PercentageText>{this.props.discount}% OFF</PercentageText>
              </PerText>
            </PercentageContainer>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 13,
                // backgroundColor: 'black',
              }}
              onPress={() => this.setState({wishlist: 'Selected'})}>
              <PerIcon2>
                {this.state.wishlist == 'Selected' ? (
                  <Lottie
                    source={require('../assets/7596-like.json')}
                    autoPlay={true}
                    loop={false}
                    duration={0}
                    // loop={false}
                    style={{
                      width: 30,
                      height: 30,
                      marginLeft: -20,
                      marginTop: -15,
                      position: 'absolute',
                    }}
                  />
                ) : (
                  <Image source={icon.Heart} style={{width: 12, height: 12}} />
                )}
              </PerIcon2>
            </TouchableOpacity>
          </TileContainer>
          <PriceText>₹250</PriceText>
          <TouchableOpacity style={{position: 'absolute'}}>
            {/* <Circle>
              <TouchableOpacity
                onPress={() => {
                  this.props.addItemToCart(item);
                }}>
                <Image source={icon.Plus} style={{height: 21, width: 21}} />
              </TouchableOpacity>
            </Circle> */}
          </TouchableOpacity>
        </ProductContainer>

        {/* </TouchableOpacity> */}

        <QualityContainer>
          <QContainer>
            <Image source={require('../assets/foodsafty.png')} />
          </QContainer>
          <QTextContainer>
            <QText>
              {/* {this.props.QualityText} */}
              Chef's special
            </QText>
          </QTextContainer>
        </QualityContainer>
        <TitleText>
          {this.props.ProductName}
          {/* Cappuchino */}
        </TitleText>
        <RatingContainer>
          <StarContainerall>
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
          </StarContainerall>
          <RatingText>{this.props.RatingValue1}</RatingText>
          <CommendText style={{height: this.state.commend == 'true' ? 50 : 30}}>
            Espresso shots with milk toped
            {this.state.commend == 'false' ? (
              <TouchableOpacity
                onPress={() => this.setState({commend: 'true'})}>
                <Text style={{fontSize: 10, fontWeight: '400', marginTop: 2}}>
                  {' '}
                  ...more
                </Text>
              </TouchableOpacity>
            ) : (
              <Text> milk with some essentioal</Text>
            )}
          </CommendText>
        </RatingContainer>
      </Container>
    );
  }
}
export default connect(mapDispatchToProps)(CafeCard);

const Container = styled.View`
  width: 122px;
  height: 241px;
  /* background: lightgray; */
  margin-right: 12px;
  margin-left: 12px;
  margin-top: 15px;
`;

const ProductContainer = styled.View`
  margin-top: 0.5px;
  width: 122px;
  height: 144px;
  background: #fdf8f4;
  border: 0.25px solid #fe7474;
  border-radius: 8px;
  box-shadow: 0px 4px 23px #e9e6e4;
  /* justify-content:center;
  align-items:center; */
`;

const ProductImageContainer = styled.View`
  width: 113px;
  height: 122px;
  /* background:black; */
  resize: contain;
  left: 3px;
  top: 8px;
`;

const QualityContainer = styled.View`
  left: 10px;
  top: 10px;
  width: 77px;
  height: 9px;
`;

const QContainer = styled.View`
  width: 9px;
  height: 9px;
  background: white;
`;

const QTextContainer = styled.View`
  position: absolute;
  width: 65px;
  height: 11px;
  margin-left: 12px;
  background: #fcf1cf;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
`;

const TitleText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: #332f2e;
  left: 10px;
  top: 11px;
  /* text-align:center; */
`;

const RatingText = styled.Text`
  font-weight: 400;
  font-size: 8px;
  color: #332f2e;
  left: 40px;
  /* top: 0.5px; */
  justify-content: center;
  position: absolute;
`;

const CommendText = styled.Text`
  font-weight: 400;
  font-size: 10px;
  color: #332f2e;
  opacity: 0.5;
  width: 94px;
  top: 7px;
  height: 30px;
`;

const RatingContainer = styled.View`
  width: 55px;
  height: 14px;
  border: 0.5px solid rgba(247, 221, 135, 0.54);
  border-radius: 3px;
  margin-top: 3px;
  left: 10px;
  /* background: black; */
  margin-top: 12px;
  /* position:absolute; */
`;

const StarContainerall = styled.View`
  top: 3.98px;
  left: 5px;
  width: 31px;
  height: 5.23px;
  /* background:black; */
  flex-direction: row;
`;

const StarContainer = styled.View`
  width: 4.99px;
  height: 5.23px;
  margin-right: 1.52px;
`;

const StarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const QText = styled.Text`
  font-weight: 400;
  font-size: 8px;
  color: #e94b64;
  /* margin-left:4px; */
  top: -1px;
  /* position:absolute; */
  /* background:black; */
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const TileContainer = styled.View`
  width: 100%;
  height: 13px;
  position: absolute;
  justify-content: center;
  margin-top: 12px;
`;

const PriceText = styled.Text`
  font-weight: 500;
  position: absolute;
  font-size: 11px;
  color: #e94b64;
  margin-top: 115px;
  margin-left: 14px;
`;

const Circle = styled.View`
  /* position:absolute; */
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #e94b64;
  width: 30px;
  height: 30px;
  left: 79px;
  top: 90px;
`;

const PercentageContainer = styled.View`
  width: 46px;
  height: 13px;
  background: #f7dd87;
  /* background:black; */
  border-radius: 3px;
  position: absolute;
  margin-left: 20px;
  justify-content: center;
`;

const PerIcon = styled.View`
  margin-left: 3px;
  width: 7px;
  height: 7px;
`;

const PerIcon2 = styled.View`
  /* position: absolute; */
  /* right: 13px;
  width: 12px;
  height: 12px; */
`;

const PerText = styled.View`
  position: absolute;
  right: 6px;
  /* margin-top:2px; */
`;

const PercentageText = styled.Text`
  font-weight: 600;
  font-size: 6.5px;
  color: #332f2e;
  left: 2.3px;
`;
