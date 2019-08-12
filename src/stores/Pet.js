import { types } from 'mobx-state-tree'

import PetData from './PetData'

const Pet = types.model('Pet',{
    pet: types.maybe(PetData)
  })
  .actions(self => ({
  }))
    

export default Pet
