import React from 'react';
import {View} from 'native-base';
import MapView from 'react-native-maps';
import {StyleSheet, Dimensions} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {fetchBins} from '../../../actions/bins';

const GOOGLE_MAPS_APIKEY = 'AIzaSyB9zHULu8W4_qLfrBUImkxGzdkOFmRwN8I';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      routes: [
        {
          latitude: 33.6769,
          longitude: 73.0149,
        },
        {
          latitude: 33.6882,
          longitude: 73.0351,
        },
        {
          latitude: 33.6973,
          longitude: 73.0515,
        },
        {
          latitude: 33.6992,
          longitude: 72.9744,
        },
      ],
      bins: null,
      location: null,
      hasLocationPermission: false,
    };
    this.mapView = null;
  }
  onMapPress = e => {
    // this.setState({
    //   coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    // });
  };

  async componentDidMount() {
    console.log('Hello');
    const data = await fetchBins();
    console.log('Hello', data);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({bins: data.bins});
    const hasLocationPermission = await this.requestLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          this.setState({
            location: {
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
          });
          console.log(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Assort App',
          message: 'Assort App wants to access your location.',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    const {region, location, bins, routes} = this.state;
    // const routes =
    //   bins &&
    //   bins.map(bin => {
    //     return {
    //       latitude: parseFloat(bin.latitude),
    //       longitude: parseFloat(bin.longitude),
    //     };
    //   });
    // console.log(routes);
    return (
      <View style={styles.container}>
        {routes && (
          <MapView
            initialRegion={{
              latitude: 33.6844,
              longitude: 73.0479,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={[StyleSheet.absoluteFill, styles.map]}
            ref={c => (this.mapView = c)}
            onPress={this.onMapPress}>
            {routes.map((coordinate, index) => (
              <MapView.Marker
                key={`coordinate_${index}`}
                coordinate={coordinate}
              />
            ))}
            {
              <MapViewDirections
                origin={routes[0]}
                waypoints={routes}
                destination={routes[routes.length - 1]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${
                      params.destination
                    }"`,
                  );
                  console.log('S', params.waypoints);
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: width / 20,
                      bottom: height / 20,
                      left: width / 20,
                      top: height / 20,
                    },
                  });
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR');
                }}
              />
            }
          </MapView>
        )}
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
