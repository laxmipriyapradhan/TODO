import { View, Text } from 'react-native'
import React from 'react'

const screen1 = (navigation) => {
  return (
    <View style ={{flex:1 , justifyContent:'center', alignItems: 'center'}}>
      <Text
      style ={{fontSize:30}}
      onPress={()=>{
        navigation.openDrawer();}}
      
      >screen1</Text>
    </View>
  )
}

export default screen1