import { types } from 'mobx-state-tree'



const App = types.model('App',{
    enterApp: false
  })
  .actions(self => ({
    enterAppStatusChanged(enterApp){
      self.enterApp = enterApp
    }
  }))
    

export default App
