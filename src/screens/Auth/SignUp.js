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

import bgImage from '../../images/signin_bg.jpg'
import logo from '../../images/logo.png'

const { width: WIDTH} = Dimensions.get('window')

class SignUpScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPass: true,
      press: false
    }

    this.currentEmail = ''

  }

  async SignUp(creds) {
    const { authStore } = this.props

    this.currentEmail = creds.username
    await authStore.register(creds.username, creds.password)
    console.log(authStore.username,authStore.notice,authStore.error)
    alert(authStore.notice || authStore.error)
    if(authStore.username) this.props.navigation.navigate('SignIn')
  }

  confirmSignUp(username, authCode) {
    /*await Auth.confirmSignUp(username, authCode)
    .then(() => {
      this.props.navigation.navigate('SignIn')
      console.log('Confirm sign up successful')
    })
    .catch(err => {console.log('Error codigo confirmacion: ', err)
      alert('Error codigo confirmacion: '+ JSON.stringify(err))
      
    })*/
  }

  resendSignUp(username) {
    /*await Auth.resendSignUp(username)
    .then(() => console.log('Confirmation code resent successfully'))
    .catch(err => {
      console.log('Error reenvio codigo: ', err)
      alert('Error codigo reenvio: '+ JSON.stringify(err))
    })*/
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
                <Title style={styles.title}>Nueva cuenta de Usuario</Title>
                <Text style={styles.desc}>
                  
                </Text>
              </View>

              <View style={styles.inputContainerRow}>
                <TextInput 
                  style={styles.inputRow}
                  placeholder={'Nombre'}
                  placeholderTextColor={'rgba(0,0,0, 0.7)'}
                  underlineColorAndroid='transparent'
                  returnKeyLabel='next'
                  autoCapitalize='words'
                  onChangeText={e => this.given_name=e}
                />
                <TextInput 
                    style={styles.inputRow}
                    placeholder={'Apellido'}
                    placeholderTextColor={'rgba(0,0,0, 0.7)'}
                    underlineColorAndroid='transparent'
                    returnKeyLabel='next'
                    autoCapitalize='words'
                    onChangeText={e => this.family_name=e}
                  />
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
                onPress={() => {
                  creds = {
                    username: this.email,
                    password: this.password
                  }
                  this.SignUp(creds)
                }}>
                <Text style={styles.textLogin}>Registrarme</Text>
              </TouchableOpacity>

              
              <View style={styles.inputContainerRow}>
                <View style={styles.inputContainerCode}>
                  <Icon
                    name={'md-keypad'}
                    size={28}
                    color={'#000'}
                    style={styles.inputIconCode}
                  />
                  <TextInput 
                    style={styles.inputCode}
                    placeholder={'Código de confirmación'}
                    placeholderTextColor={'rgba(0,0,0, 0.7)'}
                    underlineColorAndroid='transparent'
                    returnKeyLabel='next'
                    autoCapitalize='none'
                    keyboardType={'numeric'}
                    onChangeText={e => this.authCode=e}
                  />
                </View>

                <TouchableOpacity style={styles.btnResend}
                  onPress={() => this.resendSignUp(this.currentEmail)}>
                  <Icon
                    name={'md-refresh'}
                    size={28}
                    color={'#000'}
                    style={styles.ResendIcon}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btnLogin}
                onPress={() => this.confirmSignUp(this.currentEmail, this.authCode)}>
                <Text style={styles.textLogin}>Confirmar registro</Text>
              </TouchableOpacity>

              

            </Content>
          </KeyboardAwareScrollView>      
        </ImageBackground>
      </Container>
      
    )
  }

}

export default inject('authStore')(SignUpScreen);

const styles = StyleSheet.create({
  title: {
    height: 50,
  },
  Container: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',

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
  inputContainerRow: {
    flex:1,
    width: WIDTH -55,
    marginTop: 10,
    flexDirection:'row',
    justifyContent:'space-between',   
  },
  inputRow: {
    width: (WIDTH - 65)/2,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 10,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    color: 'rgba(0,0,0, 0.8)',
  },
  inputCode: {
    width: WIDTH - 115,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    color: 'rgba(0,0,0, 0.8)',
  },
  inputContainerCode: {
    width: WIDTH - 100
  },
  inputIconCode: {
    position: 'absolute',
    top: 8,
    left: 15
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
  btnResend: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FBB45F',
    justifyContent: 'center',
    alignItems: 'center',
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