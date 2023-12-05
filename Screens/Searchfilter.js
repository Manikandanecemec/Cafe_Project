import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {COLORS, icon} from '../Constant';
import Lottie from 'lottie-react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const numColumns = 2;

const Height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Searchfilter = ({navigation}) => {
  const [whishlist, setwhishlist] = useState('false');
  const [loading, setLoading] = useState(false);
  const [sort, setsort] = useState('false');
  const [status, setstatus] = useState('Hot');
  const [volume, setVolume] = useState('High');
  const [level, setLevel] = useState('Medium');
  const [rateing, setrateing] = useState('All');
  const [Search, setSearch] = useState('');
  const SearchRef = useRef();
  const usergetdata = auth().currentUser;
  const [data, setdata] = useState([]);
  const [datlist, setDatalist] = useState([
    ...data.filter(e => e.status == status),
  ]);

  const addItemToCart = async item => {
    const userId = usergetdata.uid;
    const user = await firestore().collection('users').doc(userId).get();
    let tempDart = [];
    // console.log(tempDart);
    tempDart = user._data.cart;
    if (tempDart.length > 0) {
      let existing = false;
      tempDart.map(itm => {
        if (itm.id == item.id) {
          itm.qty = itm.qty + 1;
          itm.sugarLevel = level;
          itm.volume = volume;
          itm.status = status;
          existing = true;
          console.log('existing to cart from searchscreen');
        }
        firestore().collection('users').doc(userId).update({
          cart: tempDart,
        });
      });
      if (existing == false) {
        tempDart.push(item);
        console.log('Added new to cart from searchscreen');
      }
    } else {
      tempDart.push(item);
    }
    firestore().collection('users').doc(userId).update({
      cart: tempDart,
    });
    // setCartList(user._data.cart);
  };

  const setstatusFilter = status => {
    if (status !== 'All') {
      setDatalist([...data.filter(e => e.status == status)]);
    } else {
      setDatalist(data);
    }
    setstatus(status);
  };

  const onSearch = text => {
    let templist = data.filter(e => {
      return e.productName.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    setDatalist(templist);
  };

  const SetRatingFilter = rateing => {
    if (rateing == 'Price(low)') {
      // setDatalist(...data.sort((a, b) => a.price - b.price));
      setDatalist(data.sort((a, b) => a.price - b.price));
    } else {
      // setDatalist(data);
      setDatalist([...data.filter(e => e.rating == rateing)]);
    }
    setrateing(rateing);
  };

  useEffect(() => {
    setLoading(true);
    database()
      .ref('/CafeCardData')
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        const newData = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setdata(newData);
        // setDatalist(newData);
        // console.log(data);
      })
      .finally(() => {
        // setLoading(false);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    const setstatusFilter = status => {
      // console.log('SCreenVal' + status);
      setDatalist([...data.filter(e => e.status == status)]);
    };
    setstatusFilter(status);
  }, [data]);

  //render item
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate('ProductTab2', {
            product: item,
            datas: data,
          });
        }}>
        <View style={styles.itemContainer}>
          <SearchCardContainer>
            <ProductImageContainer>
              <Image2
                source={{uri: item.url !== '' ? item.url : undefined}}
                // source={
                //   // {this.props.Url}
                //   item.url
                // }
                // {icon.cappuccino}
              />
            </ProductImageContainer>
            <TileContainer>
              <PercentageContainer>
                <PerIcon>
                  <Image
                    source={icon.Coupon}
                    style={{height: 9.25, width: 9.25}}
                  />
                </PerIcon>
                <PerText>
                  <PercentageText>
                    {/* 25% OFF */}
                    {/* {this.props.discount} */}
                    {item.discount}% OFF
                  </PercentageText>
                </PerText>
              </PercentageContainer>
              <TouchableOpacity onPress={() => setwhishlist(item.productName)}>
                <PerIcon2>
                  {whishlist == item.productName ? (
                    <Lottie
                      source={require('../assets/7596-like.json')}
                      autoPlay={true}
                      loop={false}
                      duration={0}
                      // loop={false}
                      style={{
                        width: 40,
                        height: 40,
                        marginLeft: 11,
                        marginTop: -6,
                      }}
                    />
                  ) : (
                    <Image
                      source={icon.Heart}
                      style={{height: 16, width: 16}}
                    />
                  )}
                </PerIcon2>
              </TouchableOpacity>
            </TileContainer>
            <PriceText>
              {/* ₹250 */}₹{item.price}
            </PriceText>
            <TouchableOpacity
              style={{position: 'absolute'}}
              onPress={() => addItemToCart(item)}>
              <Circle>
                <Image source={icon.Plus} style={{height: 16, width: 27.59}} />
              </Circle>
            </TouchableOpacity>

            <Product>
              <TitleText>
                {item.productName}
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
                <RatingText>
                  {/* {this.props.RatingValue1} */}
                  {item.RatingValue1}
                  {/* 23 */}
                </RatingText>
              </RatingContainer>
            </Product>
          </SearchCardContainer>
        </View>
      </TouchableOpacity>
    );
  };
  //render item//

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          // alignSelf: 'center',
          // alignContent: 'center',
        }}>
        <Lottie
          source={require('../assets/97930-loading')}
          autoPlay={true}
          loop={true}
          duration={0}
          // loop={false}
          style={{width: 100, height: 100}}
        />
      </View>
      // <Text>Data is loading...</Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        // nestedScrollEnabled={true}
        nestedScrollEnabled={true}> */}

      <SearchContainer>
        <TouchableOpacity
          style={{position: 'absolute'}}
          onPress={() => navigation.navigate('Home1')}>
          <SearchIcon2>
            <Image source={icon.BackBotton} style={{height: 26, width: 26}} />
          </SearchIcon2>
        </TouchableOpacity>
        <TextInput
          ref={SearchRef}
          placeholder="Coffee"
          keyboardType="default"
          activeColor
          placeholderTextColor={'black'}
          style={{padding: 10, color: 'black'}}
          onChangeText={txt => {
            onSearch(txt);
            setSearch(txt);
            setstatus('');
            setrateing('');
          }}></TextInput>
        {/* <TouchableOpacity> */}

        {Search == '' ? null : (
          <SearchIcon>
            <TouchableOpacity
              onPress={() => {
                SearchRef.current.clear();
                onSearch('');
              }}>
              <CloseIcon source={icon.SearchClose} />
            </TouchableOpacity>
          </SearchIcon>
        )}

        {/* </TouchableOpacity> */}
      </SearchContainer>

      <View style={styles.listTab}>
        {listTab.map((e, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.btnTab, status === e.status && styles.btnActive]}
            onPress={() => {
              setstatusFilter(e.status),
                // console.log(setstatusFilter);
                setrateing('All'),
                SearchRef.current.clear();
              // onSearch('');
            }}>
            <Text
              style={[
                styles.TextTab,
                status === e.status && styles.textActive,
              ]}>
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          width: '89.23%',
          height: 1,
          backgroundColor: 'black',
          opacity: 0.1,
          alignSelf: 'center',
          marginTop: 21,
        }}></View>
      <View style={styles.secondConatiner}>
        <TouchableOpacity
          style={styles.sortbtn}
          onPress={() => {
            setsort('true'),
              setstatus(''),
              setrateing(''),
              SearchRef.current.clear();
            // onSearch('');
          }}>
          <SortText>Sort</SortText>
          <SortImageContainer>
            <SortDown source={icon.sortDown} />
          </SortImageContainer>
        </TouchableOpacity>

        {SecondListTab.map((c, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.btnTab2, rateing === c.rateing && styles.btnActive]}
            onPress={() => {
              SetRatingFilter(c.rateing),
                setstatus('All'),
                SearchRef.current.clear();
              // onSearch('');
            }}>
            <Text
              style={[
                styles.TextTab,
                rateing === c.rateing && styles.textActive,
              ]}>
              {c.rateing}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{marginBottom: 5}}></View>
      <FlatList
        data={datlist}
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        // scrollEnabled={false}
        // scrollEnabled={true}
        // listMode="SCROLLVIEW"
        // listMode="MODAL"
      />
      <TouchableOpacity
        onPress={() => setsort('false')}
        style={[
          styles.backgroundColor1,
          sort == 'true' && styles.backgroundColorSel,
        ]}></TouchableOpacity>

      <View
        style={[
          styles.whiteContainer,
          sort == 'true' && styles.whiteContainerSel,
        ]}>
        <TouchableOpacity
          onPress={() => {
            setDatalist(
              data.sort((a, b) => (b.productName < a.productName ? 1 : -1)),
            );

            setsort('false');
          }}>
          <Text style={styles.sortContentText}>Sort by Name</Text>
        </TouchableOpacity>
        <View style={styles.Divider} />
        <TouchableOpacity
          onPress={() => {
            setsort('false');
            setDatalist(data.sort((a, b) => a.RatingValue1 - b.RatingValue1));
          }}>
          <Text style={styles.sortContentText}>Sort by Rating</Text>
        </TouchableOpacity>
        <View style={styles.Divider} />
        <TouchableOpacity
          onPress={() => {
            setsort('false');
            setDatalist(data.sort((a, b) => a.price - b.price));
          }}>
          <Text style={styles.sortContentText}>Low to High Price</Text>
        </TouchableOpacity>
        <View style={styles.Divider} />
        <TouchableOpacity
          onPress={() => {
            setsort('false');
            setDatalist(data.sort((a, b) => b.price - a.price));
          }}>
          <Text style={styles.sortContentText}>High to Low Price</Text>
        </TouchableOpacity>
        {/* <View style={styles.Divider} /> */}
      </View>

      {/* </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Searchfilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // paddingHorizontal: 9,
    // justifyContent:"center",
  },
  backgroundColor1: {
    flex: 1,
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.31,
    marginTop: Height - 20,
  },
  backgroundColorSel: {
    flex: 1,
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.2,
    marginTop: 0,
  },
  whiteContainer: {
    width: '56.41%',
    height: 165,
    backgroundColor: '#ffffff',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: Height - 20,
    borderRadius: 12,
  },
  whiteContainerSel: {
    width: '56.41%',
    height: 165,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: '50%',
    borderRadius: 12,
  },
  sortContentText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#332F2E',
    alignSelf: 'center',
    paddingVertical: 20,
    // backgroundColor: '#f2f2f2',
  },
  Divider: {
    backgroundColor: '#332F2E42',
    width: '80%',
    height: 1,
    opacity: 0.26,
    alignSelf: 'center',
  },
  listTab: {
    flexDirection: 'row',
    // backgroundColor: 'black',
    // alignSelf:'center',
    // marginBottom:20,
    marginTop: 20,
    marginLeft: 19,
    // paddingBottom: 20,
    // paddingTop: 20,
  },
  btnTab: {
    width: 120,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#DADADA',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 7,
    marginRight: 10,
    paddingBottom: 10,
  },
  btnTab2: {
    width: '34.36%',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#DADADA',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 7,
    marginRight: 10,
    paddingBottom: 10,
  },
  TextTab: {
    fontSize: 14,
    // padding:9,
    alignSelf: 'center',
  },
  btnActive: {
    backgroundColor: '#FBEEC4',
    borderColor: '#FFB90A',
  },
  textActive: {
    color: '#E94B64',
    fontSize: 14,
  },
  itemContainer: {
    marginBottom: 10,
    // position:"absolute",
    // width:"100%",
    // height:"100%",
    // flexDirection:"row",
    // flexDirection:"row",
    // flexWrap:"wrap",
    // backgroundColor:"pink"
    // marginBottom:20,
  },
  itemLogo: {
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemBody: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  // itemStatus: {
  //   backgroundColor: 'green',
  //   paddingHorizontal: 6,
  //   justifyContent: 'center',
  //   right: 12,
  //   position: 'absolute',
  // },
  ListContainer: {
    // flex:1,
    // width:"100%",
    // height:"100%",
    // flexDirection:"column",
    flexDirection: 'row',
  },
  ContainerEx: {
    width: 200,
    height: 200,
    backgroundColor: 'black',
  },
  secondConatiner: {
    flexDirection: 'row',
    marginTop: 21,
    marginLeft: 19,
  },
  sortbtn: {
    width: '24.10%',
    height: 43,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 7,
    marginRight: 10,
    justifyContent: 'center',
  },
});

const Container = styled.View`
  /* position:absolute; */
  width: 100%;
  height: 100%;
  background: white;
  /* background:gray; */
`;

const SearchContainer = styled.View`
  width: 89.74%;
  height: 57.16px;
  border: 1px solid #e94b64;
  margin-top: 30px;
  border-radius: 15px;
  left: 50%;
  margin-left: -44.87%;
  padding-left: 5.35%;
  justify-content: center;
  /* flex-direction:"column"; */
`;

const Variety = styled.View`
  flex-direction: row;
  width: 89.74%;
  height: 43px;
`;

const TextInput = styled.TextInput`
  width: 68.21%;
  height: 40px;
  border-radius: 15px;
  margin-left: 37px;
`;

const SeachText = styled.Text`
  color: black;
  font-size: 13px;
`;

const SearchIcon = styled.View`
  position: absolute;
  width: 20px;
  height: 20px;
  /* background:black; */
  right: 25px;
`;

const CloseIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

const SearchIcon2 = styled.View`
  /* position:absolute; */
  width: 26.07px;
  height: 26.07px;
  margin-left: 24px;
`;

const VarietyofCoffee1 = styled.View`
  width: 119px;
  height: 43px;
  margin-left: 19px;
  margin-top: 20px;
  /* background: rgba(247, 221, 135, 0.49); */
  /* border: 0.5px solid #FFB90A; */
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`;

const RatedContainer = styled.View`
  width: 80px;
  height: 43px;
  margin-left: 19px;
  margin-top: 20px;
  background: rgba(247, 221, 135, 0.49);
  border: 0.5px solid #ffb90a;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`;

const VarietyofCoffee2 = styled.View`
  width: 119px;
  height: 43px;
  margin-left: 19px;
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #fbeec4;
  }
`;

const PriceFilterContainer = styled.View`
  width: 134px;
  height: 43px;
  margin-left: 19px;
  margin-top: 20px;
  background: #ffffff;
  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  /* background:lightgray; */
`;

const CafeContainer = styled.View`
  width: 100%;
  height: 100%;
  margin-top: 22px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const SortContainer = styled.View`
  width: 94px;
  height: 43px;
  /* margin-left:19px; */
  /* margin-top:20px; */
  background: #ffffff;
  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 7px;
  justify-content: center;
  margin-right: 10;
`;
const SortImageContainer = styled.View`
  width: 16.95px;
  height: 16.3px;
  position: absolute;
  /* margin-left: 65px; */
  right: 12px;
`;

const SortDown = styled.Image`
  width: 100%;
  height: 100%;
`;

const VarietyText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  color: #332f2e;
`;

const SortText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  color: #332f2e;
  margin-left: 10px;
`;

const SearchCardContainer = styled.View`
  width: 90%;
  height: 235px;
  background: #fdf8f4;
  /* background: black; */
  border: 0.25px solid #fe7474;
  box-shadow: 0px 4px 23px #e9e6e4;
  border-radius: 8px;
  margin-top: 17px;
  margin-left: 19px;
  /* margin-bottom:-10px; */
`;

const ProductImageContainer = styled.View`
  width: 149px;
  height: 160px;
  /* background:black; */
  /* resize: contain; */

  left: 3px;
  top: 11px;
`;

const Image2 = styled.Image`
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
  position: absolute;
  font-weight: 500;
  font-size: 11px;
  color: #e94b64;
  margin-top: 153px;
  margin-left: 18px;
`;

const Circle = styled.View`
  /* position:absolute; */
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: #e94b64;
  width: 39.42px;
  height: 39.42px;
  left: 103.51px;
  top: 118.26px;
`;

const PercentageContainer = styled.View`
  width: 60px;
  height: 17px;
  background: #f7dd87;
  /* background:black; */
  border-radius: 3px;
  position: absolute;
  margin-left: 20px;
  justify-content: center;
`;

const PerIcon = styled.View`
  margin-left: 3.92px;
`;

const PerIcon2 = styled.View`
  position: absolute;
  right: 17px;
`;

const PerText = styled.View`
  position: absolute;
  right: 10px;
  /* margin-top:2px; */
`;

const PercentageText = styled.Text`
  font-weight: 600;
  font-size: 8px;
  color: #332f2e;
  left: 0.1px;
`;

const TitleText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: #332f2e;
  /* left:10px; */
  width: 150px;

  top: 11px;
  text-align: center;
`;

const RatingContainer = styled.View`
  width: 72.27px;
  height: 18.4px;
  border: 0.5px solid rgba(247, 221, 135, 0.54);
  border-radius: 3px;
  margin-top: 3px;
  margin-top: 12px;
  justify-content: center;
`;

const StarContainerall = styled.View`
  /* top:3.98px; */
  left: 5px;
  width: 31px;
  height: 5.23px;
  /* background:black; */
  flex-direction: row;
`;

const StarContainer = styled.View`
  width: 6.55px;
  height: 6.55px;
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
  left: 53px;
  /* top: 0.5px; */
  justify-content: center;
  position: absolute;
`;

const Product = styled.View`
  align-items: center;
`;

// const listView = styled.View`
//   /* flex:1; */
// `;

// const data = [
//   {
//     url: icon.cappuccino,
//     productName: 'Cappuccino ',
//     RatingValue1: '36',
//     discount: '29',
//     // name:"Ronaldo",
//     status: 'Hot',
//     rateing: 'Rated 3+',
//     price: '230',
//   },
//   {
//     url: icon.Filtercoffee,
//     productName: 'Cold Brew ',
//     RatingValue1: '18',
//     discount: '23',
//     // name:"Messi",
//     status: 'Hot',
//     rateing: 'Rated 4+',
//     price: '480',
//   },
//   {
//     url: icon.cappuccino,
//     productName: 'Americano',
//     RatingValue1: '34',
//     discount: '2',
//     // name:"Ronaldo",
//     status: 'Hot',
//     rateing: 'Rated 3+',
//     price: '230',
//   },
//   {
//     url: icon.cappuccino,
//     productName: 'Flat White ',
//     RatingValue1: '09',
//     discount: '17',
//     // name:"Ronaldo",
//     status: 'Hot',
//     rateing: 'Rated 3+',
//     price: '560',
//   },

//   {
//     url: icon.Espresso,
//     productName: 'Espresso ',
//     RatingValue1: '29',
//     discount: '19',
//     // name:"Kaka",
//     status: 'Cold',
//     rateing: 'Rated 3+',
//     price: '140',
//   },
//   {
//     url: icon.Malli,
//     productName: 'Sukku malli ',
//     RatingValue1: '31',
//     discount: '25',
//     // name:"Mbappe",
//     status: 'Cold',
//     rateing: 'Rated 4+',
//     price: '150',
//   },
//   {
//     url: icon.Filtercoffee,
//     productName: 'Filtercoffee ',
//     RatingValue1: '37',
//     discount: '22',
//     // name:"Lukaku",
//     status: 'Hot',
//     rateing: 'Rated 3+',
//     price: '240',
//   },
//   {
//     url: icon.cappuccino,
//     productName: 'Affogato ',
//     RatingValue1: '30',
//     discount: '27',
//     status: 'Hot',
//     rateing: 'Rated 4+',
//     price: '270',
//     // price: '₹270',
//   },
// ];

const listTab = [
  {
    status: 'Hot',
  },
  {
    status: 'Cold',
  },
];

const SecondListTab = [
  {
    rateing: 'Rated 4+',
  },
  {
    rateing: 'Price(low)',
  },
];

const ViewCheck = styled.View`
  width: 100;
  height: 100px;
  background-color: black;
  margin-bottom: 10;
`;
