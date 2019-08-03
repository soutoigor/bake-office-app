import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import ListReceips from '../components/ListReceips'

const WishList = () => {
  return (
    <Container>
      <Content>
          <ListReceips wasMade="wish" />
        </Content>
    </Container>
  )
}

export default WishList