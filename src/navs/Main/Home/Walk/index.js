import { createStackNavigator } from 'react-navigation';

import ScheduleScreen from './Schedule';
import SelectPetScreen from './SelectPet';
import WalkTypeScreen from './WalkType';
import PaymentScreen from './Payment';

export const walkSchedStack = createStackNavigator(
  { 
    Schedule: ScheduleScreen,
    SelectPet: SelectPetScreen,
    WalkType: WalkTypeScreen,
    Payment: PaymentScreen
  },
  {
    headerMode: 'none'
  }
);

export const walkNowStack = createStackNavigator(
  { 
    SelectPet: SelectPetScreen,
    WalkType: WalkTypeScreen,
    Payment: PaymentScreen
  },
  {
    headerMode: 'none'
  }
);