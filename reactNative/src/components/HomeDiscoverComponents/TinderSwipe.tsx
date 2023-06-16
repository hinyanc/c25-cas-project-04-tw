import React, {useState} from 'react';
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
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {styles} from '../../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useGetTinderProfile} from '../../hooks/TinderAPI';
import {REACT_APP_API_SERVER} from '@env';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

type CardType = {
  id: number;
  profile_pic: string;
  gender: string;
  username: string;
  gym_center: string;
  gym_location: string;
  interest_name: string[];
  bio: string;
  is_pt: boolean;
};

export function TinderSwipe() {
  type ButtonProps = {
    onPress: () => void;
    isPressed: boolean;
    text: string;
    textStyle?: TextStyle;
  };

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

  const [pressedButton, setPressedButton] = useState<string>('All Users');

  const handleButtonPress = (button: string) => {
    setPressedButton(button);
  };

  const isButtonPressed = (button: string) => {
    return pressedButton === button;
  };

  const [swipedCards, setSwipedCards] = useState<CardType[]>([]);

  const handleSwipeRight = (idx: number) => {
    console.log('swipe right', idx + index);
    // setIndex(index => index + 1)
  };

  const handleSwipeLeft = () => {
    console.log('swipe left');
  };
  const handleSwipeAll = () => {
    console.log('all images are shown');
  };

  const [index, setIndex] = useState(0);

  const onSwipe = (newIndex: React.SetStateAction<number>) => {
    setIndex(newIndex);
  };

  let cards = useGetTinderProfile();

  console.log(cards);
  console.log(cards.filter((card, idx) => idx >= index));
  return (
    <ScrollView style={{backgroundColor: '#FFF9F0'}}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.discoverTitle}>Discover</Text>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginLeft: 20,
            marginRight: 20,
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
        {cards.length === 0 ? (
          <Text style={{position: 'relative', bottom: 500, fontSize: 100}}>
            All cards swiped!
          </Text>
        ) : (
          <>
            {cards.length > 0 && (
              <Swiper
                cards={cards.filter((card, idx) => idx >= index)}
                stackSize={2}
                cardIndex={0}
                backgroundColor="#FFF9F0"
                renderCard={card => (
                  <Animated.View style={[styles1.card]}>
                    <View>
                      <Image
                        source={{
                          uri: `${REACT_APP_API_SERVER}/profile-pic/${card.profile_pic}`,
                        }}
                        style={styles1.card2}
                      />
                      {card.is_pt == true ? (
                          <Text style={styles.CardPT}><Ionicons name="md-ribbon" size={25} color={'#E24E59'} /> PT</Text>
                           ) : (<Text style={styles.CardPT}><Ionicons name="ios-bicycle" size={25} color={'#E24E59'} /> GyMates</Text>)} 
                      <View
                        style={[
                          styles.CardInfo,
                          card.interest_name.length > 4
                            ? {bottom: 260}
                            : {bottom: 221.5},
                        ]}>
                        <Text style={styles.DiscoverUsername}>
                          {card.username}
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
                              : {bottom: 245},
                          ]}>
                          <Ionicons name="close" size={45} color={'#ED8974'} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                        onPress={() => {
                          onSwipe(index + 1);
                        }}
                        style={[
                          styles.SuperIcon,
                          card.interest_name.length > 3
                            ? {bottom: 342}
                            : {bottom: 305},
                        ]}>
                        <Ionicons name="md-star" size={35} color={'#4FADC2'} />
                      </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => {
                            onSwipe(index + 1);
                          }}
                          style={[
                            styles.LikeIcon,
                            card.interest_name.length > 3
                              ? {bottom: 282}
                              : {bottom: 245},
                          ]}>
                          <Ionicons name="heart" size={35} color={'#7CCD96'} />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={[
                          styles.bio,
                          card.interest_name.length > 3
                            ? {bottom: 272}
                            : {bottom: 235},
                        ]}>
                        <Text style={styles.bio}>{card.bio}</Text>
                      </View>
                    </View>
                  </Animated.View>
                )}
                verticalSwipe={false}
                onSwipedRight={handleSwipeRight}
                onSwipedLeft={handleSwipeLeft}
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
                  // top: {
                  //   element: (
                  //     <View
                  //       style={{
                  //         borderWidth: 3,
                  //         borderRadius: 16,
                  //         borderColor: '#4FADC2',
                  //         bottom: 400,
                  //       }}>
                  //       <Text
                  //         style={{
                  //           color: '#4FADC2',
                  //           fontWeight: 'bold',
                  //           fontSize: 30,
                  //           marginHorizontal: 10,
                  //         }}>
                  //         SUPER LIKE!
                  //       </Text>
                  //     </View>
                  //   ) /* Optional */,
                  //   title: 'SUPER LIKE',
                  //   style: {
                  //     label: {
                  //       backgroundColor: 'black',
                  //       borderColor: 'black',
                  //       color: 'white',
                  //       borderWidth: 1,
                  //     },
                  //     wrapper: {
                  //       flexDirection: 'column',
                  //       alignItems: 'center',
                  //       justifyContent: 'center',
                  //       marginTop: -200,
                  //     },
                  //   },
                  // },
                }}
                overlayLabelWrapperStyle={{
                  position: 'absolute',
                  backgroundColor: 'transparent',
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles1 = StyleSheet.create({
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
    backgroundColor: '#FFF9F0',
    width: ScreenWidth * 0.8,
    height: ScreenHeight * 0.5,
    borderWidth: 1,
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
