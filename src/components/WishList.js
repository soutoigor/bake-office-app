import React from 'react'
import { Container, Content, Text } from 'native-base'
import ListReceips from './ListReceips'

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