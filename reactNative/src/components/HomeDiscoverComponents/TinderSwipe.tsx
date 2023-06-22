import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextStyle,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {styles} from '../../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useGetTinderProfile,
  useGetUsername,
  useLikeUser,
} from '../../hooks/TinderAPI';
import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../App';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export function TinderSwipe() {
  type ButtonProps = {
    onPress: () => void;
    isPressed: boolean;
    text: string;
    textStyle?: TextStyle;
  };

  const [pressedButton, setPressedButton] = useState<string>('All Users');
  // const [swipedCards, setSwipedCards] = useState<CardType[]>([]);

  const [index, setIndex] = useState(0);
  const [token, setToken] = useState('');
  // const [filter, setFilter] = useState(Filter.ALL);

  const getLocalStorage = async () => {
    let token = await AsyncStorage.getItem('token');
    if (token == null) {
      console.log('token is not in storage');
    } else {
      setToken(token!);
      console.log('check get async storage token', token);
    }
  };
  useEffect(() => {
    getLocalStorage();
  });

  const [preference, updatePreference] = useState<string>('get-all-profile');

  const cards = useGetTinderProfile(token, preference);

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const Button = ({onPress, isPressed, text, textStyle}: ButtonProps) => {
    return (
      <TouchableOpacity
        style={[styles.FilteringBtn, isPressed && styles.FilteringBtnPressed]}
        onPress={onPress}>
        <Text
          style={[
            styles.FilteringBtnText,
            textStyle,
            isPressed && styles.FilteringBtnText,
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleButtonPress = (button: string) => {
    setPressedButton(button);
    if (button === 'All Users') {
      return updatePreference('get-all-profile');
    } else if (button === 'GyMates') {
      return updatePreference('get-all-users');
    } else if (button === 'PTs') {
      return updatePreference('get-all-pt');
    }
  };

  const isButtonPressed = (button: string) => {
    return pressedButton === button;
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleRightLike = async (token: string, index: number) => {
    console.log('the what card', index, 'swipe right');
    console.log('its actual data is ', filteredCards[index]);
    console.log('its user id ', filteredCards[index].id);
    const res = await await fetch(
      `${REACT_APP_API_SERVER}/discover/like-users/${filteredCards[index].id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    console.log(result.message);

    if (result.message === 'matched') {
      setModalVisible(!modalVisible);
      return (
        <Modal
          style={{}}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={[
              styles.matchView,
              {width: ScreenWidth, height: ScreenHeight},
            ]}>
            <Text style={styles.modalTitle}>🏋🏻‍♀️ It's a Match! 🧘🏻‍♂️</Text>
            <Text style={styles.modalText}>
              You and {filteredCards[index].username} have liked each other.
            </Text>
            <View>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  margin: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: `${REACT_APP_API_SERVER}/profile-pic/${userInfo[1]}`,
                }}
              />
              <Image
                style={{
                  height: 100,
                  width: 100,
                  margin: 10,
                  borderRadius: 50,
                }}
                source={{
                  uri: `${REACT_APP_API_SERVER}/profile-pic/${filteredCards[
                    index
                  ].profile_pic!}`,
                }}
              />
            </View>
            <Text>
              Let's click{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  fontSize: 25,
                  color: '#E24E59',
                }}
                onPress={() => {
                  navigation.navigate('Chat');
                }}>
                HERE
              </Text>{' '}
              to start chatting with each other!
            </Text>
            <TouchableOpacity
              style={[styles.BMIChartBtn]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.BMIChartText}>BACK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
  };

  const handleLeftNope = (index: number) => {
    console.log('the what card', index, 'swipe left');
    console.log('its actual data is ', cards[index]);
  };

  const handleSwipeAll = () => {
    console.log('the what card', 'all images are shown');
    return (
      <>
        <View style={{width: ScreenWidth, alignItems: 'center', bottom: 230}}>
          <Text
            style={{
              fontSize: 25,
              color: '#E24E59',
              fontWeight: 'bold',
              marginBottom: 10,
              fontStyle: 'italic',
            }}>
            Oops!
          </Text>
          <Text style={styles1.swipedAll}>
            You have swiped all your quotas!
          </Text>
          <Text style={styles1.swipedAll}>
            Consider joining our Diamond membership?
          </Text>
          <Text style={styles1.swipedAll}>
            Learn more{' '}
            <Text
              style={{
                fontWeight: 'bold',
                textDecorationLine: 'underline',
                fontSize: 25,
                color: '#E24E59',
              }}
              onPress={() => {
                navigation.navigate('Plan');
              }}>
              HERE
            </Text>{' '}
            !
          </Text>
        </View>
      </>
    );
  };

  const onSwipe = (newIndex: React.SetStateAction<number>) => {
    setIndex(newIndex);
  };

  const handleLike = async (token: string, index: number) => {
    onSwipe(index + 1);
    const res = await fetch(
      `${REACT_APP_API_SERVER}/discover/like-users/${index}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await res.json();
    console.log(result);
    if (result.message === 'matched') {
      setModalVisible(!modalVisible);
    }
  };

  const filteredCards = useMemo(
    () => cards.filter((_card, idx) => idx >= index),
    [cards, index],
  );

  let user = useGetUsername(token);
  let userInfo = Object.values(user);

  return (
    <ScrollView style={{backgroundColor: '#FFF9F0'}}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
          }}>
          <Button
            onPress={() => handleButtonPress('All Users')}
            isPressed={isButtonPressed('All Users')}
            text="All Users"
            textStyle={{color: '#F2B3B7'}}
          />
          <Button
            onPress={() => handleButtonPress('GyMates')}
            isPressed={isButtonPressed('GyMates')}
            text="GyMates"
            textStyle={{color: '#F2B3B7'}}
          />
          <Button
            onPress={() => handleButtonPress('PTs')}
            isPressed={isButtonPressed('PTs')}
            text="PTs"
            textStyle={{color: '#F2B3B7'}}
          />
        </View>
      </View>

      <View style={styles1.container}>
        {
          // cards.length === 0 ? (
          //   <Text style={{position: 'relative', bottom: 500, fontSize: 100}}>
          //     All cards swiped!
          //   </Text>
          // ) :
          <>
            {filteredCards.length != 0 ? (
              <Swiper
                cards={filteredCards}
                stackSize={2}
                cardIndex={0}
                key={0}
                backgroundColor="#FFF9F0"
                renderCard={card => (
                  <Animated.View key={card.id} style={[styles1.card]}>
                    <View>
                      <Image
                        source={{
                          // @ts-ignore
                          uri: `${REACT_APP_API_SERVER}/profile-pic/${card.profile_pic!}`,
                        }}
                        style={styles1.card2}
                      />
                      {card.is_pt == true ? (
                        <Text
                          style={[
                            styles.CardPT,
                            {bottom: ScreenHeight * 0.52},
                          ]}>
                          <Ionicons
                            name="md-ribbon"
                            size={25}
                            color={'#E24E59'}
                          />{' '}
                          PT
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.CardPT,
                            {bottom: ScreenHeight * 0.52},
                          ]}>
                          <Ionicons
                            name="ios-bicycle"
                            size={25}
                            color={'#E24E59'}
                          />{' '}
                          GyMates
                        </Text>
                      )}
                      <View
                        style={[
                          styles.CardInfo,
                          card.interest_name.length > 3
                            ? {bottom: 286.5}
                            : {bottom: 248},
                        ]}>
                        <Text style={styles.DiscoverUsername}>
                          {card.username}
                          {card.id}
                        </Text>

                        <Text style={styles.DiscoverGym}>
                          {card.gym_center} {card.gym_location}
                        </Text>
                        <View
                          style={{
                            marginLeft: 15,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}>
                          {card.interest_name.map((interest_name: string) => {
                            return (
                              <View style={styles.DiscoverInterest}>
                                <Text style={styles.DiscoverInterestText}>
                                  {interest_name}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            onSwipe(index + 1);
                          }}
                          style={[
                            styles.NopeIcon,
                            card.interest_name.length > 3
                              ? {bottom: 282}
                              : {bottom: 275},
                          ]}>
                          <Ionicons name="close" size={45} color={'#ED8974'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            handleLike(token, card.id);
                            // swiper index instead of card's users_id, why/_\
                          }}
                          style={[
                            styles.LikeIcon,
                            card.interest_name.length > 3
                              ? {bottom: 282}
                              : {bottom: 275},
                          ]}>
                          <Ionicons name="heart" size={35} color={'#7CCD96'} />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={[
                          styles.bio,
                          card.interest_name.length > 3
                            ? {bottom: 272}
                            : {bottom: 265},
                        ]}>
                        <Text style={styles.bio}>{card.bio}</Text>
                      </View>
                    </View>
                  </Animated.View>
                )}
                verticalSwipe={false}
                onSwipedRight={cardIndex => {
                  handleRightLike(token, cardIndex);
                  // swiper index instead of card's users_id, why/_\
                }}
                onSwipedLeft={handleLeftNope}
                onSwipedAll={handleSwipeAll}
                useViewOverflow={false}
                overlayLabels={{
                  left: {
                    element: (
                      <View
                        style={{
                          borderWidth: 3,
                          borderRadius: 16,
                          borderColor: '#ED8974',
                          bottom: 400,
                        }}>
                        <Text
                          style={{
                            color: '#ED8974',
                            fontWeight: 'bold',
                            fontSize: 30,
                            marginHorizontal: 10,
                          }}>
                          NOPE
                        </Text>
                      </View>
                    ) /* Optional */,
                    title: 'NOPE',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1,
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        marginTop: 20,
                        marginLeft: -20,
                      },
                    },
                  },
                  right: {
                    element: (
                      <View
                        style={{
                          borderWidth: 3,
                          borderRadius: 16,
                          borderColor: '#7CCD96',
                          bottom: 400,
                        }}>
                        <Text
                          style={{
                            color: '#7CCD96',
                            fontWeight: 'bold',
                            fontSize: 30,
                            marginHorizontal: 10,
                          }}>
                          LIKE
                        </Text>
                      </View>
                    ) /* Optional */,
                    title: 'LIKE',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1,
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 20,
                        marginLeft: 20,
                      },
                    },
                  },
                }}
                overlayLabelWrapperStyle={{
                  position: 'absolute',
                  backgroundColor: 'transparent',
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <View
                style={{width: ScreenWidth, alignItems: 'center', bottom: 230}}>
                <Text
                  style={{
                    fontSize: 25,
                    color: '#E24E59',
                    fontWeight: 'bold',
                    marginBottom: 10,
                    fontStyle: 'italic',
                  }}>
                  Oops!
                </Text>
                <Text style={styles1.swipedAll}>
                  You have swiped all your quotas!
                </Text>
                <Text style={styles1.swipedAll}>
                  Consider joining our Diamond membership?
                </Text>
                <Text style={styles1.swipedAll}>
                  Learn more{' '}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                      fontSize: 25,
                      color: '#E24E59',
                    }}
                    onPress={() => {
                      navigation.navigate('Plan');
                    }}>
                    HERE
                  </Text>{' '}
                  !
                </Text>
              </View>
            )}
          </>
        }
      </View>
    </ScrollView>
  );
}

const styles1 = StyleSheet.create({
  swipedAll: {
    fontSize: 18,
    color: '#707070',
  },
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    width: ScreenWidth * 0.8,
    height: ScreenHeight * 0.85,
    backgroundColor: '#FFF9F0',
    top: 370,
  },
  card: {
    position: 'relative',
    bottom: 300,
    borderRadius: 10,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    backgroundColor: '#FFF9F8',
    width: ScreenWidth * 0.8,
    height: ScreenHeight * 0.5,
    // borderWidth: 1,
    // borderTopWidth: 1,
    borderColor: '#707070',
    alignSelf: 'center',
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 6,
  },
  card2: {
    position: 'relative',
    bottom: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF9F0',
    width: ScreenWidth * 0.8,
    height: ScreenHeight * 0.4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#707070',
  },
  image: {
    width: ScreenWidth * 0.8, // 50% of the screen width
    height: ScreenHeight * 0.4, // 30% of the screen height
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#707070',
  },
});
