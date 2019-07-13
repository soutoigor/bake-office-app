import React from 'react'
import { 
  StyleSheet, 
  Dimensions,
  Image,
} from 'react-native'
import { 
  Container, 
  Text, 
  Card,
  CardItem,
  Body,
  Icon,
  View,
} from 'native-base'
import { Actions } from 'react-native-router-flux'

const Home = () => {
  const window = Dimensions.get('window')

  return ( 
    <Container
      style={ HomeStyle.container }  
    >
    <Image
      source={ require('../../assets/bg-home.jpg') } 
      style={{
        flex: 1,
        resizeMode: 'cover',
        width: window.width,
        height: window.height,
        position: 'absolute',
        justifyContent: 'center',
       }}
    />
      <View>
          <Text
            style={ HomeStyle.title }
          >
            Bake Office 
          </Text>
      </View>
        <View
          style={ HomeStyle.cardsContainer }
        >      
          <Card
            style={ HomeStyle.cards }
            >
            <CardItem
              button
              rounded
              style={ HomeStyle.cardItem }
              onPress={ () => Actions.receiptList() }
              >
                <Body
                  style={ HomeStyle.cardContent }
                >
                <Icon type="FontAwesome" name="book" />
                <Text style={ HomeStyle.cardFont }>Lista de receitas</Text>
              </Body>
            </CardItem>
          </Card>
          <Card
            style={ HomeStyle.cards }
            >
            <CardItem
              button
              rounded
              style={ HomeStyle.cardItem }
              onPress={ () => Actions.wishlist() }
            >
                <Body
                  style={ HomeStyle.cardContent }
                >                
                <Icon 
                  type="FontAwesome" 
                  name='history'
                  style={{ transform: [{ scaleX: -1 }] }}
                />
                <Text style={ HomeStyle.cardFont }>Futuras receitas</Text>
              </Body>
            </CardItem>
          </Card>
          <Card
            style={ HomeStyle.cards }
            >
            <CardItem
              button
              rounded
              style={ HomeStyle.cardItem }
              onPress={ () => Actions.registerReceipt() }
            >
                <Body
                  style={ HomeStyle.cardContent }
                >               
                <Icon type="FontAwesome" name='edit' />
                <Text style={ HomeStyle.cardFont }>Criar Receita</Text>
              </Body>
            </CardItem>
          </Card>
        </View>
    </Container>
  )
}

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#fff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    textShadowColor: '#000',
  },
  cardsContainer: {
    flexDirection: 'column',
    position: 'relative',
    top: 40,
  },
  cardContent: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  cards: {
    width: 175,
    height: 80,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
  },
  cardFont: {
    fontWeight: '600',
  },
  cardItem: {
    backgroundColor: 'transparent',
  },
})


export default Home