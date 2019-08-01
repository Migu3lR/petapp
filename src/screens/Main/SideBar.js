import React, {Component} from 'react';
import { Image, ImageBackground } from 'react-native'
import { Container, Content, Text, List, ListItem } from 'native-base'
import { inject, observer } from 'mobx-react'

const routes = ['Home', 'Chat'];

class SideBar extends Component {

  _signOutAsync = async () => {
    const { authStore } = this.props
    await authStore.handleSignOut()
    this.props.navigation.navigate('Auth')
    
  }

  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            source={require('../../images/Cover.png')}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Image
              square
              style={{ height: 80, width: 80 }}
              source={require('../../images/logo.png')}
            />
          </ImageBackground>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                    <Text>{data}</Text>
                </ListItem>
              )
            }}
          />
          <List>
            <ListItem
              button
              onPress={() => this._signOutAsync()}>
                <Text>Cerrar Sesión</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default inject('authStore')(observer(SideBar));