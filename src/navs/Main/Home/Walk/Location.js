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

class LocationScreen extends Component {
  
  render() {
    const { authStore, forms } = this.props
    return (
      
      <Container>
        <Content padder>
          {authStore.location_list().length > 0 &&
            <List
                dataArray={authStore.location_list()}
                renderRow={i => {
                  return (
                    <ListItem avatar button
                      button
                      onPress={() => {
                        forms.walk.select_location(i.location)
                        this.props.navigation.navigate('Resume')
                      }
                    }>
                        <Body style={{marginLeft:-10}}>
                          <Text style={{fontWeight:'bold'}}>{i.location.address_name}</Text>
                          <Text note style={{color:'#696969'}}>{i.location.address}</Text>
                          <Text note style={{color:'#696969'}}>{i.location.address_details}</Text>
                        </Body>
                        <Right>
                          <Icon note style={{color:'#48d1cc'}} name="arrow-forward" />
                        </Right>
                    </ListItem>
                  )
                }}
            />
          }
          {authStore.location_list().length == 0 &&
            <List>
              <ListItem 
                selected
                button
                onPress={() => this.props.navigation.navigate('AddLocation')}
              >
                <Left>
                  <Text>Agrega tu dirección para recoger a tu mascota </Text>
                </Left>
                <Right>
                  <Icon style={{color:'#48d1cc'}} name="add" />
                </Right>
              </ListItem>
            </List>
          }
        </Content>  
      </Container>
      
    )
  }

}

export default inject('authStore','forms')(LocationScreen);
