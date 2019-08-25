import React, {Component} from 'react';
import { createDrawerNavigator, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import HomeScreen from './Home'
import WalkStack from './Walk'

const HomeStack = createStackNavigator({
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

  }
})

export default MainSwitch = createSwitchNavigator({
  Home: HomeStack,
  Walk: WalkStack
},{
  navigationOptions: ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible
    };
  }
})