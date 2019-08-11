import { createStackNavigator } from 'react-navigation';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import ForgotPwdScreen from './ForgotPwd'

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