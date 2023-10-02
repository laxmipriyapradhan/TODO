import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import screen1 from './screen1'
import screen2 from './screen2'
import screen3 from './screen3'

const Bottom =createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator>
        <Bottom.Screen name='screen1' component ={screen1} options={{headerShown:false}} />
        <Bottom.Screen name='screen2' component ={screen2} options={{headerShown:false}} />
        <Bottom.Screen name='screen3' component ={screen3} options={{headerShown:false}} />
    </Bottom.Navigator>
  )
}

export default BottomNavigator