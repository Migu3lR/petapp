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


const { width: WIDTH} = Dimensions.get('window')

class SelectPetScreen extends Component {
  render() {
    const { authStore } = this.props
    console.log(authStore.pet_list('Perro'))
    return (
      
      <Container>
        <Content padder>
          {authStore.pet_list('Perro').length > 0 &&
            <List
                dataArray={authStore.pet_list('Perro')}
                renderRow={i => {
                  return (
                    <ListItem
                      button
                      onPress={() => console.log(i.pet.nombre)}>
                        <Left>
                          <Text>{i.pet.nombre}</Text>
                        </Left>
                        <Right>
                          <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                  )
                }}
            />
          }
          {authStore.pet_list('Perro').length == 0 &&
            <List>
              <ListItem 
                selected
                button
                onPress={() => authStore.PetReg_Visible(true)}
              >
                <Left>
                  <Text>Primero debes agregar una mascota a tu lista</Text>
                </Left>
                <Right>
                  <Icon name="add" />
                </Right>
              </ListItem>
            </List>
          }
        </Content>  
      </Container>
      
    )
  }

}

export default inject('authStore','forms')(observer(SelectPetScreen));
