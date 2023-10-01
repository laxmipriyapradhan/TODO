import 'react-native-gesture-handler';

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { runOnUI } from 'react-native-reanimated';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// const HomeScreen = () => null;

const SettingsScreen = () => null;

const ProfileScreen = () => null;



function myFunction() {
    'worklet';
 
    runOnUI(/* ... */);

  }
  

  const HomeScreen = () => {
    runOnUI(myFunction); 
    return null;
  }

const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Icon name={focused ? 'home' : 'home-outline'} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Icon name={focused ? 'person' : 'person-outline'} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
