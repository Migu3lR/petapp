import { types } from 'mobx-state-tree'

import OverPetReg from './OverPetReg'
import Walk from './Walk'


const FormsStore = types.model('FormsStore',{
    overPetReg: types.optional(OverPetReg,{}),
    walk: types.optional(Walk,{})
  })
  
    

export default FormsStore