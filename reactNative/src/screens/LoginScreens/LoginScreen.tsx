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
import {localLogin} from '../../hooks/authAPI';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store/store';
import {login} from '../../slices/authSlices';
import {z} from 'zod';

interface FormState {
  email: string;
  password: string;
}

interface FormErrorState {
  email: string | null;
  password: string | null;
}

const schema = {
  email: z.string().email(),
  password: z.string().min(6),
} as {[x: string]: z.ZodString};

type LoginScreenProps = StackScreenProps<StackParamList, 'Login'>;

const {width, height} = Dimensions.get('window');

type Validate = {
  email: string;
  password: string;
};

const LoginForm = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = useState('beyourdetective@gmail.com');
  const [password, setPassword] = useState('123abc');
  // const [notEmpty, setNotEmpty] = useState(false);
  // const [errors, setErrors] = useState<Validate>({email: '', password: ''});

  const handleEmail = (newText: string) => {
    setEmail(newText);
  };
  const handlePassword = (newText: string) => {
    setPassword(newText);
  };

  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const [errorState, setErrorState] = useState<FormErrorState>({
    email: null,
    password: null,
  });

  const inputHandler = (name: keyof FormState) => {
    const value = formState[name];

    try {
      schema[name].parse(value);
      setErrorState({...errorState, [name]: null});
    } catch (err) {
      setErrorState({
        ...errorState,
        [name]: (err as z.ZodError).errors[0].message,
      });
    }
  };
  const onChangeHandler = (
    name: string,
    value: string | string[] | boolean,
  ) => {
    setFormState({...formState, [name]: value});
  };

  // const validate = () => {
  //   console.log(' hihivalidate');
  //   const emailRegex = /\S+@\S+\.\S+/;
  //   let errors: Validate = {email: '', password: ''};
  //   if (!email) {
  //     errors.email = 'Email is required';
  //     console.log('email is required');
  //   } else if (!emailRegex.test(email)) {
  //     errors.email = 'Invalid email format';
  //   }
  //   if (!password) {
  //     errors.password = 'Password is required';
  //   } else if (password.length < 6) {
  //     errors.password = 'Password must be at least 6 characters';
  //   }
  //   return errors;
  // };

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log('hi error', errorState);
    // const errors = validate();
    // setErrors(errors);
    // console.log('error', errors);
    if (errorState.email === null && errorState.password === null) {
      //   // Handle login logic here
      //   // navigation.navigate('Home');
      //   setNotEmpty(true);
      console.log('no error');
      const success = await localLogin(email, password);
      console.log("hi")
      if (success) {
        dispatch(login(email));
        navigation.replace('MyHome');
        console.log('uuu');
        //   }else{
        //     // react-toast alert not
        //     console.log("fail")
        //   }
      }
    }
    console.log('sth happended');
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
            onChangeText={text => {
              handleEmail(text);
              onChangeHandler('email', text);
            }}
            style={[styles.input, errorState.email ? styles.error : {}]}
            keyboardType="email-address"
            onBlur={e => {
              inputHandler('email');
            }}
          />
          {errorState.email !== null ? (
            <Text style={styles.errorMsg}>{errorState.email}</Text>
          ) : (
            <></>
          )}
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
            onChangeText={text => {
              handlePassword(text);
              onChangeHandler('password', text);
            }}
            onBlur={e => {
              inputHandler('password');
              // setErrors(errors);
            }}
            style={[styles.input, errorState.password ? styles.error : {}]}
          />
          {errorState.password !== null ? (
            <Text style={styles.errorMsg}>{errorState.password}</Text>
          ) : (
            <></>
          )}
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
                fontWeight: 'bold',
                fontSize: 20,
              }}
              onPress={() => {
                navigation.navigate('SignUp');
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
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
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
