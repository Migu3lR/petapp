import React, {Component} from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
//import Auth from '@aws-amplify/auth'
import { inject, observer } from 'mobx-react'
import * as Mobx from 'mobx'

import * as IoT from '../lib/aws-iot';

  class AuthLoadingScreen extends Component {
    constructor(props) {
      super(props);
      //this._bootstrapAsync();
    }

    /*_bootstrapAsync = async () => {
      const { user } = this.props
      await Auth.currentAuthenticatedUser()
      .then(cognito => {
        console.log(cognito)
        user.set(
          cognito.signInUserSession.accessToken.jwtToken,
          cognito.attributes
          )
      })
      .catch(err => {
        user.clear()
        console.log('Error:', err)
      })
      this.props.navigation.navigate(user.userToken ? 'App' : 'Auth');
    }*/
  
    async componentDidMount() {
      const { iotStore, appStore, authStore } = this.props

      await this.validateUserSession();
      const connectCallback = () => iotStore.deviceConnectedStatusChanged(true);
      const closeCallback = () => iotStore.deviceConnectedStatusChanged(false);
      iotStore.acquirePublicPolicies(connectCallback, closeCallback);

      console.log(iotStore, appStore, Mobx.toJS(authStore))

      Mobx.when(() => {
        const {
          connectPolicy,
          publicPublishPolicy,
          publicSubscribePolicy,
          publicReceivePolicy,
          deviceConnected
        } = iotStore
        return (connectPolicy &&
        publicPublishPolicy &&
        publicSubscribePolicy &&
        publicReceivePolicy &&
        deviceConnected)
      },
      () => {
        // Ping to test connection
        const { identityId } = authStore
        const topic = `room/public/ping/${identityId}`;
        IoT.publish(topic, JSON.stringify({ message: 'connected' }));
        // Attach message handler if not yet attached
        iotStore.attachMessageHandler();
        iotStore.subscribeToTopic('room/public/ping/#')
        appStore.enterAppStatusChanged(true);
        
      })

      Mobx.when(() => authStore.loggedIn && appStore.enterApp,
      () => this.props.navigation.navigate('App'))

      Mobx.when(() => !authStore.loggedIn || !appStore.enterApp,
      () => this.props.navigation.navigate('Auth'))
      
    }

    async validateUserSession() {
      const { authStore } = this.props
      var isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
      if (isLoggedIn === 'true') {
        authStore.loggedInStatusChanged(true);
      } else {
        authStore.loggedInStatusChanged(false);
      }
    }

    render() {
      return(
        <View>
          <ActivityIndicator />
          <StatusBar barStyle='default' />   
        </View>
      )
    }
  }

export default inject('appStore','iotStore','authStore')(observer(AuthLoadingScreen));
//export default AuthLoadingScreen