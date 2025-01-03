import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Component/Pages/Home';
import Favourite from '../Component/Pages/Favourite';
import {enableScreens} from 'react-native-screens';
import Profile from '../Container/Profile-redux';

enableScreens();

const Stack = createNativeStackNavigator();

const screens = [
  {name: 'home', component: Profile},
  {name: 'favourite', component: Favourite},
];

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
          {screens.map((screen, index) => (
            <Stack.Screen
              key={index}
              name={screen.name}
              component={screen.component}
              options={{headerShown: false}}
            />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
