'use strict';
import React from 'react-native';
import SearchPage from './iOSsrc/search';

const styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class HelloWorld extends React.Component {
  render() {
    return <React.Text style={styles.text}>one more time</React.Text>
  }
};

class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  }
};

React.AppRegistry.registerComponent('PropertyFinder', function() {
  return PropertyFinderApp;
});
