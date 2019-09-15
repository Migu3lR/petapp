import { types } from 'mobx-state-tree'

import OverPetReg from './OverPetReg'
import Walk from './Walk'
import Location from './LocationData'


const FormsStore = types.model('FormsStore',{
    overPetReg: types.optional(OverPetReg,{}),
    walk: types.optional(Walk,{}),
    addLocation: types.optional(Location,{}),
  })
  
    

export default FormsStore