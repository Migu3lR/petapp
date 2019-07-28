import React, {Component} from 'react';
import { Image, ImageBackground } from 'react-native'
import { Container, Content, Text, List, ListItem } from 'native-base'

const routes = ['Home', 'Chat'];

export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            source={require('../../images/Cover.png')}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Image
              square
              style={{ height: 80, width: 80 }}
              source={require('../../images/logo.png')}
            />
          </ImageBackground>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                    <Text>{data}</Text>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    )
  }
}