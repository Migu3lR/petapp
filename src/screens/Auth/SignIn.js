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
  Footer, 
  Left, 
  Right } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'
import { SocialIcon } from 'react-native-elements'

import { inject, observer } from 'mobx-react'
import * as Mobx from 'mobx'

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

  componentDidMount() {
    this.validateUserSession();
  }

  async validateUserSession() {
    const { authStore } = this.props
    var isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
      authStore.loggedInStatusChanged(true);
    } else {
      authStore.loggedInStatusChanged(false);
    }
  }

  _showPass = () => {
    this.setState({
      showPass: !this.state.showPass,
      press: !this.state.press
    })
  }

  async signIn(username, password) {
    const { authStore } = this.props

    await authStore.loginUser(username, password)
    console.log(authStore.identityId,Mobx.toJS(authStore.user),authStore.notice,authStore.error)
    if(authStore.error) alert(authStore.error)
    if(authStore.user) this.props.navigation.navigate('AuthLoading')
    
  }

  render() {
    return (
      
      <Container>
        <ImageBackground source={bgImage} style={styles.bgContainer}>
          <KeyboardAwareScrollView contentContainerStyle={styles.bgContainer}>
            
            <Content contentContainerStyle={styles.bgContainer} >
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.logoText}>miPET</Text>
              </View>

              <View style={styles.authLinksContainer}>
                <Text style={styles.textAuthOp}>Iniciar con: </Text>
                <SocialIcon light type='facebook' />
                <SocialIcon light type='google'  />
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
                    onChangeText={e => this.email=e}
                  />
              </View>

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
                  onChangeText={e => this.password=e}
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

              <TouchableOpacity style={styles.btnLogin}
                onPress={() => this.signIn(this.email, this.password)}>
                <Text style={styles.textLogin}>INGRESAR</Text>
              </TouchableOpacity>

              <View style={styles.optionLinksContainer}>
                <Button transparent style={styles.olLeft}
                onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={styles.optionLink}>Crear cuenta</Text>
                </Button>
                
                <Button transparent style={styles.olRight}
                onPress={() => this.props.navigation.navigate('ForgotPwd')}>
                  <Text style={styles.optionLink}>Olvide mi contraseña</Text>
                </Button>                
              </View>

            </Content>

          </KeyboardAwareScrollView> 
        </ImageBackground>
      </Container>
      
    )
  }  
}

export default inject('authStore')(SignInScreen);

const styles = StyleSheet.create({
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
    marginTop: 20
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
  }
})