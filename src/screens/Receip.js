import React, { Component } from 'react'
import { 
  StyleSheet, 
  Dimensions,
  Image,
} from 'react-native'
import { 
  Container, 
  View, 
  Text,
  Content,
  Button, 
} from 'native-base'

export default class Receip extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
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
            { this.props.selectedReceip.name } 
            </Text>
          </View>
          <View
            style={ Styles.containerItem }
            >
            <Button
              small
              info
            >
              <Text>Editar</Text>
            </Button>
            <Button
              small
              danger
            >
              <Text>Excluir</Text>
            </Button>
          </View>
        </View>
      </Container>
    )
  }

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
    fontSize: 32,
    fontFamily: 'Cookie',
    marginLeft: 10,
  },
  receipImage: {
    width: 115,
    height: 115,
  },
})
