import React, { Component } from 'react'
import { 
  StyleSheet, 
  Dimensions,
  Image,
  Alert,
} from 'react-native'
import { 
  Container, 
  View,
  Text,
  Content,
  Button, 
  Icon,
} from 'native-base'
import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export default class Receip extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async deleteReceip(id) {
    try { 
      await firebase.database().ref(`receips/${id}`).remove()
      Alert.alert('Receita excluída com sucesso.')
      Actions.receipList()
    } catch(err) {
      Alert.alert('Erro ao excluir')
    }
  }
  
  render() {
    const window = Dimensions.get('window')
    const selectedReceip = this.props.selectedReceip
    const renderIngredients = selectedReceip.ingredients.map((ingredient, index) => {
      return (
        <View 
          style={ Styles.listsContainer }  
          key={index}
        >
          <Icon
            style={ Styles.dotIcon } 
            type="FontAwesome" 
            name="circle" 
          />
          <Text>{ ingredient }</Text>
        </View>
      )
    })
    const renderDirections = selectedReceip.directions.map((direction, index) => {
      return (
        <View 
          style={ Styles.listsContainer }  
          key={index}
        >
          <Icon
            style={ Styles.dotIcon } 
            type="FontAwesome" 
            name="circle" 
          />
          <Text>{ direction }</Text>
        </View>
      )
    })
    const renderMadeBy = () => {
      if (!selectedReceip.madeBy) return (
        <View>
          <Text>Receita ainda não foi feita.</Text>
        </View>
      )
      return selectedReceip.madeBy.map((person) => {
        return (
          <View 
            style={ Styles.listsContainer }  
            key={person.id}
            >
            <Icon
              style={[ Styles.dotIcon, { fontSize: 10 } ]} 
              type="FontAwesome" 
              name="star" 
              />
            <Text>{ person.name }</Text>
          </View>
        )
      })
    }
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
        <Content
          style={{ width: window.width }}
        >
          <View>
            <Text
              style={ Styles.receipTitle }
              >
                { selectedReceip.name } 
            </Text>
          </View>
          <View style={ Styles.receipInfosRow }>
            <View style={ Styles.receipInfosItem }>
              <Text style={ Styles.subTitle }>
                Tempo de preparo 
              </Text>
              <Text>{ selectedReceip.duration } Min</Text>
            </View>
            <View style={ Styles.receipInfosItem }>
              <Text style={ Styles.subTitle }>
                Rendimento 
              </Text>
              <Text>{ selectedReceip.portions } Porções</Text>
            </View>
          </View>
          <View>
            <Text style={ Styles.title }>Ingredientes:</Text>
            { renderIngredients }
          </View>
          <View>
            <Text style={ Styles.title }>Modo de preparo:</Text>
            { renderDirections }
          </View>
          <View>
            <Text 
              style={ Styles.title }
            >
              Feito por:
            </Text>
            { renderMadeBy() }
          </View>
          <View style={ Styles.btnGroup }>
            <Button 
              info
              block
              onPress={ () => Actions.saveReceip({ receipToEdit: selectedReceip }) }
            >
              <Text>Editar</Text>
            </Button>
            <Button 
              onPress={ () => this.deleteReceip(selectedReceip.object_key) }
              danger
              block
            >
              <Text>Excluir</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  receipTitle: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Cookie',
    marginTop: 25,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Cookie',
    marginTop: 20,
    marginLeft: 25,
  },
  subTitle: {
    fontSize: 25,
    fontFamily: 'Cookie',
  },
  receipInfosRow: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20,
  },
  receipInfosItem: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 25,
  },
  listsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 50,
    width: '80%',
  },
  dotIcon: {
    fontSize: 5,
    marginRight: 5,
  },
  btnGroup: {
    marginTop: 30,
  }
})
