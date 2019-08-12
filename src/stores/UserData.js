import { types } from 'mobx-state-tree'

const UserData = types.model('UserData',{
    email_verified: types.string,
    username: types.string,
    sub: types.string
  })
  .actions(self => ({
  }))
    

export default UserData
