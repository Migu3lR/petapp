import React, {Component} from 'react';
import LucyChat from "./LucyChat.js";
import JadeChat from "./JadeChat.js";
import NineChat from "./NineChat.js";
import { createBottomTabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

export default MainScreenNavigator = createBottomTabNavigator(
  {
    LucyChat: { screen: LucyChat },
    JadeChat: { screen: JadeChat },
    NineChat: { screen: NineChat }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              onPress={() => props.navigation.navigate("LucyChat")}>
              <Icon name="bowtie" />
              <Text>Lucy</Text>
            </Button>
            <Button
              vertical
              onPress={() => props.navigation.navigate("JadeChat")}>
              <Icon name="briefcase" />
              <Text>Jade</Text>
            </Button>
            <Button
              vertical
              onPress={() => props.navigation.navigate("NineChat")}>
              <Icon name="headset" />
              <Text>Nine</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);
