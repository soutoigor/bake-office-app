import React, { Component } from 'react'
import { 
  StyleSheet, 
  Dimensions,
  Image,
} from 'react-native'
import { Container, View, Button, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

const Receipt = () => {
  const window = Dimensions.get('window')

  return (
    <Container
      style={ Styles.container }
    >
      <Image
        source={ require('../../assets/bg-notepad.jpg') } 
        style={{
          flex: 1,
          resizeMode: 'cover',
          width: window.width,
          height: window.height,
          position: 'absolute',
          justifyContent: 'center',
        }}
      />
      <View
        style={ Styles.containerRows }
      >
        <View
          style={ Styles.containerItem }
        >
          <Text
            style={ Styles.title }
          >
           Miojo 
          </Text>
        </View>
        <View
          style={ Styles.containerItem }        
        >
          <Image 
            source={ require('../../assets/example-food.jpg') }
            style={ Styles.receipImage }
          />
        </View>
      </View>
          <Button
            full
            onPress={ () => Actions.receipt() }
          >
            <Text>Receita</Text>
          </Button>
    </Container>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: '20%',
  },
  containerRows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  containerItem: {
    flex: 1,
    width: '40%',
    marginHorizontal: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  receipImage: {
    width: 115,
    height: 115,
  },
})

export default Receipt
