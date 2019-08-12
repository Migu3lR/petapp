import React, {Component} from 'react';
import { Image, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ScheduleScreen from './Schedule';
import SelectPetScreen from './SelectPet';
import WalkTypeScreen from './WalkType';
import PaymentScreen from './Payment';


export default WalkStack = createStackNavigator(
  { 
    SelectPet: {
      screen: SelectPetScreen,
      navigationOptions: () => { return { headerTitle: 'Escoge una mascota'} }
    },
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: () => { return { headerTitle: 'Programemoslo'} }
    },
    WalkType: {
      screen: WalkTypeScreen,
      navigationOptions: () => { return { headerTitle: 'Tipo de Paseo'} }
    },
    Payment: {
      screen: PaymentScreen,
      navigationOptions: () => { return { headerTitle: '¿Cómo pagaras?'} }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <Text style={{ paddingRight: 10 }} onPress={() => navigation.navigate('Home')}>
            Cancelar
          </Text>
        )
      }
    }
  }
);