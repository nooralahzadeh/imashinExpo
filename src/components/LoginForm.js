import React, { Component } from 'react';

import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser,redirectFrom } from '../actions';
import { Container, Header, Content, Form, Item,
        Input, Label , Left, Body, Right,
        Button, Icon, Title,Spinner,
   Text} from 'native-base';
import {Actions} from "react-native-router-flux";


class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  onRegisterButtonPress(){
    this.props.redirectFrom('add');
    Actions.registerForm();
  }

  onPasswordRequestButtonPress(){
    this.props.redirectFrom('add');
    Actions.passwordRequest();
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner color='green' />;
    }

    return (
      <Button block  style={{margin:5}} onPress={this.onButtonPress.bind(this)}>
        <Text>ورود</Text>
      </Button>
    );
  }

  renderTitle(){
    var title=''
    if(this.props.from_to=='add'){
      title='احراز هویت';
    }
    else{
      title='ورود به پروفایل';
    }
  return(
      <Title>{title}</Title>
        );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
          <Button transparent>
            <Icon name='arrow-back' onPress={Actions.home} />
          </Button>
        </Left>
        <Body>
            {this.renderTitle()}
        </Body>
        <Right/>
      </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>ایمیل یا شماره موبایل</Label>
              <Input  onChangeText={this.onEmailChange.bind(this)} value={this.props.email}/>
              </Item>
              <Item floatingLabel last>
                <Label>رمز عبور</Label>
                <Input secureTextEntry onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}/>
              </Item>
            </Form>
            {this.renderButton()}
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
            <Button  block transparent info style={{margin:5}} onPress={this.onRegisterButtonPress.bind(this)}>
            <Text>کاربر جدید هستید؟ عضویت </Text>
            </Button>
            <Button block transparent danger style={{margin:5}} onPress={this.onPasswordRequestButtonPress.bind(this)}>
            <Text>رمز عبور را فراموش کرده اید ؟</Text>
            </Button>
             </Content>
           </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {

  const { email, password, error, loading, from_to} = auth;

  return { email, password, error, loading , from_to};
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, redirectFrom
})(LoginForm);
