import { StyleSheet, Dimensions } from 'react-native';

const { width: WIDTH} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titulo: {
    textAlign: 'center',
    paddingBottom:10
  },
  vwServicios: {
    flex:1,
    alignContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection:'row',
    justifyContent:'space-around', 
  
  },
  btServicio: {
    marginHorizontal: 20,
    marginVertical: 10

  },
  thumbServicio: {
    height: 120, 
    width: 120, 
    borderRadius: 120,
  },
  txtServicio: {
    textAlign: 'center'
  },
});

export default styles;
