import React from 'react';
import {View, Text} from 'native-base';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: this.getInitialState(),
    };
  }

  getInitialState = () => {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  onRegionChange = region => {
    this.setState({region});
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default Routes;
