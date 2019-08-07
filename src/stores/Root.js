import { types } from 'mobx-state-tree'

import IotStore from './Iot'
import AuthStore from './Auth'
import AppStore from './App'
import FormsStore from './Forms'


const RootStore = types.model('RootStore',{
    iotStore: types.optional(IotStore,{}),
    authStore: types.optional(AuthStore,{}),
    appStore: types.optional(AppStore,{}),
    formsStore: types.optional(FormsStore,{}),
  })
  
    

export default RootStore