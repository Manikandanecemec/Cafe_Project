import React from "react";
import styled from 'styled-components';
import SequareBox from "../Components/SquareBox"
import { ScrollView } from "react-native";


export default class ChannelScreen extends React.Component{
    render(){
        return (
            <Container>
                <Image source={{uri:"https://kscmmc.in/wp-content/uploads/2020/09/modern-shapes-bg.png"}}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                
            <Title>Popular Channels</Title>
            <View>
            {SequareBoxData.map((data,index)=>(
            <SequareBox key={index} url={data.image}/>
            ))}
            </View>
            </ScrollView>
            
            </Container>
            
            )
      
      }
}
const Container = styled.View`
position:absolute;
width:100%;
height:100%;
background:white;
`;

const Title=styled.Text`
margin-top:20px;
margin-left: -21%;
left:50%;
font-weight: 700;
font-size: 20px;
color: black;
`;
const Image = styled.Image`
width:120%;
height:120%;
position:absolute;
`;

const View = styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  margin-top:10px;
`;
const SequareBoxData=[
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1137/661137-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1132/661132-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/8774/1308774-h-524cdf69effa",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1138/661138-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1105/661105-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1116/661116-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1119/661119-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1121/661121-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/6970/956970-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1167/661167-h",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/3048/1293048-h-ae12f43d4d9e",
    },
    {
      image:"https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_3x/sources/r1/cms/prod/1104/661104-h",
    },
   
    
  ];
 