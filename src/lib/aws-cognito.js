/*
  Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except
  in compliance with the License. A copy of the License is located at

      http://aws.amazon.com/apache2.0/

  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import AsyncStorage from '@react-native-community/async-storage';
import * as log from 'loglevel';

import Config from '../config';

const userPool = new CognitoUserPool({
  UserPoolId: Config.awsCognitoUserPoolId,
  ClientId: Config.awsCognitoUserPoolAppClientId,
});

const getCurrentUser = async () => await userPool.getCurrentUser();

/**
 * Fetch JWT token from current session
 *
 * @param {CognitoUser} currentUser - Cognito User from storage
 * @returns {Promise<string>} - Promise resolves with the JWT session ID token
 */
const getUserToken = currentUser => (
  new Promise((resolve, reject) => {
    currentUser.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  })
);

/**
 * Fetch AWS credentials using AWS SDK
 *
 * @param {string} token - Cognito User Pool token or Third Party acceess token
 * @param {string} provider - Name of the authenticated provider
 * @param {string} refreshToken - Cognito User Pool Refresh Token
 * @param {string} username - Cognito User Pool username
 * @returns {Promise<object>} - Object containing properties: accessKeyId, secretAccessKey,
 * sessionToken
 */
export const getAwsCredentials = (token, provider, refreshToken, username) => (
  new Promise((resolve, reject) => {
    let providerKey = '';

    switch (provider) {
      case 'user_pool':
        providerKey = `cognito-idp.${Config.awsRegion}.amazonaws.com/${Config.awsCognitoUserPoolId}`;
        break;
      case 'facebook':
        providerKey = 'graph.facebook.com';
        break;
      case 'google':
        providerKey = 'accounts.google.com';
        break;
      case 'amazon':
        providerKey = 'www.amazon.com';
        break;
      default:
        break;
    }

    AWS.config.region = Config.awsRegion;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: Config.awsCognitoIdentityPoolId,
      Logins: {
        [providerKey]: token,
      },
    });
    
    console.log(username, userPool)
    if (AWS.config.credentials.needsRefresh() && refreshToken) {
      console.log('needRefresh')
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.refreshSession(refreshToken, (err, session) => {
        if(err) {
          console.log(err);
        } 
        else {
          AWS.config.credentials.params.Logins[providerKey]  = session.getIdToken().getJwtToken();
          AWS.config.credentials.refresh((err)=> {
            if(err)  {
              console.log(err);
            }
            else{
              console.log("TOKEN SUCCESSFULLY UPDATED");
              AsyncStorage.setItem('refreshToken', session.refreshToken.token);
            }
          });
        }
      });
    }


    AWS.config.credentials.get((error) => {
      if (error) {
        AsyncStorage.clear();
        reject(error);
      }

      const { accessKeyId, secretAccessKey, sessionToken } = AWS.config.credentials;
      const credentialSubset = { accessKeyId, secretAccessKey, sessionToken };
      resolve(credentialSubset);
    });
  })
);

/**
 * Fetches user details from Cognito User Pool
 *
 * @param {string} username - Username of user to query
 * @returns {Promise<object>} - Promise object represents mapping of attribute name to attribute
 * value
 */
const buildUserObject = username => (
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.getSession((sessionErr) => {
      if (sessionErr) {
        reject(sessionErr);
      }

      cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          reject(err);
        }

        const user = {};
        for (let i = 0; i < result.length; i += 1) {
          user[result[i].getName()] = result[i].getValue();
        }
        user.username = username;
        resolve(user);
      });
    });
  })
);

/**
 * Authenticate user using username and password
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<CognitoUserSession>} - User session of authenticated user
 */
const authenticateUser = (username, password) => (
  new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (error) => {
        reject(error);
      },
    });
  })
);


/**
 * Helper to check if a user is authenticated
 *
 * @returns {bool} - Whether the cached credentials are valid or not
 */
export const authUser = async () => {
  if (AWS.config.credentials && Date.now() < AWS.config.credentials.expireTime - 60000) {
    return true;
  }

  const provider = await AsyncStorage.getItem('provider');
  let token = await AsyncStorage.getItem('providerToken');
  let refreshToken = await AsyncStorage.getItem('refreshToken');
  let user = await AsyncStorage.getItem('user');

  console.log('token', token)
  console.log('refreshToken', refreshToken)
  console.log('user', user)

  
  if (!token) {
    switch (provider) {
      case 'facebook':
        break;
      case 'google':
        break;
      case 'user_pool': {
        const currentUser = await getCurrentUser();
        token = await getUserToken(currentUser);
        break;
      }
      default:
        return false;
    }
  } 

  await getAwsCredentials(token, provider, {getToken : () => refreshToken}, JSON.parse(user).user.username);
  return(AWS.config.credentials && Date.now() < AWS.config.credentials.expireTime - 60000)    

  
};

/**
 * Retrieve last Cognito Identity ID that was cached by the AWS SDK
 *
 * @return {string} - Cognito Identity Id
 */
export const getIdentityId = () => {
  const identityId = AWS.config.credentials.identityId;
  log.debug('principal', identityId);
  return identityId;
};

/**
 * Clears the cached Cognito ID associated with the currently configured identity pool ID
 */
export const clearCachedId = () => {
  if (AWS.config.credentials !== null) AWS.config.credentials.clearCachedId();
};

/**
 * Login to Amazon Cognito using username and password
 * 1. Authenticates with username and password
 * 2. Fetches AWS credentials
 * 3. Fetches user attributes
 *
 * @param {string} username - username of user
 * @param {string} password - password of user
 * @returns {Promise} Promise object represents user object from Cognito and AWS Credentials
 */
export const loginUser = (username, password) => (
  new Promise((resolve, reject) => {
    authenticateUser(username, password).then((cognitoUserSession) => {
      const token = cognitoUserSession.getIdToken().getJwtToken();
      const refreshToken = cognitoUserSession.refreshToken.token;
      const promise1 = getAwsCredentials(token, 'user_pool',{getToken : () => refreshToken},username);
      const promise2 = buildUserObject(username);
      return Promise.all([promise1, promise2, token, refreshToken]);
    }).then((values) => {
      const awsCredentials = values[0];
      const user = values[1];
      const token = values[2];
      const refreshToken = values[3];
      const userData = Object.assign({ awsCredentials }, { userObj: user }, { token }, {refreshToken});
      resolve(userData);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  })
);

/**
 * Log out of Amazon Cognito
 *
 * @returns {Promise}
 */
export const logoutUser = () => (
  new Promise((resolve) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      log.debug('cognito user pool user signing out');
      cognitoUser.signOut();
    } else {
      log.debug('cognito federated user signing out');
    }
    resolve();
  })
);

/**
 * Register a user with Amazon Cognito
 *
 * @param {string} username - username of the user
 * @param {string} password - password of the user
 * @param {string} email - email of the user
 * @returns {Promise<string>} Promise object represents the username of the registered user
 */
export const register = (username, password, email) => (
  new Promise((resolve, reject) => {
    const attributeList = [];
    const attributeEmail = new CognitoUserAttribute({ Name: 'email', Value: email });
    attributeList.push(attributeEmail);
    userPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.user.getUsername());
      }
    });
  })
);
