import { types } from 'mobx-state-tree'

const UserData = types.model('UserData',{
    email: types.optional(types.union(types.string,types.undefined), undefined),
    email_verified: types.optional(types.union(types.boolean,types.undefined), undefined),
    family_name: types.optional(types.union(types.string,types.undefined), undefined),
    given_name: types.optional(types.union(types.string,types.undefined), undefined),
    name: types.optional(types.union(types.string,types.undefined), undefined),
    sub: types.optional(types.union(types.string,types.undefined), undefined),
  })
  .actions(self => ({
    set(userdata) {
      console.log(userdata)
      self.email = userdata.email
      self.email_verified  = userdata.email_verified
      self.family_name = userdata.family_name
      self.given_name = userdata.given_name
      self.name = userdata.name
      self.sub  = userdata.sub
      
    }
  }))
    

export default UserData
