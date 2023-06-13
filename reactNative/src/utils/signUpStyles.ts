
import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: 'left',
      marginVertical: 10,
      alignSelf: 'flex-start',
    },
    btn: {
      width: width * 0.75,
      height: height * 0.07,
      backgroundColor: 'rgba(4, 59, 92, 0.7)',
      marginHorizontal: 4,
      marginVertical: 10,
      borderRadius: 16,
      opacity: 0.1,
    },
    input: {
      width: width * 0.75,
      height: height * 0.07,
      marginHorizontal: 4,
      marginVertical: 20,
      
      borderWidth: 2,
      borderRadius: 16,
      color: 'black',
      borderColor: 'rgba(255, 94, 135, 0.17)',
      textAlign: 'center',
    },
    Continuebtn: {
      width: width * 0.75,
      height: height * 0.07,
      marginHorizontal: 4,
      marginVertical: 10,
      borderRadius: 16,
      backgroundColor: '#e24e59',
    },
    errorMsg: {
      color: 'red',
      marginBottom: 10,
    },
    error: {
      borderColor: 'red',
      borderWidth: 1,
    },
    inputTitle: {
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    signUp:{
      marginHorizontal: 4,
    },
    tooglebtn: {
      flex: 1,
      height: 50,
      borderRadius: 16,
      backgroundColor: '#e24e59',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });