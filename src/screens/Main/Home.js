import React, {Component} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { 
  Container, Header, Title, Left, Icon, Right, Body, Content, View,
  Button,
  Card, CardItem, 
  Thumbnail,
  Text, H1, H2, H3 
} from "native-base";
import { List, ListItem, Overlay} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react'
import * as IoT from '../../lib/aws-iot';
import st from '../../styles/home'

import OverPet from './Over_PetRegister'


class HomeScreen extends Component {
  
  send() {
    const { identityId } = this.props.authStore
    const topic = `srv/prueba/${identityId}`;
    IoT.publish(topic, JSON.stringify({ message: 'hola' }));
  }

  render() {
    const walk = '../../images/dogwalking.jpg'
    const host = '../../images/pethost.jpg'
    const host2 = '../../images/pethost2.jpg'
    const hair = '../../images/pethair2.jpg'

    let _isVisible = true
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
            <Title>Mascotita</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <OverPet />
          <H2 style={st.titulo}>- Nuestros Servicios -</H2>
          <View style={st.vwServicios}>
            <TouchableOpacity style={st.btServicio}
            onPress={() => this.send()}>
              <Thumbnail style={st.thumbServicio} source={require(host)} />
              <Text style={st.txtServicio}>Hospedaje</Text>
            </TouchableOpacity>
            <TouchableOpacity style={st.btServicio}
            onPress={() => this.props.authStore.PetReg_Visible(true)}>
              <Thumbnail style={st.thumbServicio} source={require(walk)} />
              <Text style={st.txtServicio}>Paseo de Perros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={st.btServicio}
            onPress={() => alert('Guardería')}>
              <Thumbnail style={st.thumbServicio} source={require(host2)} />
              <Text style={st.txtServicio}>Guardería</Text>
            </TouchableOpacity>
            <TouchableOpacity style={st.btServicio}
            onPress={() => alert('Peluquería')}>
              <Thumbnail style={st.thumbServicio} source={require(hair)} />
              <Text style={st.txtServicio}>Peluquería</Text>
            </TouchableOpacity>            
          </View>
          
        </Content>
      </Container>
    )
  }
}

export default inject('authStore','iotStore')(observer(HomeScreen));

