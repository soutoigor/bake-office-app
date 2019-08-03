import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { 
  Container, 
  Header, 
  Left, 
  Body, 
  Right, 
  Button, 
  Icon, 
  Title, 
  Segment, 
  Content, 
  Text 
} from 'native-base';

import { Actions } from 'react-native-router-flux'
import ListReceips from '../components/ListReceips'

const ReceiptList = () => {
  return (
    <Container>
      <Content>
          <ListReceips wasMade="made" />
        </Content>
    </Container>
  )
}

export default ReceiptList
