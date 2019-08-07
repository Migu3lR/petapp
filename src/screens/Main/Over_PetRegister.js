import React, {Component} from 'react';
import { Image, TouchableOpacity,ImageBackground, StyleSheet, View } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { 
  Container, Header, Title, Left, Icon, Right, Body, Content, 
  Form, Item, Input, Label, Picker,
  Button,
  Card, CardItem, 
  Thumbnail,
  Text, H1, H2, H3 
} from "native-base";
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import { Overlay } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
 import bgImage from '../../images/petreg.jpg'

class PetRegister extends Component {  
  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['Detalles', 'Descripción', 'Guardar']}/>;
  }

  render() {
    const { overPetReg } = this.props.forms
    return (      
      <Overlay  style={{backgroundColor:'#1AA094'}}
        isVisible={this.props.authStore.showPetReg}
        onBackdropPress={() => {
          this.props.authStore.PetReg_Visible(false);
          overPetReg.clear_form();
          }  
        }
      >    
          <View style={{height:100}}>
            <ImageBackground source={bgImage} style={{flex: 1, width: null, height: null, alignItems: 'center',justifyContent: 'center'}}>
              <H2 style={{textAlign:'center', fontFamily: 'monospace', color:'white',textShadowColor:'black', textShadowRadius:10}}>
                ¡Queremos conocer a tu mascosta!
              </H2>
            </ImageBackground>
          </View>

          <View style={{flex: 1}}>
            <IndicatorViewPager style={{flex:1, paddingTop:20, backgroundColor:'white'}} indicator={this._renderTitleIndicator()}>
              <View>
                <Item picker rounded style={styles.itemPicker} keyExtractor='i0'>
                  <Picker
                    mode='dropdown'
                    iosIcon={<Icon name="arrow-down" />}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={overPetReg.tipo}
                    onValueChange={(value) => overPetReg.change_form('tipo', value)}
                  >
                    <Picker.Item label="Tipo de mascota*" value="" keyExtractor='0'/>
                    <Picker.Item label="Perro" value="Perro" keyExtractor='1'/>
                    <Picker.Item label="Gato" value="Gato" keyExtractor='2'/>
                    <Picker.Item label="Ave" value="Ave" keyExtractor='3'/>
                  </Picker>
                </Item>
                <Item inlineLabel rounded style={styles.item} keyExtractor='i1'>
                  <Label>Nombre*: </Label>
                  <Input onChangeText={(value) => overPetReg.change_form('nombre', value)}/>
                </Item>
                <Item picker rounded style={styles.itemPicker} keyExtractor='i2'>
                  <Picker
                    mode='dropdown'
                    iosIcon={<Icon name="arrow-down" />}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={overPetReg.edad}
                    onValueChange={(value) => overPetReg.change_form('edad', value)}
                  >
                    <Picker.Item label="Rango de edad*" value="" keyExtractor='0'/>
                    <Picker.Item label="Menos de 6 meses" value="Menos de 6 meses" keyExtractor='1'/>
                    <Picker.Item label="6 meses a 1 año" value="6 meses a 1 año" keyExtractor='2'/>
                    <Picker.Item label="1 a 3 años" value="1 a 3 años" keyExtractor='3'/>
                    <Picker.Item label="3 a 5 años" value="3 a 5 años" keyExtractor='4'/>
                    <Picker.Item label="Más de 5 años" value="Más de 5 años" keyExtractor='5'/>
                  </Picker>
                </Item>
                <Button rounded light style={{height: 40, width: 80, alignSelf:'flex-end', justifyContent:'flex-end'}}
                  onPress={() => {
                    this.props.authStore.PetReg_Visible(false);
                    overPetReg.clear_form();
                    }  
                  }
                >
                  <Text>Omitir</Text>
                </Button>
              </View>

              <View>
                <Item inlineLabel rounded style={styles.item} keyExtractor='i3'>
                  <Label>Raza: </Label>
                  <Input onChangeText={(value) => overPetReg.change_form('raza', value)}/>
                </Item>
                <Item picker rounded style={styles.itemPicker} keyExtractor='i4'>
                  <Picker
                    mode='dropdown'
                    iosIcon={<Icon name="arrow-down" />}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={overPetReg.size}
                    onValueChange={(value) => overPetReg.change_form('size', value)}
                  >
                    <Picker.Item label="Tamaño*" value="" keyExtractor='0'/>
                    <Picker.Item label="Pequeño" value="Pequeño" keyExtractor='1'/>
                    <Picker.Item label="Mediano" value="Mediano" keyExtractor='2'/>
                    <Picker.Item label="Grande" value="Grande" keyExtractor='3'/>
                  </Picker>
                </Item>
              </View>
                
              <View style={{justifyContent:'center'}}>
                <Button rounded warning style = {{width:100, alignSelf:'center'}}
                  onPress={() => {
                    //this.props.authStore.PetReg_Visible(false);
                    overPetReg.save();
                    }  
                  }
                >
                  <Text>GUARDAR</Text>
                </Button>
              </View>
            </IndicatorViewPager>
          </View>
          
      </Overlay>
    )
  }
}

export default inject('authStore','forms')(observer(PetRegister));

const styles = StyleSheet.create({
  item: {
    marginVertical:5,
    paddingLeft: 20
  },
  itemPicker: {
    marginVertical:5,
    paddingLeft: 12
  },
  btnLogin: {
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
})
