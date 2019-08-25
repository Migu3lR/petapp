import { types } from 'mobx-state-tree'

import UserData from './UserData'
import Pet from './Pet'
import Location from './Location'

const User = types.model('User',{
    createdAt: types.number, 
    identityId: types.string,
    pets: types.array(Pet),
    user: types.maybe(UserData),
    locations: types.array(Location)
  })
  .actions(self => ({
  }))
    

export default User
