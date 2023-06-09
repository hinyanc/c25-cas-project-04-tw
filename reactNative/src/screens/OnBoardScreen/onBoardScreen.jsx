// import React from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
import {StackParamList} from '../../../App';
import {StackScreenProps} from '@react-navigation/stack';
// import Onboarding from 'react-native-onboarding-swiper';

// const Skip = ({...props}) => (
//   <TouchableOpacity style={styles.Button}>
//     <Text style={styles.buttonText}>Skip</Text>
//   </TouchableOpacity>
// );
// const Next = ({...props}) => (
//   <TouchableOpacity style={styles.Button}>
//     <Text style={styles.buttonText}>Next</Text>
//   </TouchableOpacity>
// );
// const Done = ({...props}) => (
//   <TouchableOpacity style={styles.Button}>
//     <Text style={styles.buttonText}>Done</Text>
//   </TouchableOpacity>
// );

// type OnBoardingScreenProps = StackScreenProps<StackParamList, 'Onboarding'>;

// const OnBoardingScreen = ({navigation}: OnBoardingScreenProps) => {
//   return (
//     <Onboarding
//       SkipButtonComponent={Skip}
//       NextButtonComponent={Next}
//       DoneButtonComponent={Done}
//       onSkip={() => navigation.navigate('Login')}
//       onDone={() => navigation.navigate('Login')}
//       pages={[
//         {
//           backgroundColor: '#fff',
//           image: (
//             <Image source={require('../../assets/onBoardImg/onboard-1.png')} />
//           ),
//           title: 'Onboarding',
//           subtitle: 'Done with React Native Onboarding Swiper',
//         },
//         {
//           backgroundColor: '#fff',
//           image: (
//             <Image source={require('../../assets/onBoardImg/onboard-2.png')} />
//           ),
//           title: 'Onboarding',
//           subtitle: 'Done with React Native Onboarding Swiper',
//         },
//         {
//           backgroundColor: '#fff',
//           image: (
//             <Image source={require('../../assets/onBoardImg/onboard-3.png')} />
//           ),
//           title: 'Onboarding',
//           subtitle: 'Done with React Native Onboarding Swiper',
//         },
//       ]}
//     />
//   );
// };

// export default OnBoardingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   Button: {
//     marginHorizontal: 10,
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 4,
//   },buttonText:{
//     color:"white"
//   }
// });

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

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
  {
    id: '1',
    image1: require('../../assets/onBoardImg/GymLun-1-PhotoRoom.png-PhotoRoom.png'),
    image2: require('../../assets/onBoardImg/onboard-1.png'),
    title: 'Best Digital Solution',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image1: require('../../assets/onBoardImg/GymLun-1-PhotoRoom.png-PhotoRoom.png'),
    image2: require('../../assets/onBoardImg/onboard-2.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image1: require('../../assets/onBoardImg/GymLun-1-PhotoRoom.png-PhotoRoom.png'),
    image2: require('../../assets/onBoardImg/onboard-3.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item?.image1}
        style={{marginTop:30,height: '10%', width, resizeMode: 'contain'}}
      />
      <Image
        source={item?.image2}
        style={{height: '75%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
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
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
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
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('HomeScreen')}>
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
                    borderColor: COLORS.white,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.primary,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
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
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar backgroundColor={COLORS.white} />
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
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;