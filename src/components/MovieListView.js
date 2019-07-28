import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  ListView,
  TouchableHighlight
} from 'react-native';



export default class listViewMovie extends Component{
    constructor(){
      super()
      
      var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
  
      this.state = {
        dataSource: ds.cloneWithRows([])
      }
      
    }
  
    componentDidMount(){
      var titles = [];
      fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
          var movies = responseJson.movies;
          for(var i = 0; i < movies.length; i++){
            titles.push(movies[i].title);
          }
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(titles)
          })
        })
    }
  
    pressCell(dataRow){
      this.props.navigator.push({
        id: 'newView',
        dataRow
      })
    }
  
    render() {
      return (
        <View style={styles.container}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      );
    }
    
    renderRow(dataRow){
      
      return (
        <TouchableHighlight onPress={() => this.pressCell(dataRow)}>
          <View style={styles.cell}>
            <Text>
              {dataRow}
            </Text>
          </View>
        </TouchableHighlight>
      )
      
    }
  
  }