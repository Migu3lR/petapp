import React, {Component} from 'react';
import { createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import HomeScreen from './Home'
import WalkStack from './Walk'

export default HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: 'Home',
        headerLeft: (
          <Icon 
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}       
            name="md-menu" 
            size={30} 
          />
        ),

      }
    }

  },
  WalkStack
},{
  navigationOptions: ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible
    };
  },
  defaultNavigationOptions: ({ navigation }) => {
    return {
      header: null
    }
  }
})