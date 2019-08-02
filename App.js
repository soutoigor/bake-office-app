import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from './src/screens/Home'
import WishList from './src/screens/WishList'
import ReceiptList from './src/screens/ReceiptList'
import Receipt from './src/screens/Receipt'
import RegisterReceipt from './src/screens/RegisterReceipt';
import ApiKeys from './src/constants/ApiKeys.js'
import * as firebase from 'firebase'
import * as Font from 'expo-font'

export default class App extends Component {
  constructor(props) {
    super(props)
    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.firebaseConfig)
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Cookie': require('./assets/fonts/Cookie-Regular.ttf'),
    })
  }

  render() {

  return (
    <Router>
      <Scene key="root">
        <Scene
          key="home"
          component={ Home }
          title="Home"
          hideNavBar={ true }
          initial
        />
        <Scene
          key="wishlist"
          component={ WishList }
          title="Wishlist"
        />
        <Scene
          key="receiptList"
          component={ ReceiptList }
          title="ReceiptList"
        />
        <Scene
          key="registerReceipt"
          component={ RegisterReceipt }
          title="Criar receita"
        />
        <Scene
          key="receipt"
          component={ Receipt }
          title="Receipt"
        />
      </Scene>
    </Router>
  )
}

}

