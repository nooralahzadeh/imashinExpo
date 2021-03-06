import React, { Component } from 'react';

import { connect } from 'react-redux';
import { namesChanged, phoneChanged, emailChanged, passwordChanged, loginUser , registerUser} from '../actions';
import { Container, Header, Content, Form, Item,
        Input, Label , Left, Body, Right,
        Button, Icon, Title,Spinner,
   Text} from 'native-base';
import {Actions} from "react-native-router-flux";


class RegisterFrom extends Component {

  onPhoneChange(text) {
    this.props.phoneChanged(text);
  }

  onNamesChange(text) {
    this.props.namesChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const {phone, email, password , names} = this.props;
    this.props.registerUser({ phone,email, password, names });
  }

  renderButton() {
    console.log(this.props.error);
    if (this.props.loading) {
      return <Spinner color='green' />;
    }

    return (
      <Button block  style={{margin:5}} onPress={this.onButtonPress.bind(this)}>
        <Text>ثبت نام</Text>
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
              <Title>عضویت در سایت</Title>
        </Body>
        <Right/>
      </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>شماره موبایل</Label>
              <Input  onChangeText={this.onPhoneChange.bind(this)} value={this.props.phone}/>
              </Item>
              <Item floatingLabel last>
                <Label>رمز عبور</Label>
                <Input secureTextEntry onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}/>
              </Item>
              <Item floatingLabel last>
                <Label>نام و نام خانوادگی</Label>
                <Input  onChangeText={this.onNamesChange.bind(this)} value={this.props.names}/>
              </Item>
              <Item floatingLabel last>
                <Label>ایمیل</Label>
                <Input  onChangeText={this.onEmailChange.bind(this)} value={this.props.email}/>
              </Item>
            </Form>
            {this.renderButton()}
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
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

  const { phone, names, email, password, error, loading, from_to} = auth;

  return { phone, names, email, password, error, loading , from_to};
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser, phoneChanged, namesChanged
})(RegisterFrom);
