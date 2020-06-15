import React from 'react';
import {View, Text, Form, Picker, Item, Icon, Button} from 'native-base';
import Slider from '@react-native-community/slider';
import {ActivityIndicator, StyleSheet} from 'react-native';

const Settings = props => {
  const {
    areas,
    fillPercentage,
    areaSelected,
    onAreaChange,
    onSaveClick,
    onPercentageChange,
  } = props;
  return (
    <View style={styles.container}>
      <Text>Desired fill level</Text>
      {areas ? (
        <Form>
          <View style={styles.sliderWrapper}>
            <Slider
              style={{width: '90%', height: 40}}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#85C872"
              maximumTrackTintColor="#000000"
              value={fillPercentage}
              onValueChange={value => onPercentageChange(value)}
            />
            <Text>{fillPercentage}%</Text>
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
              onValueChange={area => onAreaChange(area)}>
              {areas &&
                areas.map(areaObj => (
                  <Picker.Item label={areaObj.area} value={areaObj.areaId} />
                ))}
            </Picker>
          </Item>
          <Button style={styles.saveBtn} onPress={() => onSaveClick()}>
            <Text style={styles.btnText}>Save</Text>
          </Button>
        </Form>
      ) : (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
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
  loadingWrapper: {
    marginTop: 40,
  },
});
