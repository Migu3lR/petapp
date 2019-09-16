import React, {Component} from 'react';
import { 
  Image, 
  View, 
  Text,
  TextInput, 
  ImageBackground, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid } from 'react-native';
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
  Body ,
  Form, Item, Input, Label,} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Icon from 'react-native-vector-icons/Ionicons'
import { SocialIcon } from 'react-native-elements'
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from  'react-native-maps';

import { inject, observer } from 'mobx-react'
import * as Mobx from 'mobx'

import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyCon14PIYPNoHhMu2M7R5vz_iQip1Tvzu0"); // use a valid API key

const { width: WIDTH} = Dimensions.get('window')
let id = 0;


class AddLocationScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: -74,
        longitude: 4,
        latitudeDelta: Math.abs(-74 / 5000),
        longitudeDelta: Math.abs(4 / 5000),
      },
      marker: {
        latitude: -74,
        longitude: 4
      }
    }
    
  }

  requestLocationPermission = async () =>
  {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

   getCurrentLocation() {
    let location = Geolocation.getCurrentPosition(
      (position) => {
          console.log(position);
          this.setState(
            {
              region: {
                latitudeDelta: Math.abs(position.coords.latitude / 5000),
                longitudeDelta: Math.abs(position.coords.longitude / 5000),
                latitude: position.coords.latitude,
                longitude: position.coords.longitude, 
              },
              marker: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude, 
              }
            }
          )
          this.getAddress(this.state.region)
          
          
      },
      (error) => {
          console.log(error.code, error.message);
          alert("Por favor verifica el estado de tu GPS e intentalo nuevamente.")
          this.props.navigation.goBack()
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    console.log(location)
  }


  async componentDidMount(){
    await this.requestLocationPermission()
    this.getCurrentLocation() 

    Geocoder.from("Calle 147 #500-300, Bogota, Colombia")
		.then(json => {
			var location = json.results[0].geometry.location;
			console.log('geocoder', json);
		})
    .catch(error => console.warn(error));
    
    const places = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=calle+147+11+-+27&key=AIzaSyCon14PIYPNoHhMu2M7R5vz_iQip1Tvzu0');
    console.log(await places.json())
  }

  componentDidUpdate(){
    console.log(this.state.region)
  }

  async getAddress(region){
    const { forms } = this.props

    const json = await Geocoder.from(region)
    
    const street_address = json.results.filter(res => res.types.indexOf("street_address") > -1)
    const establishment = json.results.filter(res => res.types.indexOf("establishment") > -1)
    
    const result = street_address.length == 0 ? establishment : street_address
    console.log('geocode', result)
    forms.addLocation.change_form('address', result[0].formatted_address != undefined ? result[0].formatted_address : '')
  }

  onRegionChangeComplete = region => {
    this.setState({ region })
    console.log('onRegionChangeComplete', region)
    this.props.forms.addLocation.change_form('region', region)
  }

  onMapPress(e) {
    this.setState({
      marker: {...e.nativeEvent.coordinate}
    });
    console.log('Create Marker', e.nativeEvent.coordinate)
    this.getAddress(e.nativeEvent.coordinate)
    this.props.forms.addLocation.change_form('region', e.nativeEvent.coordinate)
  }
  
  onMarkerDrag(e) {
    this.setState({
      marker: {...e.nativeEvent.coordinate}
    });
    console.log('Drag Marker', e.nativeEvent.coordinate)
    this.getAddress(e.nativeEvent.coordinate)
    this.props.forms.addLocation.change_form('region', e.nativeEvent.coordinate)
  }

  render() {    
    const { forms } = this.props
    return (
      <Container>
        <KeyboardAwareScrollView contentContainerStyle={styles.bgContainer}>          
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={this.state.region}
              onRegionChangeComplete={this.onRegionChangeComplete}
              onPress={e => this.onMapPress(e)}
            >
              <Marker draggable
                coordinate={this.state.marker}
                onDragEnd={e => this.onMarkerDrag(e)}
              />
            </MapView>
          </View>
          
          <View style={{flex:1,  margin: 10}}>
            <ScrollView>
              <Label>Confirma tu dirección: </Label>
              <TextInput 
                returnKeyLabel='next'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius:10, paddingHorizontal: 10}}
                onChangeText={e => forms.addLocation.change_form('address', e)}
                value={forms.addLocation.address}
              />

              <Label>Detalles: </Label>
              <TextInput 
                placeholder={'Barrio, Apartamento, Interior'}
                placeholderTextColor={'rgba(0,0,0, 0.5)'}
                returnKeyLabel='next'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius:10, paddingHorizontal: 10}}
                onChangeText={e => forms.addLocation.change_form('address_details', e)}
              />

              <Label>Nombra tu dirección: </Label>
              <TextInput 
                placeholder={'Mi casa, Mi apto, Donde mi novi@'}
                placeholderTextColor={'rgba(0,0,0, 0.5)'}
                returnKeyLabel='next'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius:10, paddingHorizontal: 10}}
                onChangeText={e => forms.addLocation.change_form('address_name', e)}
              />

              <TouchableOpacity style={styles.btnLogin}
                onPress={() => {
                  forms.addLocation.save(this.props.navigation)
                }}>
                <Text style={styles.textLogin}>Guardar dirección</Text>
              </TouchableOpacity>
            </ScrollView>  
          </View>   
               
        </KeyboardAwareScrollView>
      </Container>
    )
  }

}

export default inject('forms')(observer(AddLocationScreen));

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
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
 });