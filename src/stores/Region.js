import { types } from 'mobx-state-tree'

const Region = types.model('Region',{
    latitudeDelta: types.optional(types.number, 0.0),
    longitudeDelta: types.optional(types.number, 0.0),
    latitude: types.optional(types.number, 0.0),
    longitude: types.optional(types.number, 0.0),
  })
  .actions(self => ({
    setRegion(reg) {
      self.latitudeDelta = reg.latitudeDelta
      self.longitudeDelta = reg.longitudeDelta
      self.latitude = reg.latitude
      self.longitude = reg.longitude
    }
  }))
    

export default Region
