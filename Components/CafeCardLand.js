import React from 'react';
import styled from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, SafeAreaView} from 'react-native';

import {ColorTheme, icon} from '../Constant';

export default class CafeCardLand extends React.Component {
  render() {
    return (
      // <TouchableOpacity onPress={() => this.props.navigation('ProdutTab')}>
      <BigContainer style={{flex: 1, backgroundColor: ColorTheme.white}}>
        <Container
        // style={{backgroundColor:ColorTheme.lightGray}}
        >
          <ProductContainer>
            {/* <PerCentageContainer>
</PerCentageContainer> */}
            <Image
              source={this.props.Url}
              // {icon.Filtercoffee}
            />
          </ProductContainer>
          <PerText>
            {/* Filter coffee */}
            {this.props.productName}
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
              {this.props.RatingValue1}
              {/* 23 */}
            </RatingText>
          </StarContainerall>
          <PriceText>
            {/* ₹60 */}
            {this.props.price}
          </PriceText>

          {/* Add button component */}

          {/* <TouchableOpacity style={{position:"absolute"}}>
                  <Add>
                  <PerIcon>
                <MaterialCommunityIcons name="plus" color="white" size={27.59}/>
                </PerIcon>
                  </Add>
                  </TouchableOpacity> */}

          <CartaddContainer>
            <TouchableOpacity>
              <AddContainer>
                <Image source={icon.Minus} style={{height: 15, width: 15}} />
              </AddContainer>
            </TouchableOpacity>

            <CountContainer>
              <AddText>0</AddText>
            </CountContainer>

            <TouchableOpacity>
              <SubContainer>
                <Image source={icon.Addition} style={{height: 15, width: 15}} />
              </SubContainer>
            </TouchableOpacity>
          </CartaddContainer>

          <PercentageContainer>
            <PerIconC>
              <Image source={icon.Coupon} style={{height: 9.25, width: 9.25}} />
            </PerIconC>
            <PerTextC>
              <PercentageText>{this.props.discount}</PercentageText>
            </PerTextC>
          </PercentageContainer>
          <CustomText>CUSTOMIZE</CustomText>
        </Container>
      </BigContainer>
      // </TouchableOpacity>
    );
  }
}

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
  border-radius: 15px;
`;

const Image = styled.Image`
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
const PerIcon = styled.View`
  /* background:black; */
  margin-left: 4px;
  margin-top: 5.91px;
  /* justify-content:center;
align-items:center; */
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
  font-size: 10px;
  color: #e94b64;
  right: 20px;
  /* color:pink; */
  position: absolute;
  /* margin-left:274px; */
  margin-top: 9px;
`;
