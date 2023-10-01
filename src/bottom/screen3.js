import { View, Text } from 'react-native'
import React from 'react'

const screen3 = () => {
  return (
<View style ={{flex:1 , justifyContent:'center', alignItems: 'center'}}>
      <Text
      style ={{fontSize:30}}
      onPress={()=>{
        navigation.openDrawer();
        
      }}
      
      >screen3</Text>
    </View>
  )
}

export default screen3