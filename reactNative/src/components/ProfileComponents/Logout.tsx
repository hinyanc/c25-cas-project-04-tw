import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {logout} from '../../slices/authSlices';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../App';
import {useDispatch} from 'react-redux';
import {styles} from '../../utils/styles';

const LogoutBtn = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const dispatch = useDispatch();

  const logoutRedirect = () => {
    dispatch(logout());
    navigation.navigate('Onboarding');
  };

  return (

      <TouchableOpacity style={styles.LogoutBtn} onPress={logoutRedirect}>
        <Text style={styles.LogoutText}>Logout</Text>
      </TouchableOpacity>

  );
};

export default LogoutBtn;
