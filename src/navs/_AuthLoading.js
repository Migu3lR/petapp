import React, {Component} from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
//import Auth from '@aws-amplify/auth'
import { inject, observer } from 'mobx-react'
import * as Mobx from 'mobx'

import * as IoT from '../lib/aws-iot';

  class AuthLoadingScreen extends Component {
    async componentDidMount() {
      const { iotStore, appStore, authStore } = this.props

      await this.validateUserSession();
      const connectCallback = () => iotStore.deviceConnectedStatusChanged(true);
      const closeCallback = () => iotStore.deviceConnectedStatusChanged(false);
      await iotStore.acquirePublicPolicies(connectCallback, closeCallback);

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
        const topic = `srv/${identityId}`;
        IoT.publish(topic, JSON.stringify({ message: 'connected' }));
        // Attach message handler if not yet attached
        iotStore.attachMessageHandler();
        iotStore.subscribeToTopic('srv/notifications/#')
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