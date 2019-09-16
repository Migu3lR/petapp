import React, {Component} from 'react';
import { createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import MainScreenNavigator from './Chat'
import HomeStack from './Home'
import SideBar from './SideBar'

const Solicitudes = props => (
  <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
    <Text>Profile</Text>
  </View>
)

const Settings = props => (
  <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
    <Text>Settings</Text>
  </View>
)

const MainTabNavigator = createBottomTabNavigator(
    {
      Servicios: HomeStack,
      Solicitudes,
      Settings
    },
    {
      navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
          header: null,
          headerTitle: routeName
        }
      }
    }
  )

const MainStackNavigator = createStackNavigator(
  {
    MainTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon 
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}       
            name="md-menu" 
            size={30} 
          />
        )
      }
    }
  }
)

export default AppNavigator = createDrawerNavigator(
    {
      Main: MainStackNavigator
    },
    {
      contentComponent: props => <SideBar {...props} />
    }
  )