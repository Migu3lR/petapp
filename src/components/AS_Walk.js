import { ActionSheet } from 'native-base';
import { inject, observer } from 'mobx-react'

var BUTTONS = ["De inmediato", "Deseo programar un paseo", "Cancelar"];


const ActionSheet_Show = (navigation, forms) => {
  ActionSheet.show(
    {
      options: BUTTONS,
      title: '¿Cuando será el paseo de tu mascota?'
    },
    buttonIndex => {
      if (buttonIndex != 2) {
        forms.walk.change_form('walkNow', (buttonIndex == 0))
        navigation.navigate('WalkStack')        
      }
    }
  )
}

export default ActionSheet_Show