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
import AsyncStorage from '@react-native-community/async-storage';
//import Icon from 'react-native-vector-icons/Ionicons'
import { SocialIcon } from 'react-native-elements'

import bgImage from '../../images/signin_bg.jpg'
import logo from '../../images/logo.png'

const { width: WIDTH} = Dimensions.get('window')

class SignInScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPass: true,
      press: false
    }
    
  }

  _showPass = () => {
    this.setState({
      showPass: !this.state.showPass,
      press: !this.state.press
    })
  }

  render() {
    return (
      
      <Container>
        <ImageBackground source={bgImage} style={styles.bgContainer}>
          <KeyboardAwareScrollView >
            <Header transparent>
              <Left>
                <Button transparent
                onPress={() => this.props.navigation.navigate('SignIn')}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body />
            </Header>
            <Content contentContainerStyle={styles.Container} >
              <View style={styles.descContainer}>
                <Title style={styles.title}>Restablecimiento de contraseña</Title>
                <Text style={styles.desc}>
                  Ingresa tu correo registrado, y te enviaremos un código de autorización para cambiar tu contraseña:
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name={'md-mail'}
                  size={28}
                  color={'#000'}
                  style={styles.inputIcon}
                />
                  <TextInput 
                    style={styles.input}
                    placeholder={'Correo Electrónico'}
                    placeholderTextColor={'rgba(0,0,0, 0.7)'}
                    underlineColorAndroid='transparent'
                    returnKeyLabel='next'
                    autoCapitalize='none'
                    keyboardType={'email-address'}
                  />
              </View>

              <TouchableOpacity style={styles.btnLogin}
                onPress={this._signInAsync.bind(this)}>
                <Text style={styles.textLogin}>Enviar codigo</Text>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <Icon
                  name={'md-lock'}
                  size={28}
                  color={'#000'}
                  style={styles.inputIcon}
                />
                <TextInput 
                  style={styles.input}
                  placeholder={'Contraseña'}
                  secureTextEntry={this.state.showPass}
                  placeholderTextColor={'rgba(0,0,0, 0.7)'}
                  underlineColorAndroid='transparent'
                  returnKeyLabel='done'
                  autoCapitalize='none'
                />
                <TouchableOpacity style={styles.btnEye}
                  onPress={this._showPass.bind(this)}>
                  <Icon 
                    name={this.state.press ? 'ios-eye' : 'ios-eye-off'}
                    size={26}
                    color={'rgba(0,0,0, 0.7)'}                  
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name={'md-keypad'}
                  size={28}
                  color={'#000'}
                  style={styles.inputIcon}
                />
                  <TextInput 
                    style={styles.input}
                    placeholder={'Codigo de autorización'}
                    placeholderTextColor={'rgba(0,0,0, 0.7)'}
                    underlineColorAndroid='transparent'
                    returnKeyLabel='next'
                    autoCapitalize='none'
                    keyboardType={'numeric'}
                  />
              </View>

              <TouchableOpacity style={styles.btnLogin}
                onPress={this._signInAsync.bind(this)}>
                <Text style={styles.textLogin}>Confirmar nueva contraseña</Text>
              </TouchableOpacity>

            </Content>
          </KeyboardAwareScrollView>      
        </ImageBackground>
      </Container>
      
    )
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken','abc');
    this.props.navigation.navigate('App')
  }
}

export default SignInScreen;

const styles = StyleSheet.create({
  title: {
    height: 50,
  },
  Container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
  },
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 120
  },
  logoText: {
    color: 'white',
    fontSize: 40,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.8
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    color: 'rgba(0,0,0, 0.8)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FBB45F',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  textLogin: {
    color: '#6F5F4E',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  optionLinksContainer: {
    width: WIDTH - 70,
    height: 60,
    justifyContent: 'center'
    
  },
  optionLink: {
    color: 'rgba(255,255,255,1)', 
    fontSize: 16
  },
  olLeft: {
    position: 'absolute',
    left: 0
  },
  olRight: {
    position: 'absolute',
    right: 0
  },
  authLinksContainer: {
    flexDirection: 'row',    
  },
  textAuthOp: {
    color: 'white', 
    textAlignVertical:'center'
  },
  desc: {
    color: 'white',
    fontSize: 14,
    textAlign:'justify'
  },
  descContainer: {
    width: WIDTH - 70
  }
})