import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {StackParamList} from '../../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

type LoginScreenProps = StackScreenProps<StackParamList, 'Login'>;

const {width, height} = Dimensions.get('window');
type Validate = {
  email: string;
  password: string;
};
const LoginForm = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Validate>({email: '', password: ''});

  const validate = () => {
    console.log('validate');
    const emailRegex = /\S+@\S+\.\S+/;
    let errors: Validate = {email: '', password: ''};
    if (!email) {
      errors.email = 'Email is required';
      console.log('email is required');
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleLogin = () => {
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Handle login logic here
      // console.log(navigation);
      // navigation.navigate('Home');
      navigation.replace('MyHome');
    }
    setSubmitted(true);
  };

  // console.log(navigation)

  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', height: height}}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
          }}>
          <Text style={styles.title}>Login</Text>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 18,
                fontWeight: 'bold',
                color: 'green',
              }}>
              GOOGLE
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'left',
              alignSelf: 'flex-start',
            }}>
            Username
          </Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, errors.email ? styles.error : {}]}
            keyboardType="email-address"
            onBlur={() => {
              let errors = validate();
              console.log('check check', errors);
              setErrors(errors);
            }}
          />
          {errors.email ? <Text>{errors.email}</Text> : <></>}
          <Text
            style={{
              textAlign: 'left',
              alignSelf: 'flex-start',
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
          <TouchableOpacity onPress={handleLogin} style={styles.loginbtn}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
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
                navigation.navigate('MyHome');
                // sign up
              }}>
              Sign Up
            </Text>
          </Text>
        </View>
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
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 16,
    color: 'black',
    borderColor: 'rgba(255, 94, 135, 0.17)',
    textAlign: 'center',
  },
  loginbtn: {
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
});
