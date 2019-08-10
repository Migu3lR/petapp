import { createStackNavigator } from 'react-navigation';

import ScheduleScreen from '../screens/Walk/Schedule';
import SelectPetScreen from '../screens/Walk/SelectPet';
import WalkTypeScreen from '../screens/Walk/WalkType';
import PaymentScreen from '../screens/Walk/Payment';

export default walkStack = createStackNavigator(
  { 
    Schedule: ScheduleScreen,
    SelectPet: SelectPetScreen,
    WalkType: WalkTypeScreen,
    Payment: PaymentScreen
  },
  {
    initialRouteName: 'Schedule',
  }
  );