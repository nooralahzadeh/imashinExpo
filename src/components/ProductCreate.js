import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productUpdate, productCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ProductForm from './ProductForm';

class ProductCreate extends Component {
  onButtonPress() {
    const { title, price, thumbnail_image, image, url } = this.props;

    this.props.productCreate({ title, price, thumbnail_image: thumbnail_image,image, url  });
  }

  render() {
    return (
      <Card>
        <ProductForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { title, price, thumbnail_image, image, url } = state.productForm;

  return { title, price, thumbnail_image, image, url };
};

export default connect(mapStateToProps, {
  productUpdate, productCreate
})(ProductCreate);
