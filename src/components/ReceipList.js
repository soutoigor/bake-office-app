import React from 'react'
import { 
  Container, 
  Content, 
} from 'native-base';

import ListReceips from './ListReceips'

const ReceipList = () => {
  return (
    <Container>
      <Content>
          <ListReceips wasMade="made" />
        </Content>
    </Container>
  )
}

export default ReceipList
