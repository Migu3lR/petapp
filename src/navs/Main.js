import React, {Component} from 'react';
import { createDrawerNavigator } from 'react-navigation';

import HomeScreen from '../screens/Main/Home'
import MainScreenNavigator from '../screens/Main/Chat'
import SideBar from '../screens/Main/SideBar'


export default AppNavigator = createDrawerNavigator(
    {
      Home: HomeScreen,
      Chat: MainScreenNavigator
    },
    {
      contentComponent: props => <SideBar {...props} />
    }
  )