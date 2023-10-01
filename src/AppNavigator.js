import { Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Parent from './Screens/Parent';


const Stack =  createStackNavigator();

const AppNavigator=()=>{
 
    return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Parent' 
        component={Parent} 
        options={{headerShown: false}}/>
      </Stack.Navigator>

     </NavigationContainer>
    )
  
}

export default AppNavigator