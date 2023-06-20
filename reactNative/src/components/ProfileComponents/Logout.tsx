import React from 'react';
import { Button, View } from 'react-native';
import { logout } from '../../slices/authSlices';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../App';

const LogoutBtn = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const logoutRedirect = () => {
        logout
        navigation.navigate('Onboarding');
    }

    return (
        <View>
            <Button onPress={()=>{logoutRedirect}} title={'Logout'}/>
                
        </View>
    )
}

export default LogoutBtn