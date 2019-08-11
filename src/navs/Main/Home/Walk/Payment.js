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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Icon from 'react-native-vector-icons/Ionicons'
import { SocialIcon } from 'react-native-elements'

import { inject, observer } from 'mobx-react'

const { width: WIDTH} = Dimensions.get('window')

class PaymentScreen extends Component {
  
  render() {
    return (
      
      <Container>
        <Content padder>
          <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Payment</Text>
          </View>
        </Content>  
      </Container>
      
    )
  }

}

export default inject('forms')(PaymentScreen);
