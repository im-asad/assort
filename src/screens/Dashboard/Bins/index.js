import React, {useState} from 'react';
import {
  View,
  Text,
  CardItem,
  Card,
  Body,
  Item,
  Picker,
  Icon,
} from 'native-base';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const Bins = ({bins, areas}) => {
  const [areaSelected, setAreaSelected] = useState('');
  React.useEffect(() => {
    if (areas) {
      setAreaSelected(areas[0].areaId);
    }
  }, [areas]);

  const onAreaChange = area => {
    setAreaSelected(area);
  };
  console.log(bins)
  return (
    <View style={styles.container}>
      {bins ? (
        bins.length ? (
          <ScrollView>
            <View style={{marginBottom: 40}}>
              <Text style={styles.areaLabel}>Area</Text>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: undefined}}
                  placeholder="Select Area"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={areaSelected}
                  onValueChange={onAreaChange}>
                  {areas &&
                    areas.map(areaObj => (
                      <Picker.Item
                        label={areaObj.area}
                        value={areaObj.areaId}
                      />
                    ))}
                </Picker>
              </Item>
              {bins.map(bin => (
                <Card style={styles.cardWrapper}>
                  <CardItem header bordered>
                    <Text>Location: {bin.location}</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text>Plastic: {bin.plasticFillLevel}%</Text>
                      <Text>Metal: {bin.metalFillLevel}%</Text>
                      <Text>Paper: {bin.paperFillLevel}%</Text>
                      <Text>Cardboard: {bin.cardboardFillLevel}%</Text>
                      <Text>Glass: {bin.glassFillLevel}%</Text>
                      <Text>Overall: {bin.overallFillLevel}%</Text>
                    </Body>
                  </CardItem>
                </Card>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.noBinsWrapper}>
            <Text style={styles.noBinsText}>
              No bins found for selected fill level
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  cardWrapper: {
    marginTop: 30,
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

export default Bins;
