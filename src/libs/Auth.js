import Amplify, { Auth } from 'aws-amplify';

// Other fns and code and stuff

export const getCurrentCredentials = () => (
  new Promise((resolve, reject) => {
    Auth.currentCredentials()
      .then(creds => resolve(creds))
      .catch(error => reject(error));
  })
);