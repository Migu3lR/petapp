import React, {Component} from 'react';
import { Image, View, Text, Button } from 'react-native';

import { styles } from '../../styles/style'

class NotificationsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={{ uri: 'https://img.icons8.com/cotton/420/topic-push-notification.png' }}
        style={styles.icon}
      />
    )
  }
  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title='Go back to Home'
      />
    )
  }
}

export default NotificationsScreen;