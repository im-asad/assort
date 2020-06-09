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
import {StyleSheet, ScrollView} from 'react-native';

const Bins = () => {
  const [areaSelected, setAreaSelected] = useState('');
  const onAreaChange = area => {
    setAreaSelected(area);
  };
  return (
    <ScrollView style={styles.container}>
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
            <Picker.Item label="DHA" value="key0" />
            <Picker.Item label="Model town" value="key1" />
            <Picker.Item label="Debit Card" value="key2" />
            <Picker.Item label="Credit Card" value="key3" />
            <Picker.Item label="Net Banking" value="key4" />
          </Picker>
        </Item>
        {bins &&
          bins.map(bin => (
            <Card style={styles.cardWrapper}>
              <CardItem header bordered>
                <Text>Location: {bin.location}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>Plastic: {bin.plastic}</Text>
                  <Text>Metal: {bin.metal}</Text>
                  <Text>Paper: {bin.paper}</Text>
                  <Text>Cardboard: {bin.cardboard}</Text>
                  <Text>Overall: {bin.overall}</Text>
                </Body>
              </CardItem>
            </Card>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  cardWrapper: {
    marginTop: 30,
  },
});

export default Bins;
const bins = [
  {
    location: 'DHA Housing',
    plastic: '80%',
    metal: '20%',
    paper: '50%',
    cardboard: '30%',
    overall: '60%',
  },
  {
    location: 'Chungi',
    plastic: '80%',
    metal: '20%',
    paper: '50%',
    cardboard: '30%',
    overall: '60%',
  },
];
