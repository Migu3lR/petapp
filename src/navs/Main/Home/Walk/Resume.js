import React, {Component} from 'react';
import { 
  Image, 
  View, 
  Text,
  TextInput, 
  ImageBackground, 
  StyleSheet, 
  Dimensions,
  ScrollView,
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
  Body,
  List, ListItem,
  H1, H2, H3  } from 'native-base';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Icon from 'react-native-vector-icons/Ionicons'
import { SocialIcon } from 'react-native-elements'

import { inject, observer } from 'mobx-react'
const { width: WIDTH} = Dimensions.get('window')

class ResumeScreen extends Component {
  
  render() {
    const {forms, authStore} = this.props
    return (
      
      <Container>
        <Content padder>
          <ScrollView>
            <View style={{ flex:1, justifyContent:'center', marginVertical: 10}}>
              <H3 style={{ alignSelf: 'center'}}>Resumen del servicio a solicitar</H3>
              <View style={{ margin: 10, marginTop: 10}}>
                <View style={{ marginVertical: 5}}>
                  <Text style={{fontWeight:'bold', fontSize: 16}}>Vamos a pasear a: </Text>
                  <ListItem avatar>
                    <Left>
                      <Icon note style={{color:'#48d1cc'}} name="arrow-forward" />
                    </Left>
                    <Body>
                      <Text>{authStore.user.pets[forms.walk.petIndex].pet.nombre}</Text> 
                    </Body>
                  </ListItem>
                </View>

                <View style={{ marginVertical: 5}}>
                  <Text style={{fontWeight:'bold', fontSize: 16}}>El paseo será: </Text>
                  <ListItem avatar>
                    <Left>
                      <Icon note style={{color:'#48d1cc'}} name="arrow-forward" />
                    </Left>
                    <Body>
                      <Text>{forms.walk.walkNow ? 'De inmediato!' : 'Programado'}</Text> 
                    </Body>
                  </ListItem>                
                </View>

                <View style={{ marginVertical: 5 }}>
                  <Text style={{fontWeight:'bold', fontSize: 16}}>Tipo de paseo: </Text>
                  <ListItem avatar>
                    <Left>
                      <Icon note style={{color:'#48d1cc'}} name="arrow-forward" />
                    </Left>
                    <Body>
                      <Text>{forms.walk.walk_type().title}</Text> 
                      <Text note style={{color:'#696969'}}>{forms.walk.walk_type().desc}</Text> 
                    </Body>
                  </ListItem>                
                </View>

                <View style={{ marginVertical: 5 }}>
                  <Text style={{fontWeight:'bold', fontSize: 16}}>Lo pasaremos a recoger en: </Text>
                  <ListItem avatar>
                    <Left>
                      <Icon note style={{color:'#48d1cc'}} name="arrow-forward" />
                    </Left>
                    <Body>
                      <Text>{authStore.user.locations[forms.walk.locationIndex].location.address_name}</Text> 
                      <Text note style={{color:'#696969'}}>{authStore.user.locations[forms.walk.locationIndex].location.address}</Text> 
                      <Text note style={{color:'#696969'}}>{authStore.user.locations[forms.walk.locationIndex].location.address_details}</Text> 
                    </Body>
                  </ListItem>                
                </View>

                <Text style={{marginVertical: 5, textAlign:'justify'}}>
                  A continuación podrás "ENVIAR SOLICITUD", con esto se notificará a los colaboradores interesados en el paseo que necesitas de acuerdo al horario, zona y tipo de paseo, y te podremos en contacto con ellos.
                </Text>

                <TouchableOpacity style={styles.btnSend}
                  onPress={() => {
                    forms.walk.save()
                    this.props.navigation.navigate('Home')
                  }}>
                  <Text style={styles.textSend}>ENVIAR SOLICITUD</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </ScrollView>
        </Content>  
        
      </Container>
      
    )
  }

}

export default inject('forms', 'authStore')(ResumeScreen);

const styles = StyleSheet.create({
  btnSend: {
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FBB45F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  textSend: {
    color: '#6F5F4E',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
 });
