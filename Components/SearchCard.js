import React from "react";
import styled from 'styled-components';
import {TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "react-native-vector-icons"

import {COLORS,icon} from "../Constant";

export default class SearchCard extends React.Component{
    render(){
        return(
            <SearchCardContainer>

{/* <ProductContainer> */}
                <ProductImageContainer>
                <Image source=
                {this.props.Url}
                // {icon.cappuccino}
                />
                </ProductImageContainer>
                <TileContainer>
                <PercentageContainer>
                  <PerIcon>
                <MaterialCommunityIcons name="ticket-percent-outline" color="black" size={9.25}/>
                </PerIcon>
                  <PerText>
                <PercentageText>
                  {/* 25% OFF */}
                  {this.props.discount}
                  </PercentageText>
                </PerText>
                </PercentageContainer>
                <PerIcon2>
                <MaterialCommunityIcons name="heart-outline" color="#E94B64" size={16}/>
                </PerIcon2>
                </TileContainer>
                <PriceText>₹250</PriceText>
                <TouchableOpacity style={{position:"absolute"}}>
                <Circle>
                <MaterialCommunityIcons name="plus" color="white" size={27.59}/>
                </Circle>
                </TouchableOpacity>
                
                <Product>
                <TitleText>
                  {this.props.ProductName}
                  {/* Cappuchino */}
                  </TitleText>
                <RatingContainer>
                  <StarContainerall>
                  <StarContainer>
                    <StarImage source={require('../assets/star.png')}/>
                  </StarContainer>
                  <StarContainer>
                    <StarImage source={require('../assets/star.png')}/>
                  </StarContainer>
                  <StarContainer>
                    <StarImage source={require('../assets/star.png')}/>
                  </StarContainer>
                  <StarContainer>
                    <StarImage source={require('../assets/stargray.png')}/>
                  </StarContainer>
                  <StarContainer>
                    <StarImage source={require('../assets/stargray.png')}/>
                  </StarContainer>
                  </StarContainerall>
                  <RatingText>
                    {this.props.RatingValue1}
                    {/* 23 */}
                    </RatingText>
  
                </RatingContainer>
                </Product>

            </SearchCardContainer>

        )
    }
}

const SearchCardContainer = styled.View`
width: 160px;
height: 235px;
background: #FDF8F4;
border: 0.25px solid #FE7474;
box-shadow: 0px 4px 23px #E9E6E4;
border-radius: 8px; 
margin-top:17px;
margin-left:25px;
`;

const ProductImageContainer = styled.View`
width: 149px;
height: 160px;
/* background:black; */
resize:contain;
left:3px;
top:11px;
`;


const Image = styled.Image`
  width:100%;
  height:100%;
`;


const TileContainer = styled.View`
  width:100%;
  height:13px;
  position:absolute;
  justify-content:center;
  margin-top:12px;
`;

const PriceText  = styled.Text`
  position:absolute;
  font-weight: 500;
font-size: 11px;
color: #E94B64;
margin-top:153px;
margin-left:18px;
`;

const Circle = styled.View`
/* position:absolute; */
justify-content:center;
align-items:center;
border-radius: 100px;
background: #E94B64;
width: 39.42px;
height: 39.42px;
  left: 103.51px;
top: 118.26px;
`;

const PercentageContainer = styled.View`
width: 60px;
height: 17px;
background: #F7DD87;
/* background:black; */
border-radius: 3px;
position:absolute;
margin-left:20px;
justify-content:center;

`;

const PerIcon = styled.View`
  margin-left:3.92px;
`;

const PerIcon2 = styled.View`
position:absolute;
  right:17px;
`;

const PerText = styled.View`
position:absolute;
right:6px;
/* margin-top:2px; */
`;

const PercentageText = styled.Text`
font-weight: 600;
font-size: 8px;
color: #332F2E;
left:0.1px;
`;

const TitleText = styled.Text`
font-weight: 500;
font-size: 16px;
color: #332F2E;
/* left:10px; */
top:11px;
/* text-align:center; */

  
`;

const RatingContainer = styled.View`
width: 72.27px;
height: 18.4px;
  border: 0.5px solid rgba(247, 221, 135, 0.54);
border-radius: 3px;
margin-top:3px;
margin-top:12px;
justify-content:center;
`;

const StarContainerall = styled.View`
    /* top:3.98px; */
  left:5px;
  width:31px;
  height: 5.23px;
  /* background:black; */
  flex-direction:row;
`;

const StarContainer = styled.View`
  width:6.55px;
  height:6.55px;
  margin-right:1.52px;

`;

const StarImage = styled.Image`
  width:100%;
  height:100%;
`;

const RatingText = styled.Text`
  font-weight: 400;
font-size: 8px;
color: #332F2E;
left:53px;
/* top: 0.5px; */
justify-content:center;
position:absolute;
`;

const Product = styled.View`
  align-items:center;
`;