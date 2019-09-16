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
    petIndex: types.maybeNull(types.number),
    schedule: types.maybeNull(types.string),
    walkType: types.maybeNull(types.string),
    payment: types.maybeNull(types.string),
    locationIndex: types.maybeNull(types.number),
  })
  .actions(self => ({
    change_form(field, e) {
      self[field] = e;
    },
    clear_form(){
      self.walkNow =  true
      self.petIndex =  null
      self.locationIndex = null
      self.schedule =  null
      self.walkType =  null
      self.payment =  null

    },
    select_pet(pet) {
      self.petIndex = getRoot(self).authStore.user.pets.findIndex(e => e.pet == pet)
    },
    select_location(location) {
      self.locationIndex = getRoot(self).authStore.user.locations.findIndex(e => e.location == location)
    },
    validate_form(){
      /*let err = 0
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
      }*/
      
      return true
    },
    save(){
      if (self.validate_form()){
        const work = {
          walkNow: self.walkNow,
          schedule: self.schedule,
          walkType: self.walkType,
          payment: self.payment,
          pet: getRoot(self).authStore.user.pets[self.petIndex].pet,
          location: getRoot(self).authStore.user.locations[self.locationIndex].location,
        }
        console.log(work)
        getRoot(self).iotStore.pub('srv/works/newWork',work)
      }
    }

  }))
  .views(self =>({
    walk_type: () => {
      const walks = [
        {
          id: 'V1H',
          title: 'Paseo VIP 1H',
          desc: 'Un paseo privado para tu mascota de 1 hora',
          min_price: 10000,
          max_price: 20000
        },
        {
          id: 'V2H',
          title: 'Paseo VIP 2H',
          desc: 'Un paseo privado para tu mascota de 2 horas',
          min_price: 20000,
          max_price: 30000
        },
        {
          id: 'G1H',
          title: 'Paseo Grupal 1H',
          desc: 'Un paseo grupal (4-5 caninos) de 1 hora',
          min_price: 5000,
          max_price: 10000
        },
        {
          id: 'G2H',
          title: 'Paseo Grupal 2H',
          desc: 'Un paseo grupal (4-5 caninos) de 2 hora',
          min_price: 10000,
          max_price: 20000
        }
      ]

      return walks.filter(e => e.id == self.walkType)[0]
    },
  }));
    

export default Walk