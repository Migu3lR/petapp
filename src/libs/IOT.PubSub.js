import Amplify from '@aws-amplify/core'
import { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { getCurrentCredentials } from './Auth'

/**
 * Attaches the current user credentials to the AWSIoTProvider so
 * the signed in user has the ability to recieve data from subscribed
 * MQTT Topics.
 *
 * Resolves a promise if the credentials were received and the Provider
 * was successfully attached to the amplify class
 */
export const attachIotPolicy = () => (
  new Promise((resolve, reject) => {
    getCurrentCredentials()
      .then((credentials) => {
        Amplify.addPluggable(new AWSIoTProvider({
          aws_pubsub_region: 'us-east-1',
          aws_pubsub_endpoint: 'wss://a1ibjimaoot6ov-ats.iot.us-east-1.amazonaws.com/mqtt',
        }));
        resolve();
      })
      .catch((error) => {
        console.log('Error when getting credentials in order to attach an Iot policy', error);
        reject(error);
      });
  })
);

/**
 * Subscribes to multiple MQTT Topics
 *
 * @param {array} topics an array of strings of the topics that are being subscribed to
 * @param {fn} messageHandler the handler that should be called when a message is received
 */
export const IOTSubscribeToMultipleTopics = (topics, messageHandler) => {
  attachIotPolicy()
    .then(() => {
      PubSub.subscribe(topics).subscribe({
        next: (data) => {
          console.log('Message received', data);
          if (messageHandler) messageHandler(data);
        },
        error: error => console.error(error),
        close: () => console.log('Done'),
      });
    })
    .catch(error => console.log('Error when trying to attach an Iot Policy: ', error));
};