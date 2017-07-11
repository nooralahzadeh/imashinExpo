'use strict';
import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Text } from 'native-base';
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";



export default class FooterTabs extends Component {
      render() {
          return (

                    <Footer >
                    <FooterTab>
                      <Button active={this.props.home} onPress={Actions.home}>
                        <Icon name="md-home" size={32} color="#e83737" />
                      </Button>
                        <Button active={this.props.list} onPress={Actions.productListLarge}>
                          <Icon name="ios-list" size={32} color="#e83737" />
                        </Button>
                        <Button active={this.props.add} onPress={Actions.productForm}>
                          <Icon name="ios-add-circle" size={32} color="#e83737" />
                        </Button>
                        <Button active={this.props.search} onPress={Actions.filter} >
                            <Icon  name="ios-search" size={32} color="#e83737" />
                        </Button>
                        <Button active={this.props.profile} onPress={Actions.profile}>
                            <Icon name="ios-person" size={32} color="#e83737" />
                        </Button>
                    </FooterTab>
                </Footer>

          );
      }
  }
