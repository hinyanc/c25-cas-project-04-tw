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

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles1 = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ScreenWidth ,
    height: ScreenHeight ,
    backgroundColor: '#FFF9F0',
    top:370
  },
  card: {
    position: 'relative',
    bottom: 200,
    borderRadius: 10,
    backgroundColor: '#FFF9F0',
    width: ScreenWidth * 0.9,
    height: ScreenHeight * 0.3,
  },
  card2: {
    position: 'relative',
    bottom: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF9F0',
    width: ScreenWidth * 0.9,
    height: ScreenHeight * 0.4,
    shadowColor: '#E24E59',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: ScreenWidth * 0.9, // 50% of the screen width
    height: ScreenHeight * 0.4, // 30% of the screen height
    backgroundColor: 'white',
  },
});

type CardType = {
  id: number;
  image: any;
  name: string;
  gymCenter: string;
  interest: string[];
  bio: string;
  isPT: boolean;
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

  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleButtonPress = (button: string) => {
    setPressedButton(button);
  };

  const isButtonPressed = (button: string) => {
    return pressedButton === button;
  };

  const [swipedCards, setSwipedCards] = useState<CardType[]>([]);

  const cards = [
    {
      id: 1,
      image: require('../../assets/img/mui.jpeg'),
      name: 'Ah Mui',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio'],
      bio: 'I love to meet friends!',
      isPT: true,
    },
    {
      id: 2,
      image: require('../../assets/img/day.jpeg'),
      name: 'Day',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio'],
      bio: 'I love to meet friends!',
      isPT: false,
    },
    {
      id: 3,
      image: require('../../assets/img/ivy.jpeg'),
      name: 'Ivy So',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio', 'Boxing', 'Yoga'],
      bio: 'I love to meet friends!',
      isPT: true,
    },
    {
      id: 4,
      image: require('../../assets/img/edan.jpeg'),
      name: 'Edan',
      gymCenter: 'Physical Wan Chai',
      interest: [
        'Weightlifting',
        'Injury recover',
        'Stretching',
        'Pilates',
        'Cardio',
      ],
      bio: 'I love to meet friends!',
      isPT: false,
    },
    {
      id: 5,
      image: require('../../assets/img/stanley.jpeg'),
      name: 'Stanley',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio'],
      bio: 'I love to meet friends!',
      isPT: true,
    },
  ];

  const handleSwipeRight = () => {
    console.log('swipe right');
  };

  const handleSwipeLeft = () => {
    console.log('swipe left');
  };
  const handleSwipeAll = () => {
    console.log('all images are shown');
  };

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
      {swipedCards.length === 5 ? (
        <Text style={{position: 'relative', bottom:500}}>All cards swiped!</Text>
      ) : (
        <Swiper
          cards={cards}
          stackSize={2}
          cardIndex={0}
          backgroundColor="#FFF9F0"
          renderCard={card => (
            <Animated.View style={[styles1.card]}>
              <View>
                <Image source={card.image} style={styles1.card2} />
                <View
                  style={[
                    styles.CardInfo,
                    card.interest.length > 4 ? {bottom: 360} : {bottom: 321.5},
                  ]}>
                  <Text style={styles.DiscoverUsername}>{card.name}</Text>
                  <Text style={styles.DiscoverGym}>{card.gymCenter}</Text>
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {card.interest.map(interest => {
                      return (
                        <View style={styles.DiscoverInterest}>
                          <Text style={styles.DiscoverInterestText}>
                            {interest}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.NopeIcon,
                    card.interest.length > 3 ? {bottom: 382} : {bottom: 345},
                  ]}>
                  <Ionicons name="close" size={45} color={'#ED8974'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.SuperIcon,
                    card.interest.length > 3 ? {bottom: 442} : {bottom: 405},
                  ]}>
                  <Ionicons name="md-star" size={35} color={'#4FADC2'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.LikeIcon,
                    card.interest.length > 3 ? {bottom: 502} : {bottom: 465},
                  ]}>
                  <Ionicons name="heart" size={35} color={'#7CCD96'} />
                </TouchableOpacity>
                <View
                  style={[
                    styles.bio,
                    card.interest.length > 3
                      ? {bottom: 490 }
                      : {bottom: 460 },
                  ]}>
                  <Text style={styles.bio}>{card.bio}</Text>
                </View>
              </View>
            </Animated.View>
          )}
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
                    bottom: 400
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
                    bottom: 400
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
            top: {
              element: (
                <View
                  style={{
                    borderWidth: 3,
                    borderRadius: 16,
                    borderColor: '#4FADC2',
                    bottom: 400
                  }}>
                  <Text
                    style={{
                      color: '#4FADC2',
                      fontWeight: 'bold',
                      fontSize: 30,
                      marginHorizontal: 10,
                    }}>
                    SUPER LIKE!
                  </Text>
                </View>
              ) /* Optional */,
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -200,
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
      )}
    </View>
    </ScrollView>

  );
}
