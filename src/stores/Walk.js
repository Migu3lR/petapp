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
    region: types.maybe(Region),
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
    setRegion(reg) {
      console.log(reg)
      self.region = {
        latitudeDelta: reg.latitudeDelta,
        longitudeDelta: reg.longitudeDelta,
        latitude: reg.latitude,
        longitude: reg.longitude,
      }
    },
    setCurrentLocation() {
      Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            self.setRegion(
              {
                latitudeDelta: Math.abs(position.coords.latitude / 5000),
                longitudeDelta: Math.abs(position.coords.longitude / 5000),
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                
              }
            )
            return self.region
            console.log(Mobx.toJS(self.region))
        },
        (error) => {
            console.log(error.code, error.message);
            return null
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    },
    select_pet(pet) {
      self.petIndex = getRoot(self).authStore.user.pets.findIndex(e => e.pet == pet)
    },
    validate_form(){
      let err = 0
      let mss = ''

      /*if (self.size == '' ) err = 4
      if (self.edad == '') err = 3
      if (self.nombre == '' ) err = 2
      if (self.tipo == '' ) err = 1*/
        
      
      switch (err) {
        case 1:
          mss = 'Escoge un tipo de mascota'
          break;
        case 2:
          mss = 'Debes colocar un nombre a tu mascota'
          break;
        case 3:
          mss = '¿Qué edad tiene tu mastoca?'
          break;
        case 4:
          mss = 'Por favor, coloca un tamaño valido'
          break;
        default:
          break;
      }

      if (err != 0) {
        Toast.show({
          text: mss,
          type: "danger"
        })
        alert('Los campos marcados con * son obligatorios. :)')
        return err
      }

      return null
    },
    save(){
      /*if (!self.validate_form()){
        getRoot(self).authStore.PetReg_Visible(false);
        const pet = {
          tipo : self.tipo
          ,nombre : self.nombre
          ,edad : self.edad
          ,raza : self.raza
          ,size : self.size
        }
        self.clear_form();
        ApiGateway.newPet({...pet})
        .then((User) => {
          getRoot(self).authStore.USER_UPDATED(User);
          alert(`¡Los datos de tu mascota ${pet.nombre} se guardaron correctamente!` )
        });
      }*/
    }

  }))
    

export default Walk