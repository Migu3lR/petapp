import { types } from 'mobx-state-tree'

import LocationData from './LocationData'

const Location = types.model('Location',{
    loc: types.maybe(LocationData)
  })
  .actions(self => ({
  }))
    

export default Location
