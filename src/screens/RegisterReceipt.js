import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

const RegisterReceipt = () => {
  return (
    <Container>
      <Content>
          <Text>
            RegisterReceipt Screen
          </Text>
          <Button
            full 
            onPress={ () => Actions.receipt() }
          >
            <Text>Receita</Text>
          </Button>
        </Content>
    </Container>
  )
}

export default RegisterReceipt
