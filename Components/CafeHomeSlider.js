import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';

export default class CafeHomeSlider extends React.Component {
  render() {
    return (
      <BigContainer>
        <Image source={this.props.url} />
        <Text>{this.props.discount}</Text>
        <TouchableOpacity style={{position: 'absolute'}}>
          <Container>
            <ContainerText>Order Now</ContainerText>
          </Container>
        </TouchableOpacity>
      </BigContainer>
    );
  }
}

const BigContainer = styled.View`
  width: 350px;
  /* width: 80%; */
  height: 182.13px;
  border-radius: 10px;
  margin-top: 2%;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Text = styled.Text`
  position: absolute;
  font-size: 30px;
  width: 146px;
  color: black;
  font-weight: 800;
  margin-top: 26.74px;
  margin-left: 29px;
`;

const Container = styled.View`
  margin-left: 29px;
  margin-top: 118.74px;
  background: #e94b64;
  /* position:absolute; */
  border-radius: 5px;
  width: 107px;
  height: 28px;
`;

const ContainerText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: white;
  /* color:COLORS.white; */
  text-align: center;
  margin-top: 6px;
`;
