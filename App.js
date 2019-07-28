import React, {Component} from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import {Provider} from 'mobx-react'

import MainNav from './src/navs/Main';
import AuthNav from './src/navs/Auth';
import AuthLoadingScreen from './src/screens/_AuthLoading.js';

import RootStore from './src/stores/Root'
//import Invoice from './src/stores/Invoice'
//import User from './src/stores/User'

const store = RootStore.create({})

let Navigation = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainNav,
    Auth: AuthNav
  },
  {
    initialRouteName: 'AuthLoading'
  }
))

export default class App extends Component {
  render() {
    return (
      <Provider appStore={store.appStore} iotStore={store.iotStore} authStore={store.authStore}>
        <Navigation />
      </Provider>
    );
  }
}


