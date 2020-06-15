import React from 'react';
import {Text, View} from 'native-base';
import MapView from 'react-native-maps';
import {StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {fetchBins} from '../../../actions/bins';

const GOOGLE_MAPS_APIKEY = 'AIzaSyB9zHULu8W4_qLfrBUImkxGzdkOFmRwN8I';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
      // routes: [
      //   {
      //     latitude: 33.6769,
      //     longitude: 73.0149,
      //   },
      //   {
      //     latitude: 33.6882,
      //     longitude: 73.0351,
      //   },
      //   {
      //     latitude: 33.6973,
      //     longitude: 73.0515,
      //   },
      //   {
      //     latitude: 33.6992,
      //     longitude: 72.9744,
      //   },
      // ],
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
    const {bins} = this.props;
    console.log('HEllo', bins);
    const routes =
      bins &&
      (bins.length
        ? bins.map((bin, index) => {
            return {
              latitude: parseFloat(bin.latitude),
              longitude: parseFloat(bin.longitude),
            };
          })
        : []);
    console.log('Routes are', routes);
    return (
      <View style={styles.container}>
        {routes ? (
          routes.length ? (
            <MapView
              initialRegion={{
                latitude: routes[0].latitude,
                longitude: routes[0].longitude,
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
          ) : (
            <View style={styles.noBinsWrapper}>
              <Text style={styles.noBinsText}>
                No routes found for selected fill level
              </Text>
            </View>
          )
        ) : (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
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
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
  noBinsWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
  noBinsText: {
    textAlign: 'center',
  },
});
export default Routes;
