import { types } from 'mobx-state-tree'

import OverPetReg from './OverPetReg'


const FormsStore = types.model('FormsStore',{
    overPetReg: types.optional(OverPetReg,{})
  })
  
    

export default FormsStore