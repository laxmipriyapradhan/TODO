import SafeAreaView from 'react-native-safe-area-view';


import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';






const App = ()=>{

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return(
<View>
  <Text>
    Hello
  </Text>
</View>

  )
}

export default App;
