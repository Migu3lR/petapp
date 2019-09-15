import React, {Component} from 'react';
import { Image, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import ScheduleScreen from './Schedule';
import SelectPetScreen from './SelectPet';
import WalkTypeScreen from './WalkType';
import LocationScreen from './Location';
import AddLocationScreen from './AddLocation';
import ResumeScreen from './Resume';


export default WalkStack = createStackNavigator(
  { 
    SelectPet: {
      screen: SelectPetScreen,
      navigationOptions: () => { return { headerTitle: 'Escoge tu mascota'} }
    },
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: () => { return { headerTitle: 'Programemoslo'} }
    },
    WalkType: {
      screen: WalkTypeScreen,
      navigationOptions: () => { return { headerTitle: 'Tipo de Paseo'} }
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: () => { return { headerTitle: 'Tu ubicación'} }
    },
    AddLocation: {
      screen: AddLocationScreen,
      navigationOptions: () => { return { headerTitle: 'Agregar ubicación'} }
    },
    Resume: {
      screen: ResumeScreen,
      navigationOptions: () => { return { headerTitle: 'Resumen'} }
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