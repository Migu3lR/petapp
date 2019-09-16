import { types, flow, getRoot } from 'mobx-state-tree'

import Region from './Region'
import { Toast } from "native-base";

import * as ApiGateway from '../lib/api-gateway';

const LocationData = types.model('LocationData',{
    region: types.maybe(Region),
    address: types.optional(types.string, ''),
    address_details: types.optional(types.string, ''),
    address_name: types.optional(types.string, ''),
  })
  .actions(self => ({
    change_form(field, e) {
      self[field] = e;
    },
    clear_form(){
      self.region =  undefined
      self.address =  ''
      self.address_details =  ''
      self.address_name =  ''
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
    save(navigation){
      if (self.validate_form()){
        const location = {
          region : self.region
          ,address : self.address
          ,address_name : self.address_name
          ,address_details : self.address_details
        }
        console.log(location)
        self.clear_form();
        ApiGateway.addLocation({...location})
        .then((User) => {
          getRoot(self).authStore.USER_UPDATED(User);
          alert(`¡Los datos de tu nueva direccion ${location.address_name} se guardaron correctamente!` )
          navigation.navigate('Location')
        });
      }
    }
  }))
    

export default LocationData
