import { types } from 'mobx-state-tree'

import UserData from './UserData'
import Pet from './Pet'

const User = types.model('User',{
    createdAt: types.number, 
    identityId: types.string,
    pets: types.array(Pet),
    user: types.maybe(UserData)
  })
  .actions(self => ({
  }))
    

export default User
