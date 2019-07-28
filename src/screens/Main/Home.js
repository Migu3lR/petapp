import React, {Component} from 'react';
import { Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import { List, ListItem } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react'
/*import Auth from '@aws-amplify/auth'
import { PubSub } from 'aws-amplify';
import { IOTSubscribeToMultipleTopics } from  '../../libs/IOT.PubSub'
*/
import { styles } from '../../styles/style'


class HomeScreen extends Component {
  
  /*componentDidMount() {
    IOTSubscribeToMultipleTopics('myTopic')
    //Se recibe doble mensaje y no se puede desuscribir

  } */

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent 
              onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Chat App to talk some awesome people!</Text>
              </Body>
            </CardItem>
          </Card>
          <Button full rounded dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('Chat')}>
              <Text>Chat with people</Text>
          </Button>
          <Button full rounded dark
            style={{ marginTop: 10 }}
            onPress={() => this._signOutAsync()}>
              <Text>Cerrar Sesion</Text>
          </Button>
        </Content>
      </Container>
    )
  }

  _signOutAsync = async () => {
    const { authStore } = this.props
    await authStore.handleSignOut()
    this.props.navigation.navigate('Auth')
    
  }

}


export default inject('authStore')(HomeScreen);
