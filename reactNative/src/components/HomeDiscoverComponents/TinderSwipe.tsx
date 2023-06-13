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
    width: ScreenWidth * 0.9,
    height: ScreenHeight * 0.4,
    // backgroundColor: 'white',
  },
  card: {
    position: 'relative',
    borderRadius: 10,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
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
  bio: string
};

export function TinderSwipe() {
  const [swipedCards, setSwipedCards] = useState<CardType[]>([]);

  const cards = [
    {
      id: 1,
      image: require('../../assets/img/mui.jpeg'),
      name: 'Ah Mui',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio'],
      bio: 'I love to meet friends!'
    },
    {
      id: 2,
      image: require('../../assets/img/day.jpeg'),
      name: 'Day',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio'],
      bio: 'I love to meet friends!'
    },
    {
      id: 3,
      image: require('../../assets/img/ivy.jpeg'),
      name: 'Ivy So',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio', 'Boxing', 'Yoga'],
      bio: 'I love to meet friends!'
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
      bio: 'I love to meet friends!'
    },
    {
      id: 5,
      image: require('../../assets/img/stanley.jpeg'),
      name: 'Stanley',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio'],
      bio: 'I love to meet friends!'
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
    <View style={styles1.container}>
      {swipedCards.length === 5 ? (
        <Text>All cards swiped!</Text>
      ) : (
        <Swiper
          cards={cards}
          stackSize={2}
          cardIndex={0}
          backgroundColor="#FFF9F0"
          renderCard={card => (
            <Animated.View style={[styles1.card]}>
              <View>
                <Image source={card.image} style={styles1.card} />
                <View
                  style={[
                    styles.CardInfo,
                    card.interest.length > 4 ? {bottom: 160} : {bottom: 121.5},
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
                    card.interest.length > 3 ? {bottom: 182} : {bottom: 145},
                  ]}>
                  <Ionicons name="close" size={45} color={'#ED8974'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.SuperIcon,
                    card.interest.length > 3 ? {bottom: 242} : {bottom: 205},
                  ]}>
                  <Ionicons name="md-star" size={35} color={'#4FADC2'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.LikeIcon,
                    card.interest.length > 3 ? {bottom: 302} : {bottom: 265},
                  ]}>
                  <Ionicons name="heart" size={35} color={'#7CCD96'} />
                </TouchableOpacity>
                <Text style={[styles.bio, card.interest.length > 3 ? {bottom: 290} : {bottom: 260},]}>{card.bio}</Text>
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
  );
}
