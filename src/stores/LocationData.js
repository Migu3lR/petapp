import { types } from 'mobx-state-tree'

const LocationData = types.model('LocationData',{
    edad: types.string,
    nombre: types.string,
    raza: types.maybe(types.string),
    size: types.string,
    tipo: types.string
  })
  .actions(self => ({
  }))
    

export default LocationData
