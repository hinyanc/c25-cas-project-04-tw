import {StackParamList} from '../../../App';
import {StackScreenProps} from '@react-navigation/stack';

import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {
  primary: '#282534',
  white: '#fff',
  red: '#e24e59',
  grey: 'd6d6d6',
};

const slides = [
  {
    id: '1',
    image1: require('../../assets/onBoardImg/GymLun-1-PhotoRoom.png-PhotoRoom.png'),
    image2: require('../../assets/onBoardImg/onboard-1.png'),
    title: 'Meet your perfect personal trainer',
    subtitle:
      'Please read our privacy policy and policy regarding before registering',
  },
  {
    id: '2',
    image1: require('../../assets/onBoardImg/GymLun-1-PhotoRoom.png-PhotoRoom.png'),
    image2: require('../../assets/onBoardImg/onboard-2.png'),
    title: 'Meet your gym mates,',
    subtitle:
      'Please read our privacy policy and policy regarding before registering',
  },
  {
    id: '3',
    image1: require('../../assets/onBoardImg/GymLun-1-PhotoRoom.png-PhotoRoom.png'),
    image2: require('../../assets/onBoardImg/onboard-3.png'),
    title: 'Make your gym goals',
    subtitle:
      'lease read our privacy policy and policy regarding before registering',
  },
];

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const Slide = ({item}) => {
    return (
      <View style={{width: width}}>
        {/* Logo */}
        <Image
          source={item?.image1}
          style={{marginTop: 30, height: '8%', width, resizeMode: 'contain'}}
        />
        {/* Image */}
        <Image
          source={item?.image2}
          style={{marginTop: 20, height: '60%', width, resizeMode: 'contain'}}
        />
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.red,
                  width: 30,
                  height: 10,
                  marginHorizontal: 3,
                  borderRadius: 5,
                },
              ]}
            />
          ))}
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center',flex:1}}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    );
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.1,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('Login')}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.red,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              {/* <View style={{width: 15}} /> */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.primary,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,

  },
  title: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    backgroundColor: 'grey',
    marginHorizontal: 3,
    height: 10,
    width: 10,
    marginHorizontal: 3,
    borderRadius: 5,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;
