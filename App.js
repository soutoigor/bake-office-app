import React from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from './src/screens/Home'
import WishList from './src/screens/WishList'
import ReceiptList from './src/screens/ReceiptList'
import Receipt from './src/screens/Receipt'
import RegisterReceipt from './src/screens/RegisterReceipt';

export default function App() {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="home"
          component={ Home }
          title="Home"
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
          title="RegisterReceipt"
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

