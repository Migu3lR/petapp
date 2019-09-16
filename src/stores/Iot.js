import { types, flow, getRoot } from 'mobx-state-tree' 
import AsyncStorage from '@react-native-community/async-storage';
import * as Mobx from 'mobx'

import * as ApiGateway from '../lib/api-gateway';
import * as Cognito from '../lib/aws-cognito';
import * as IoT from '../lib/aws-iot'; 

const IotStore = types.model('IotStore',{
    connectPolicy: false,
    publicPublishPolicy: false,
    publicSubscribePolicy: false,
    publicReceivePolicy: false,
    deviceConnected: false,
    messageHandlerAttached: false,
    messageToSend: '',
    subscribedTopics: types.optional(types.array(types.string), [])
  })
  .actions(self => ({
    CONNECT_POLICY_ATTACHED() {
      self.connectPolicy = true
    },
    PUBLIC_PUBLISH_POLICY_ATTACHED() {
      self.publicPublishPolicy = true
    },
    PUBLIC_SUBSCRIBE_POLICY_ATTACHED() {
      self.publicSubscribePolicy = true
    },
    PUBLIC_RECEIVE_POLICY_ATTACHED() {
      self.publicReceivePolicy = true
    },
    DEVICE_CONNECTED_STATUS_CHANGED(status) {
      self.deviceConnected = status
    },
    MESSAGE_HANDLER_ATTACHED(attached) {
      self.messageHandlerAttached = attached
    },
    LOGOUT() {
      self.connectPolicy = false
      self.publicPublishPolicy = false
      self.publicSubscribePolicy = false
      self.publicReceivePolicy = false
      self.deviceConnected = false
      self.messageHandlerAttached = false
      self.messageToSend = ''
      self.subscribedTopics = []
    },

    MESSAGE_TO_SEND_CHANGED(messageToSend) {
      self.messageToSend = messageToSend
    },
    ADD_SUBSCRIBED_TOPIC(topic) {
      self.subscribedTopics = [
        ...self.subscribedTopics,
        topic
      ]
    },
    CLEAR_SUBSCRIBED_TOPICS() {
      self.subscribedTopics = []
    },
    acquirePublicPolicies: flow(function* (connectCallback, closeCallback) {
      
      const loggedIn = yield Cognito.authUser();
      //getRoot(self).authStore.handleSignOut();
      //console.log('loggedIn', loggedIn)

      if (!loggedIn) {
        getRoot(self).authStore.handleSignOut();
        return Promise.resolve();
      }
      
      const identityId = Cognito.getIdentityId();
      getRoot(self).authStore.IDENTITY_UPDATED(identityId);
      getRoot(self).authStore.USER_UPDATED(JSON.parse(yield AsyncStorage.getItem('user')));
      const awsCredentials = JSON.parse(yield AsyncStorage.getItem('awsCredentials'));

      console.log('iot init')

      IoT.initNewClient(awsCredentials);
      IoT.attachConnectHandler(connectCallback);
      IoT.attachCloseHandler(closeCallback);
  
      if (!self.connectPolicy) {
        ApiGateway.attachConnectPolicy().then(() =>
          self.CONNECT_POLICY_ATTACHED())
      }
  
      if (!self.publicPublishPolicy) {
        ApiGateway.attachPublicPublishPolicy().then(() =>
          self.PUBLIC_PUBLISH_POLICY_ATTACHED())
      }
  
      if (!self.publicSubscribePolicy) {
        ApiGateway.attachPublicSubscribePolicy().then(() =>
          self.PUBLIC_SUBSCRIBE_POLICY_ATTACHED())
      }
  
      if (!self.publicReceivePolicy) {
        ApiGateway.attachPublicReceivePolicy().then(() =>
          self.PUBLIC_RECEIVE_POLICY_ATTACHED())
      }      
    }),
    deviceConnectedStatusChanged : status => {
      self.DEVICE_CONNECTED_STATUS_CHANGED(status)
    },
    attachMessageHandler : () => {
      if (!self.messageHandlerAttached) {
        IoT.attachMessageHandler((topic, jsonPayload) => console.log('RECEIVED:', topic, JSON.parse(jsonPayload.toString())))
      }
      self.MESSAGE_HANDLER_ATTACHED(true)
    },

    messageToSendChanged : messageToSend => {
      self.MESSAGE_TO_SEND_CHANGED(messageToSend)
    },
    subscribeToTopic : topic => {
      if (self.subscribedTopics.includes(topic)) {
        console.log('Already subscribed to topic', topic);
      } else {
        IoT.subscribe(topic);
        self.ADD_SUBSCRIBED_TOPIC(topic);
      }
    },
    pub: (topic,payload) => {
      const { identityId } = getRoot(self).authStore
      const t = `${topic}/${identityId}`;
      IoT.publish(t, JSON.stringify(payload));
    }

  }))
    

export default IotStore