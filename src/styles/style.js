import { 
  StyleSheet
 } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'white',
    marginVertical: 10
  },
  icon: {
    width: 24,
    height: 24,
  },
  home: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center"
  },
  containerDetails: {
    paddingTop: 80
  },
  cell: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
});
