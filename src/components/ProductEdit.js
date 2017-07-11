import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import ProductForm from './ProductForm';
import { productUpdate, productSave, productDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ProductEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.product, (value, prop) => {
      this.props.productUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { title, price, thumbnail_image, image, url } = this.props;

    this.props.productSave({ title, price, thumbnail_image, image, url , uid: this.props.product.uid });
  }

  onTextPress() {
    const { price, thumbnail_image , image, url} = this.props;

    Communications.text(price, `Your upcoming thumbnail_image is on ${thumbnail_image}`);
  }

  onAccept() {
    const { uid } = this.props.product;

    this.props.productDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <ProductForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Delete Product
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}



const mapStateToProps = (state) => {
  const { title, price, thumbnail_image, image, url } = state.productForm;

  return { title, price, thumbnail_image, image, url };
};

export default connect(mapStateToProps, {
  productUpdate, productSave, productDelete
})(ProductEdit);
