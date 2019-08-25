import React, {Component} from 'react';
import { 
  Image, 
  View, 
  Text,
  TextInput, 
  ImageBackground, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity } from 'react-native';
import { 
  Container, 
  Button,
  Content,
  Header,
  Icon,
  Title, 
  Footer, 
  List, ListItem,
  Left, 
  Right,
  Body } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Icon from 'react-native-vector-icons/Ionicons'
import { SocialIcon } from 'react-native-elements'

import { inject, observer } from 'mobx-react'


const walks = [
  {
    id: 'V1H',
    title: 'Paseo VIP 1H',
    desc: 'Un paseo privado para tu mascota de 1 hora',
    min_price: 10000,
    max_price: 20000
  },
  {
    id: 'V2H',
    title: 'Paseo VIP 2H',
    desc: 'Un paseo privado para tu mascota de 2 horas',
    min_price: 20000,
    max_price: 30000
  },
  {
    id: 'G1H',
    title: 'Paseo Grupal 1H',
    desc: 'Un paseo grupal (4-5 caninos) de 1 hora',
    min_price: 5000,
    max_price: 10000
  },
  {
    id: 'G2H',
    title: 'Paseo Grupal 2H',
    desc: 'Un paseo grupal (4-5 caninos) de 2 hora',
    min_price: 10000,
    max_price: 20000
  }
]

class WalkTypeScreen extends Component {
  
  render() {
    const { forms } = this.props
    return (
      
      <Container>
        <Content padder>
          <List
            dataArray={walks}
            renderRow={i => {
              return (
                <ListItem avatar button
                  onPress={() => {
                    forms.walk.change_form('walkType', i.id)
                    this.props.navigation.navigate('Location')
                  }}
                >
                  <Body style={{marginLeft:-10}}>
                    <Text style={{fontWeight:'bold'}}>{i.title}</Text>
                    <Text note style={{color:'#696969'}}>{i.desc}</Text>
                  </Body>
                  <Right>
                    <Text note style={{color:'#48d1cc'}}>${i.min_price/1000}K - ${i.max_price/1000}K</Text>
                  </Right>
                </ListItem>
              )
            }}
          />
        </Content>  
      </Container>
      
    )
  }

}

export default inject('forms')(WalkTypeScreen);
