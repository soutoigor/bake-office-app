import React from 'react'
import { StyleSheet } from 'react-native'
import { 
  Container, 
  Content, 
  Text, 
  Card,
  CardItem,
  Body,
  Icon,
} from 'native-base'
import { Actions } from 'react-native-router-flux'

const Home = () => {
  return ( 
    <Container
      class={ styles.cardItems }              
    >
      <Content>
          <Text>
            Bake Office 
          </Text>
          
          <Card
          >
            <CardItem
              button
              onPress={ () => Actions.receiptList() }
            >
              <Body>
                <Icon type="FontAwesome" name="book" />
                <Text>Lista de receitas</Text>
              </Body>
            </CardItem>
          </Card>
          <Card 
          >
            <CardItem
              button
              onPress={ () => Actions.wishlist() }
              class={ styles.cardItems }          
            >
              <Body>
                <Icon 
                  type="FontAwesome" 
                  name='history'
                  style={{ transform: [{ scaleX: -1 }] }}
                />
                <Text>Futuras receitas</Text>
              </Body>
            </CardItem>
          </Card>
          <Card 
          >
            <CardItem
              button
              onPress={ () => Actions.registerReceipt() }
            >
              <Body>
                <Icon type="FontAwesome" name='edit' />
                <Text>Criar Receita</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  p: {
    color: '#fff',
    fontSize: 30
  },
  homeBtn: {
    width: '70vw',
    height: '40px',
  },
  cardItems: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})


export default Home