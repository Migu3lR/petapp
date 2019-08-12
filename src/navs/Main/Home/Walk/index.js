import { createStackNavigator } from 'react-navigation';

import ScheduleScreen from './Schedule';
import SelectPetScreen from './SelectPet';
import WalkTypeScreen from './WalkType';
import PaymentScreen from './Payment';

export default WalkStack = createStackNavigator(
  { 
    SelectPet: SelectPetScreen,
    Schedule: ScheduleScreen,    
    WalkType: WalkTypeScreen,
    Payment: PaymentScreen
  },
  {
    headerMode: 'none'
  }
);