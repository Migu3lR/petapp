import { types } from 'mobx-state-tree'
import Auth from '@aws-amplify/auth'

import UserData from './UserData'

const User = types.model('User',{
    userToken: types.optional(types.union(types.string,types.undefined), undefined), 
    userData: types.optional(UserData, {})
  })
  .actions(self => ({
    checkAuth() {
      Auth.currentAuthenticatedUser()
      .then(self.checkAuthSuccess, self.checkAuthError)
    },
    checkAuthSuccess(user) {
      self.set(
        user.signInUserSession.accessToken.jwtToken,
        user.attributes)
    },
    checkAuthError(error) {
      self.clear()
    },
    set(userToken, userdata) {
      self.userToken = userToken
      self.userData.set(userdata)
    },
    clear() {
      self.userToken = ''
      self.userData = {}
    }
  }))
    

export default User
