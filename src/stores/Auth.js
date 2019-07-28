import * as Mobx from 'mobx'
import { types, flow, getRoot } from 'mobx-state-tree'
import AsyncStorage from '@react-native-community/async-storage';

import * as ApiGateway from '../lib/api-gateway';
import * as Cognito from '../lib/aws-cognito';
import * as IoT from '../lib/aws-iot';

const AuthStore = types.model('AuthStore',{
    username: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    error: types.optional(types.string, ''),
    notice: types.optional(types.string, ''),
    loading: false,
    loggedIn: false,
    user: types.maybeNull(types.map(types.frozen())),
    identityId: types.optional(types.string, '')
  })
  .actions(self => ({
    LOGIN_USER() {
      self.loading = true;
      self.error = '';
      self.notice = ''
    },
    LOGIN_USER_SUCCESS(user) {
      self.username = '';
      self.password = '';
      self.email = '';
      self.error = '';
      self.notice = '';
      self.loading = false;
      self.loggedIn = false;
      self.identityId = '';
      self.user = user
    },
    LOGIN_USER_FAILED(error) {
      self.error = error || 'Authentication Failed';
      self.password = '';
      self.loading = false
    },
    LOGGED_IN_STATUS_CHANGED(loggedIn) {
      self.loggedIn = loggedIn
    },
    LOGOUT(status) {
      self.username = '';
      self.password = '';
      self.email = '';
      self.error = '';
      self.notice = '';
      self.loading = false;
      self.loggedIn = false;
      self.identityId = '';
      self.user = null
    },
    REGISTER_USER() {
      self.error = '';
      self.notice = '';
      self.loading = true
    },
    REGISTER_USER_SUCCESS(username) {
      self.password = '';
      self.email = '';
      self.error = '';      
      self.loading = false;
      self.loggedIn = false;
      self.identityId = '';
      self.user = null
      self.username = username;
      self.notice = 'Registration successful. Please sign in'
    },
    REGISTER_USER_FAILED(error) {
      self.username = '';
      self.password = '';
      self.email = '';
      self.notice = '';
      self.loading = false;
      self.loggedIn = false;
      self.identityId = '';
      self.user = null;
      self.error = error || 'Registration Failed'
    },
    IDENTITY_UPDATED(identityId) {
      self.identityId = identityId
    },
    NEW_USER(identityId,user) {
      self.identityId = identityId
      self.user = user
    },

    signOutUserSuccess() {
      AsyncStorage.setItem('isLoggedIn', 'false');
      const topics = getRoot(self).iotStore.subscribedTopics;
      IoT.unsubscribeFromTopics(topics);
      getRoot(self).iotStore.CLEAR_SUBSCRIBED_TOPICS();
      getRoot(self).iotStore.MESSAGE_HANDLER_ATTACHED(false);
      self.LOGGED_IN_STATUS_CHANGED(false);
      self.LOGOUT();
    },
    
    handleSignOut : flow(function* () {
      yield Cognito.logoutUser()
      Cognito.clearCachedId();
      AsyncStorage.clear();
      self.signOutUserSuccess();
    }),
    loginUserSuccess : flow(function* (user,awsCredentials,provider,token) {
      yield AsyncStorage.setItem('awsCredentials', JSON.stringify(awsCredentials));
      yield AsyncStorage.setItem('isLoggedIn', 'true');
      yield AsyncStorage.setItem('provider', provider);
      yield AsyncStorage.setItem('providerToken', token);
      self.LOGIN_USER_SUCCESS(user);
      self.LOGGED_IN_STATUS_CHANGED(true);
      const identityId = Cognito.getIdentityId();
      ApiGateway.createUser(user.username)
      .then((createdUser) => {
        console.log('created user', identityId,createdUser);
        self.NEW_USER(identityId, createdUser);
      });
    }),
    loginUserFail(error) {
      self.LOGIN_USER_FAILED(error)
    },
    loginUser(username, password) {
      self.LOGIN_USER();
      AsyncStorage.clear();
      console.log(username)
      return Cognito.loginUser(username, password)
        .then(userData => self.loginUserSuccess(userData.userObj, userData.awsCredentials, 'user_pool', ''))
        .catch((error) => {
          console.log(error);
          self.loginUserFail(error.message);
        });
    },
    loggedInStatusChanged(loggedIn){
      self.LOGGED_IN_STATUS_CHANGED(loggedIn)
    },
    registerUserSuccess(username) {
      self.REGISTER_USER_SUCCESS(username)
    },
    registerUserFail(error) {
      self.REGISTER_USER_FAILED(error)
    },
    register(username, password, email) {
      self.REGISTER_USER();
      return Cognito.register(username, password, email)
        .then(registeredUsername => self.registerUserSuccess(registeredUsername))
        .catch(error => self.registerUserFail(error.message));
    }

    

  }))
    

export default AuthStore