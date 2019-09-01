import React, { Component } from 'react'
import { 
  StyleSheet, 
  Dimensions,
  FlatList,
  Alert,
  Modal,
} from 'react-native'
import { 
  Container, 
  View, 
  Button, 
  Content, 
  Form,
  Item,
  Input,
  Label,
  Text,
  ListItem,
  SwipeRow,
  Icon,
  Body,
  CheckBox,
} from 'native-base'
import moment from 'moment'
import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { includes } from 'ramda'

const window = Dimensions.get('window')
export default class RegisterReceipt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemToEdit: null,
      modalVisible: false,
      receipName: '',
      ingredients: [],
      newIngredient: '',
      directions: [],
      newDirection: '',
      duration: '',
      portions: '',
      madeAt: '',
      madeBy: [],
      receipType: null,
      receipHasBeenMade: false,
      cookies: [
        {
          name: 'Igor Souto',
          id: 1,
          checked: false,
        },
        {
          name: 'Giovanna Oliveira',
          id: 2,
          checked: false,
        },
        {
          name: 'Isabella Gervazio',
          id: 3,
          checked: false,
        },
      ],
    }
  }

  toggleSwitch = (value) => {
    this.setState({ receipHasBeenMade: value })
  }

  clearFields() {
    this.setState({ receipName: '' })
    this.setState({ ingredients: [] })
    this.setState({ duration: '' })
    this.setState({ directions: [] })
    this.setState({ portions: '' })
    this.setState({ madeAt: '' })
    this.setState({ madeBy: [] })
    this.setState({ receipHasBeenMade: false })
    this.setState({ receipType: false })
  }
  
  _keyExtractor = item => item

  fillFields(receip) {
    this.setState({ receipName: receip.name })
    this.setState({ ingredients: receip.ingredients })
    this.setState({ duration: receip.duration })
    this.setState({ directions: receip.directions })
    this.setState({ portions: receip.portions })
    this.setState({ madeAt: receip.madeAt })
    this.setState({ receipHasBeenMade: receip.madeAt ? true : false })
    this.setState({ receipType: receip.receipType })
    this.setState({ cookies: this.state.cookies.map((cooker) => {
        delete cooker.checked
        return {
          ...cooker,
          checked:  includes({ id: cooker.id, name: cooker.name }, receip.madeBy) ? true : false,
        }
      })
    })
  }
  
  componentWillMount() {
    if (this.props.receipToEdit) this.fillFields(this.props.receipToEdit)
  }

  componentWillUnmount() {
    delete this.props.receipToEdit
  }

  
  render() {
    const addIngredient = () => {
      if (this.state.newIngredient.length <= 2) return
      this.state.ingredients.push(this.state.newIngredient)
      this.setState({newIngredient: ''})
    }
    const deleteIngredient = (ingredientToDelete) => {
      const index = this.state.ingredients.indexOf(ingredientToDelete)
      this.state.ingredients.splice(index, 1)
      this.setState(this.state)
    }
    const addDirection = () => {
      if (this.state.newDirection.length <= 2) return
      this.state.directions.push(this.state.newDirection)
      this.setState({newDirection: ''})
    }
    const deleteDirection = (directionToDelete) => {
      const index = this.state.directions.indexOf(directionToDelete)
      this.state.directions.splice(index, 1)
      this.setState(this.state)
    }
    const validateReceip = (receip) => {
      let logErrors = []
      if (!receip.name) logErrors.push('Preencha o nome da receita')
      if (!receip.ingredients.length) logErrors.push('Preencha os ingredientes')
      if (!receip.directions.length) logErrors.push('Preencha o modo de preparo')
      if (!receip.duration) logErrors.push('Preencha a duração da receita')
      if (!receip.portions) logErrors.push('Preencha a quantidade de porções')
      if (receip.madeAt && !receip.madeBy.length) logErrors.push('Preencha os autores da receita')
      return logErrors
    }

    const saveReceip = async () => {
      const receip = {
        name: this.state.receipName,
        ingredients: this.state.ingredients,
        directions: this.state.directions,
        duration: this.state.duration,
        portions: this.state.portions,
        madeAt: this.state.receipHasBeenMade
         ? moment().format('YYYY-MM-DD HH:mm')
         : null,
        madeBy: this.state.receipHasBeenMade
        ? this.state.cookies.filter(cooker => {
          if (cooker.checked) {
            delete cooker.checked
            return cooker
          }
        })
        : null,
        receipType: this.state.receipType,
      }

      const validatedReceip = validateReceip(receip)
      if (validatedReceip.length) {
        let errorMessage = ''
        for (err of validatedReceip) {
          errorMessage += `${err} \n`
        }
        Alert.alert('Campos inválidos', errorMessage)
        return
      }
      if (!this.props.receipToEdit) {
        return firebase.database().ref('receips/').push(receip)
          .then(() => {
            Alert.alert('Receita criada com sucesso! :)')
            this.clearFields()
          })
          .catch((err) => {
            Alert.alert('Falha ao criar receita :c')
          })
      }
      firebase.database().ref(`receips/${this.props.receipToEdit.object_key}`).set(receip)
        .then(() =>{
          Alert.alert('Receita editada com sucesso! :)')
          Actions.receip({ selectedReceip: receip })          
        })
        .catch((err) => {
          console.log(err)
        })
    }
    
    return (
      <Container
        style={ Styles.container }
      >
        <Content
          style={{ width: window.width }}
        >
          <Modal
            animationType="slide"
            transparent={ false }
            visible={ this.state.modalVisible }
          >
            <View style={ Styles.modalContainer }>
              <View>
                <Text>Editar item</Text>
              </View>
              <View>
                <Input
                  onChangeText={itemToEdit => this.setState({ itemToEdit })}
                  value={ this.state.itemToEdit } 
                />
              </View>
            </View>
            <View>
              <Button
                onPress={ () => this.setState({ modalVisible: false }) }
              >
                <Text>Fechar</Text>
              </Button>
            </View>
          </Modal>
          <Form>
            <Text style={ Styles.title }>Nome da receita</Text>
            <Item underline>
              <Input
                onChangeText={receipName => this.setState({ receipName })}
                value={ this.state.receipName } 
              />
            </Item>
            <Text style={ Styles.title }>Ingredientes:</Text>
            <FlatList
              data={this.state.ingredients}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => {
                return (
                  <ListItem
                    style={ Styles.listItems }
                    >
                    <SwipeRow
                      style={{ width: '100%' }}
                      rightOpenValue={-90}
                      leftOpenValue={90}
                      left={ 
                        <Button 
                          info 
                          onPress={ () => {
                            this.setState({ modalVisible: true })
                            this.setState({ itemToEdit: item })
                          } }
                        >
                          <Icon active name="settings" />
                        </Button>
                       }
                      body={
                        <View>
                          <Text>{ item }</Text>
                        </View>
                      }
                      right={
                        <Button danger onPress={ () => deleteIngredient(item) }>
                          <Icon active name="trash" />
                        </Button>
                      }
                    />
                  </ListItem>
                )
              } 
              } 
            />
            <Item
              floatingLabel
            >
              <Label>Adicionar ingrediente</Label>
              <Input
                returnKeyType = {"done"}
                onEndEditing={ addIngredient }
                onChangeText={newIngredient => this.setState({newIngredient})}
                value={ this.state.newIngredient }
              />
            </Item>

            <Text style={ Styles.title }>Modo de preparo:</Text>
              <FlatList
                data={this.state.directions}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => {
                  return (
                    <ListItem
                      style={ Styles.listItems }
                      onPress={ () => this.setState({ modalVisible: true }) }
                    >
                      <SwipeRow 
                        style={{ width: '100%' }}
                        rightOpenValue={-90}
                        body={
                          <View>
                            <Text>{ item }</Text>
                          </View>
                        }
                        right={
                          <Button danger onPress={ () => deleteDirection(item) }>
                            <Icon active name="trash" />
                          </Button>
                        }
                      />
                    </ListItem>
                  )
                } 
                } 
              />
            <Item
              floatingLabel
            >
              <Label>Adicionar passo</Label>
              <Input
                returnKeyType = {"done"}
                onEndEditing={ addDirection }
                onChangeText={ newDirection => this.setState({newDirection}) }
                value={ this.state.newDirection }
              />
            </Item>

            <Text style={ Styles.title }>Tempo de preparo: </Text>    
            <Item
              style={{ width: 200 }} 
              floatingLabel
            >
            <Label>Tempo em minutos</Label>
              <Input
                onChangeText={ duration => this.setState({duration}) }
                value={ this.state.duration }
                keyboardType={'numeric'}
                />
            </Item>
            
            <Text style={ Styles.title }>Rendimento - Porções:</Text>
            <Item
              style={{ width: 200 }} 
              floatingLabel
              >
              <Label>Porções</Label>
              <Input
                onChangeText={portions => this.setState({ portions })}
                value={ this.state.portions }
                keyboardType={'numeric'}
              />
            </Item>
            <Text style={ Styles.title }>Receita já foi feita?</Text>
            <View style={ Styles.checkBoxContainer }>
              <View style={ Styles.checkBoxItem }>
                <Text>Sim</Text>
                <CheckBox
                  onPress={ () => this.setState({ receipHasBeenMade: true }) }
                  checked={ this.state.receipHasBeenMade }
                />
              </View>
              <View style={ Styles.checkBoxItem }>
                <Text>Não</Text>
                <CheckBox
                  onPress={ () => this.setState({ receipHasBeenMade: false }) }
                  checked={ !this.state.receipHasBeenMade } 
                />
              </View>
            </View>

            {
              this.state.receipHasBeenMade ? 
              <View>
                <Text>Selecione os cozinheiros:</Text>
                {
                  this.state.cookies.map((cooker, index) => (
                    <ListItem
                      button
                      key={ cooker.id }
                      onPress={() => { 
                        this.setState(() => this.state.cookies[index].checked  = !cooker.checked) 
                      } }
                    >
                      <CheckBox checked={ cooker.checked } />
                      <Body>
                        <Text>{ cooker.name }</Text>
                      </Body>
                    </ListItem>
                  ))
                } 
              </View>
              : null
            }

            <Text style={ Styles.title }>Tipo de receita</Text>
            <View style={ Styles.checkBoxContainer }>
              <View style={ Styles.checkBoxItem }>
                <Text>Doce</Text>
                <CheckBox
                  onPress={ () => this.setState({ receipType: 'candy' }) }
                  checked={ this.state.receipType === 'candy' }
                />
              </View>
              <View style={ Styles.checkBoxItem }>
                <Text>Salgada</Text>
                <CheckBox
                  onPress={ () => this.setState({ receipType: 'salty' }) }
                  checked={ this.state.receipType === 'salty' } 
                />
              </View>
              <View style={ Styles.checkBoxItem }>
                <Text>Bebida</Text>
                <CheckBox
                  onPress={ () => this.setState({ receipType: 'drink' }) }
                  checked={ this.state.receipType === 'drink' }
                />
              </View>
            </View>
              <Button 
                block
                onPress={ saveReceip }
                success
              >
                <Text>
                  { 
                    this.props.receipToEdit 
                    ? 'Editar receita' 
                    : 'Criar receita' 
                  }
                </Text>
              </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const Styles = StyleSheet.create({   
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#eee',
    width: '100%',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Cookie',
    marginLeft: 10,
    marginBottom: -15,
    marginTop: 15,
  },
  checkBoxContainer: {
    flex: 1, 
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 20,
  },
  checkBoxItem: {
    flex: 1, 
    flexDirection: 'row',
  },
  listItems: {
    width: window.width,  
    paddingBottom: 0, 
    marginBottom: 0,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },                                                                                                                                                                                              
})
