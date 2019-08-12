import { types } from 'mobx-state-tree'

const PetData = types.model('PetData',{
    edad: types.string,
    nombre: types.string,
    raza: types.maybe(types.string),
    size: types.string,
    tipo: types.string
  })
  .actions(self => ({
  }))
    

export default PetData
