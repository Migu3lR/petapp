import { types } from 'mobx-state-tree'

import IotStore from './Iot'
import AuthStore from './Auth'
import AppStore from './App'


const RootStore = types.model('RootStore',{
    iotStore: types.optional(IotStore,{}),
    authStore: types.optional(AuthStore,{}),
    appStore: types.optional(AppStore,{}),
  })
  
    

export default RootStore