import React, {Component} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { SwitchActions } from 'react-navigation';
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
import * as IoT from 'petapp/src/lib/aws-iot';
import st from 'petapp/src/styles/home'

import OverPet from 'petapp/src/components/Over_PetRegister'
import AS_Walk from 'petapp/src/components/AS_Walk'


class HomeScreen extends Component {
  
  send() {
    const { identityId } = this.props.authStore
    const topic = `srv/prueba/${identityId}`;
    IoT.publish(topic, JSON.stringify({ message: 'hola' }));
  }

  render() {
    const walk = 'petapp/src/images/dogwalking.jpg'
    const host = 'petapp/src/images/pethost.jpg'
    const host2 = 'petapp/src/images/pethost2.jpg'
    const hair = 'petapp/src/images/pethair2.jpg'

    let _isVisible = true
    return (
      <Container>
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
            onPress={() => AS_Walk(this.props.navigation, this.props.forms)}>
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

export default inject('authStore','iotStore','forms')(observer(HomeScreen));

