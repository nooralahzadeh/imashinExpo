'use strict';
import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Text } from 'native-base';
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';


class FooterTabs extends Component {

  _onAddPress() {

    if (this.props.user== null){
      //Actions.productForm();
      Actions.login();
    } else {
       Actions.productForm();
    }
  };
      render() {
          return (

                    <Footer >
                    <FooterTab>
                      <Button active={this.props.home} onPress={Actions.home}>
                        <Icon name="md-home" size={32} color="#808080" />
                      </Button>
                        <Button active={this.props.list} onPress={Actions.productListLarge}>
                          <Icon name="ios-list" size={32} color="#808080"/>
                        </Button>
                        <Button active={this.props.add} onPress={this._onAddPress.bind(this)}>
                          <Icon name="ios-add-circle" size={32}color="#808080" />
                        </Button>
                        <Button active={this.props.search} onPress={Actions.filter} >
                            <Icon  name="ios-search" size={32} color="#808080" />
                        </Button>
                        <Button active={this.props.profile} onPress={Actions.profile}>
                            <Icon name="ios-person" size={32} color="#808080"/>
                        </Button>
                    </FooterTab>
                </Footer>

          );
      }
  }


  const mapStateToProps = ({auth}) => {
      const {user} =auth
      return {user}
  };

  export default connect(mapStateToProps)(FooterTabs);
