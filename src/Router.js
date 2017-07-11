import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import ProductView from './components/ProductView';
import Home from "./components/Home";

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="home" component={Home} title="Home"/>
      <Scene key="main">
        <Scene
          onRight={() => Actions.productCreate()}
          rightTitle="Add"
          key="productList"
          component={ProductList}
          title="List"
        />
      <Scene key="productCreate" component={ProductCreate} title="Create Product"/>
        <Scene key="productEdit" component={ProductEdit} title="Edit Product" />
        <Scene key="productView" component={ProductView} title="View Product" />
      </Scene>

      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>

    </Router>
  );
};

export default RouterComponent;
