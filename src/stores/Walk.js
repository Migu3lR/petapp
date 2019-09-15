import * as Mobx from 'mobx'
import { types, flow, getRoot } from 'mobx-state-tree'
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from "native-base";
import Geolocation from 'react-native-geolocation-service';

import * as ApiGateway from '../lib/api-gateway';
import * as Cognito from '../lib/aws-cognito';
import * as IoT from '../lib/aws-iot';
import Region from './Region'

const Walk = types.model('Walk',{
    walkNow: true,
    petIndex: types.maybe(types.number),
    schedule: types.optional(types.string, ''),
    walkType: types.optional(types.string, ''),
    payment: types.optional(types.string, ''),
    locationIndex: types.maybe(types.number),
  })
  .actions(self => ({
    change_form(field, e) {
      self[field] = e;
    },
    clear_form(){
      self.walkNow =  true
      self.petIndex =  undefined
      self.schedule =  ''
      self.walkType =  ''
      self.payment =  ''

    },
    select_pet(pet) {
      self.petIndex = getRoot(self).authStore.user.pets.findIndex(e => e.pet == pet)
    },
    select_location(location) {
      self.locationIndex = getRoot(self).authStore.user.locations.findIndex(e => e.loc == location)
    },
    validate_form(){
      let err = 0
      let mss = ''

      if (self.region == undefined || self.region == null) err = 1
      if (self.address == '') err = 2
      if (self.address_name == '' ) err = 3
        
      
      switch (err) {
        case 1:
          mss = 'No pudimos encontrar tu ubicación por GPS, por favor activa el servicio y danos permiso.'
          break;
        case 2:
          mss = 'Debes colocar una dirección'
          break;
        case 3:
          mss = 'Dale un nombre valido a tu dirección'
          break;
        default:
          break;
      }

      if (err != 0) {
        Toast.show({
          text: mss,
          type: "danger"
        })
        return false
      }

      return true
    },
    save(){
      /*if (!self.validate_form()){
        const pet = {
          tipo : self.tipo
          ,nombre : self.nombre
          ,edad : self.edad
          ,raza : self.raza
          ,size : self.size
        }
        self.clear_form();
        ApiGateway.newLocation({...pet})
        .then((User) => {
          getRoot(self).authStore.USER_UPDATED(User);
          alert(`¡Los datos de tu mascota ${pet.nombre} se guardaron correctamente!` )
        });
      }*/
    }

  }))
    

export default Walk