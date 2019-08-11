import { ActionSheet } from 'native-base';

var BUTTONS = ["De inmediato", "Deseo programar un paseo", "Cancelar"];


export default ActionSheet_Show = (navigation) => {
  ActionSheet.show(
    {
      options: BUTTONS,
      title: '¿Cuando será el paseo de tu mascota?'
    },
    buttonIndex => {
      if (buttonIndex === 0) navigation.navigate('walkNowStack')
      if (buttonIndex === 1) navigation.navigate('walkSchedStack')
    }
  )
}