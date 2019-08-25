import * as Mobx from 'mobx'
import { types, flow, getRoot } from 'mobx-state-tree'
import AsyncStorage from '@react-native-community/async-storage';

import * as ApiGateway from '../lib/api-gateway';
import * as Cognito from '../lib/aws-cognito';
import * as IoT from '../lib/aws-iot';

import User from './User'

const AuthStore = types.model('AuthStore',{
    username: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    error: types.optional(types.string, ''),
    notice: types.optional(types.string, ''),
    loading: false,
    loggedIn: false,
    user: types.maybeNull(User),
    identityId: types.optional(types.string, ''),
    showPetReg: false
  })
  .actions(self => ({
    PetReg_Visible(visible) {
      self.showPetReg = visible;
    },
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
    async USER_UPDATED(user) {
      self.user = user
      await AsyncStorage.setItem('user', JSON.stringify(user));
    },
    async NEW_USER(identityId,user) {
      self.identityId = identityId
      self.user = user
      
      self.showPetReg = (user.pets == undefined  || user.pets.length == 0)
      await AsyncStorage.setItem('user', JSON.stringify(user));
    },

    signOutUserSuccess() {
      AsyncStorage.setItem('isLoggedIn', 'false');
      const topics = getRoot(self).iotStore.subscribedTopics;
      IoT.unsubscribeFromTopics(topics);
      getRoot(self).iotStore.CLEAR_SUBSCRIBED_TOPICS();
      getRoot(self).iotStore.MESSAGE_HANDLER_ATTACHED(false);
      self.LOGGED_IN_STATUS_CHANGED(false);
      self.LOGOUT();
      getRoot(self).iotStore.LOGOUT();
    },
    
    handleSignOut : flow(function* () {
      yield Cognito.logoutUser()
      Cognito.clearCachedId();
      AsyncStorage.clear();
      self.signOutUserSuccess();
    }),
    loginUserSuccess : flow(function* (user,awsCredentials,provider,token,refreshToken) {
      
      yield AsyncStorage.setItem('awsCredentials', JSON.stringify(awsCredentials));
      yield AsyncStorage.setItem('isLoggedIn', 'true');
      yield AsyncStorage.setItem('provider', provider);
      yield AsyncStorage.setItem('providerToken', token);
      yield AsyncStorage.setItem('refreshToken', refreshToken);
      
      self.LOGGED_IN_STATUS_CHANGED(true);
      const identityId = Cognito.getIdentityId();
      yield ApiGateway.createUser(user)
      .then(async (user) => {
        self.LOGIN_USER_SUCCESS(user);
        await self.NEW_USER(identityId, user);
      });
      
    }),
    loginUserFail(error) {
      self.LOGIN_USER_FAILED(error)
    },
    loginUser(username, password) {
      self.LOGIN_USER();
      AsyncStorage.clear();
      return Cognito.loginUser(username, password)
        .then(userData => self.loginUserSuccess(userData.userObj, userData.awsCredentials, 'user_pool', userData.token, userData.refreshToken))
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
  .views(self =>({
    pet_list: (pet_type) => {
      if (self.user.pets === undefined  || self.user.pets.length == 0 || !pet_type || pet_type == '') return []
      
      if (pet_type == 'ALL') return self.user.pets

      if (pet_type) return self.user.pets.filter(e => e.pet.tipo == pet_type)      
    },
    location_list: () => {
      if (self.user.locations === undefined  || self.user.locations.length == 0 ) return []
      
      return self.user.locations    
    }
  }));
    

export default AuthStore