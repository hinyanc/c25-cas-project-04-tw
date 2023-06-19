import React from 'react';
import { Button, View } from 'react-native';
import { logout } from '../../slices/authSlices';

const Logout = () => {



    return (
        <View>
            <Button onPress={()=>{logout}} title={'Logout'}/>
                
        </View>
    )
}

export default Logout