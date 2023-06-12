import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import {StackParamList} from '../../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

type LoginScreenProps = StackScreenProps<StackParamList, 'Login'>;

const {width, height} = Dimensions.get('window');

const LoginForm = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log(navigation);
    // navigation.navigate('Home');
    navigation.replace('Home');
  };

  // console.log(navigation)

  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', height: height}}>
      <ScrollView>
        {/* <View style={{justifyContent: "center", alignItems: 'center' ,height:height}}> */}
        <Text style={styles.title}>Login</Text>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'green',
              opacity: 1,
            }}>
            GOOGLE
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'left',
          }}>
          Username
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <Text
          style={{
            textAlign: 'left',
          }}>
          Password
        </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.btn, {backgroundColor: 'red'}]}>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'red',
              opacity: 0.7,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text>
          Still don't have an account? 
          <Text
            style={{
              // textDecorationLine: 'underline',
              fontWeight: 'bold',
              fontSize: 20,
            }}
            onPress={() => {
              // Linking.openURL('https://aboutreact.com');
              navigation.navigate("Home")
              // sign up
            }}>
             Sign Up
          </Text>
        </Text>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'left',
    marginVertical: 10,
  },
  btn: {
    width: width * 0.75,
    height: height * 0.07,
    backgroundColor: 'blue',
    marginHorizontal: 4,
    marginVertical: 10,
    borderRadius: 3,
    opacity: 0.1,
  },
  input: {
    width: width * 0.75,
    height: height * 0.07,
    marginHorizontal: 4,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
    opacity: 0.1,
    borderColor: 'red',
    textAlign: 'center',
    // shadowColor: 'red',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
});
