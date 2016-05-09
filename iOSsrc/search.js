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
  }
});

class SearchPage extends Component {
  render() {
   return (
     <View style={styles.container}>
       <Text style={styles.description}>
        Search for homes to buy!
       </Text>
       <Text style={styles.description}>
         Search by place-name, postcode or search near your location.
       </Text>
     </View>
   );
  }
};


export default SearchPage;
