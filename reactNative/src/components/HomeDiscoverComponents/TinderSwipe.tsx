import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {styles} from '../../utils/styles';

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
    },
    {
      id: 2,
      image: require('../../assets/img/day.jpeg'),
      name: 'Day',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio'],
    },
    {
      id: 3,
      image: require('../../assets/img/ivy.jpeg'),
      name: 'Ivy So',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio', 'Boxing', 'Yoga'],
    },
    {
      id: 4,
      image: require('../../assets/img/edan.jpeg'),
      name: 'Edan',
      gymCenter: 'Physical Wan Chai',
      interest: ['Weightlifting', 'Injury recover', 'Stretching', 'Pilates', 'Cardio'],
    },
    {
      id: 5,
      image: require('../../assets/img/stanley.jpeg'),
      name: 'Stanley',
      gymCenter: 'Physical Wan Chai',
      interest: ['Dance', 'Pilates', 'Cardio'],
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
                  style={{
                    position: 'relative',
                    bottom: 86.5,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderBottomEndRadius: 10,
                    borderBottomStartRadius: 10
                  }}>
                  <Text style={styles.DiscoverUsername}>{card.name}</Text>
                  <Text style={styles.DiscoverGym}>{card.gymCenter}</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {card.interest.map((interest)=>{
                      return(
                        <View style={styles.DiscoverInterest}><Text style={styles.DiscoverInterestText}>{interest}</Text></View>
                      )
                    })}

                  </View>
                </View>
              </View>
            </Animated.View>
          )}
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
          onSwipedAll={handleSwipeAll}
          useViewOverflow={false}
          overlayLabels={{
            bottom: {
              element: <Text>BLEAH</Text> /* Optional */,
              title: 'BLEAH',
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
                },
              },
            },
            left: {
              element: <Text>NOPE</Text> /* Optional */,
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
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              element: <Text>LIKE</Text> /* Optional */,
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
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            top: {
              element: <Text>SUPER</Text> /* Optional */,
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
