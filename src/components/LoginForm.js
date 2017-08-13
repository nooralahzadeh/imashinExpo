import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Container, Header, Content, Form, Item, Input, Label , Left, Body, Right, Button, Icon, Title} from 'native-base';

import {Spinner } from './common';

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

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>ورود به پروفایل</Title>
        </Body>
        <Right/>
      </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>نام کاربری</Label>
              <Input  onChangeText={this.onEmailChange.bind(this)} value={this.props.email}/>
              </Item>
              <Item floatingLabel last>
                <Label>رمز عبور</Label>
                <Input secureTextEntry onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}/>
              </Item>
                <Text style={styles.errorTextStyle}>
                  {this.props.error}
                </Text>
            </Form>
             </Content>
           </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
