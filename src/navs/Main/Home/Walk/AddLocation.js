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
  Body } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import Icon from 'react-native-vector-icons/Ionicons'
import { SocialIcon } from 'react-native-elements'
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from  'react-native-maps';

import { inject, observer } from 'mobx-react'
import * as Mobx from 'mobx'

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
      markers: []
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
          this.setState({region: {
            latitudeDelta: Math.abs(position.coords.latitude / 5000),
            longitudeDelta: Math.abs(position.coords.longitude / 5000),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude, 
          }})
      },
      (error) => {
          console.log(error.code, error.message);
          this.setState({
            region: {
              latitude: -74,
              longitude: 4,
              latitudeDelta: Math.abs(-74 / 5000),
              longitudeDelta: Math.abs(4 / 5000),
            }
          })
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    console.log(location)
  }


  async componentDidMount(){
    await this.requestLocationPermission()
    this.getCurrentLocation() 
  }

  onRegionChangeComplete = region => {
    this.setState({ region })
    console.log('onRegionChangeComplete', region)
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
        },
      ],
    });
  }

  render() {    
    const { forms } = this.props
    console.log(this.state.region)
    return (
      
     
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChangeComplete}
            onPress={e => this.onMapPress(e)}
          >
            {this.state.markers.map(marker => (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
                draggable
              />
            ))}

          </MapView>
        </View>
      
    )
  }

}

export default inject('forms')(observer(AddLocationScreen));

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });