import React, { Component } from 'react';

import { connect } from 'react-redux';
import {  phoneChanged, emailChanged, } from '../actions';
import { Container, Header, Content, Form, Item,
        Input, Label , Left, Body, Right,
        Button, Icon, Title,Spinner,
   Text} from 'native-base';
import {Actions} from "react-native-router-flux";


class PasswordRequest extends Component {

  onPhoneChange(text) {
    this.props.phoneChanged(text);
  }


  onEmailChange(text) {
    this.props.emailChanged(text);
  }


  onButtonPress() {
    const {phone, email} = this.props;
    //this.props.registerUser({ phone,email, });
  }

  renderButton() {
    console.log(this.props.error);
    if (this.props.loading) {
      return <Spinner color='green' />;
    }

    return (
      <Button block  style={{margin:5}} onPress={this.onButtonPress.bind(this)}>
        <Text>ارسال</Text>
      </Button>
    );
  }



  render() {
    return (
      <Container>
        <Header>
          <Left>
          <Button transparent>
            <Icon name='arrow-back' onPress={Actions.login} />
          </Button>
        </Left>
        <Body>
              <Title style={{fontSize: 14}}>درخواست رمز عبور</Title>
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

  const { phone,  email , error, loading, from_to} = auth;

  return { phone,  email , error, loading , from_to};
};

export default connect(mapStateToProps, {
  emailChanged , phoneChanged,
})(PasswordRequest);
