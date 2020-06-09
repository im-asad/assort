import React, {useState} from 'react';
import {View, Text, Form, Picker, Item, Icon, Button} from 'native-base';
import Slider from '@react-native-community/slider';
import {StyleSheet} from 'react-native';

const Settings = () => {
  const [percentage, setPercentage] = useState(0);
  const [areaSelected, setAreaSelected] = useState('');
  const onAreaChange = area => {
    setAreaSelected(area);
  };
  return (
    <View style={styles.container}>
      <Text>Desired fill level</Text>
      <Form>
        <View style={styles.sliderWrapper}>
          <Slider
            style={{width: '90%', height: 40}}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#85C872"
            maximumTrackTintColor="#000000"
            onValueChange={value => setPercentage(Math.round(value))}
          />
          <Text>{percentage}%</Text>
        </View>
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
        <Button style={styles.saveBtn}>
          <Text style={styles.btnText}>Save</Text>
        </Button>
      </Form>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  sliderWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  areaLabel: {
    marginTop: 40,
  },
  saveBtn: {
    backgroundColor: '#85C872',
    justifyContent: 'center',
    marginTop: 50,
  },
  btnText: {
    textAlign: 'center',
  },
});
