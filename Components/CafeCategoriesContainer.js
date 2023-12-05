import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';

export default class CafeCategoriesContainer extends React.Component {
  render() {
    return (
      // <TouchableOpacity
      //   onPress={() => {
      //     this.props.navigation.push('ProdutTab');
      //   }}
      //   >
      <BigContainer>
        <ImageContainer>
          <Image source={this.props.url} />
        </ImageContainer>
        <Text>{this.props.Text}</Text>
      </BigContainer>
      // </TouchableOpacity>
    );
  }
}

const BigContainer = styled.View`
  margin-right: 5px;
  width: 119px;
  height: 43px;
  border: 1px solid #e94b64;
  border-radius: 7px;
  margin-left: 15px;
  justify-content: center;
  margin-top: 14px;
  /* background:black; */
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.View`
  width: 25px;
  height: 22px;
  margin-left: 15px;
  /* background:black; */
  /* resize:center; */

  /* align-items:center; */
`;

const Text = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: #332f2e;
  position: absolute;
  right: 18px;
`;
