import React, { Component } from 'react'
import { 
  StyleSheet, 
  Dimensions,
  FlatList,
  Image,
} from 'react-native'
import { 
  Container, 
  View,
  Content, 
  Text,
  ListItem,
  Body,
  Segment,
  Button,
  Spinner,
} from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase'
import { O2A } from 'object-to-array-convert'

export default class ListReceips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receips: null,
      filterBy: null,
      pureDataReceips: null,
      isLoading: true,
    }
  }

  async componentWillMount() {
    await this.getReceips(this.props.title)
  }

  getReceips() {
    const receips = firebase.database().ref('receips')
    receips.on('value', this.getFilteredReceips.bind(this), this.errData)
  }

  async getFilteredReceips(data) {
    const receips = await O2A(data)
    const filteredReceips = receips.filter(receip => {
      if (this.props.wasMade === 'made' && receip.madeAt) return receip
      if (this.props.wasMade === 'wish' && !receip.madeAt) return receip
    })
    this.setState({ pureDataReceips: filteredReceips })
    this.setState({ receips: filteredReceips })
    this.setState({ isLoading: false })
  }

  filterReceipsBy(type) {
    const receips = this.state.pureDataReceips
    this.setState({ filterBy: type })
    if (!type) this.setState({ receips: receips })
    if (type) {
      const filteredReceips = receips.filter(receip => receip.receipType === type)
      this.setState({ receips: filteredReceips })
    }
  }

  _keyExtractor = item => item.object_key

  errData(err) {
    alert(err)
  }
  
  render() {
    const window = Dimensions.get('window')
    if (this.state.isLoading) {
      return <Spinner color='blue'/>
    }
    return (
      <Container>
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
        <Content>
        <Segment>
          <Button
            first
            active={!this.state.filterBy}
            onPress={ () => this.filterReceipsBy() }
          >
            <Text>Todos</Text>
          </Button>
          <Button
            active={this.state.filterBy === 'salty'}
            onPress={ () => this.filterReceipsBy('salty') }
          >
            <Text>Salgados</Text>
          </Button>
          <Button
            active={this.state.filterBy === 'candy'}
            onPress={ () => this.filterReceipsBy('candy') }
          >
            <Text>Doces</Text>
          </Button>
          <Button 
            last
            active={this.state.filterBy === 'drink'}
            onPress={ () => this.filterReceipsBy('drink') }  
          >
            <Text>Drinks</Text>
          </Button>
        </Segment>
          <View>
          <FlatList
                data={this.state.receips}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => {
                  return (
                    <ListItem
                      onPress={ () => Actions.receip({ selectedReceip: item }) }
                    >
                      <Body>
                        <Text 
                          style={ Styles.title }
                        >
                          { item.name }
                        </Text>
                      </Body>
                    </ListItem>
                  )
                }}
              />
          </View>
        </Content>
      </Container>
    )
  }
}

const Styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: 'Cookie',
    marginLeft: 10,
  },
})