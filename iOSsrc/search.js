'use strict';

import React, {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} from 'react-native';

const house = require('./resources/house.png');

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});

function urlForQueryAndPage(key, value, pageNumber) {
  let data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };
  data[key] = value;

  let querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: ''
    };
  }

  onSearchTextChanged(event) {
    this.setState({searchString: event.nativeEvent.text});
  }

  _executeQuery(query) {
    this.setState({isLoading: true});
    fetch(query)
      .then(response => response.json())
      .then(json => this._handelResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        })
      )
  }

  _handelResponse(response) {
    this.setState({
      isLoading: false,
      message: ''
    });
    if(response.application_response_code.substr(0,1) === '1') {
      console.log('Properties found: ' + response.listings.length)
    } else {
      this.setState({
        message: 'Location not recognized; please try again.'
      });
    }
  }

  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  render() {
    const spinner = this.state.isLoading ? (<ActivityIndicatorIOS size='large'/>) : (<View/>);
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
        Search for homes to buy!
        </Text>
        <Text style={styles.description}>
        Search by place, zip or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
          style={styles.searchInput}
          value={this.state.searchString}
          onChange={this.onSearchTextChanged.bind(this)}
          placeholder='Search by Place or Zip' />
          <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText} onPress={this.onSearchPressed.bind(this)}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
        underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image source={house}
        style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
};


export default SearchPage;
