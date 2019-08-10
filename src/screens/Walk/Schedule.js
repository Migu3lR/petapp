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
  Left, 
  Right,
  Body } from 'native-base';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Icon from 'react-native-vector-icons/Ionicons'
import { SocialIcon } from 'react-native-elements'

import { inject, observer } from 'mobx-react'

import bgImage from '../../images/signin_bg.jpg'
import logo from '../../images/logo.png'

const { width: WIDTH} = Dimensions.get('window')

class ScheduleScreen extends Component {
  
  render() {
    return (
      
      <Container>
        
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          </View>
        </Content>  
        
      </Container>
      
    )
  }

}

export default inject('forms')(ScheduleScreen);
