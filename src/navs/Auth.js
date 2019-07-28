import { createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/Auth/SignIn';
import SignUpScreen from '../screens/Auth/SignUp';
import ForgotPwdScreen from '../screens/Auth/ForgotPwd'

export default AuthStack = createStackNavigator(
  { 
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ForgotPwd: ForgotPwdScreen
  },
  {
    headerMode: 'none'
  }
  );