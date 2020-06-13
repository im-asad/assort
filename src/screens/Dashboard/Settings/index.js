import React, {useState} from 'react';
import {View, Text, Form, Picker, Item, Icon, Button} from 'native-base';
import Slider from '@react-native-community/slider';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {_retrieveData, _storeData} from '../../../utils/asyncStorage';
import {fetchAreas} from '../../../actions/bins';

const Settings = () => {
  const [percentage, setPercentage] = useState(0.0);
  const [areaSelected, setAreaSelected] = useState('');
  const [areas, setAreas] = useState(null);
  React.useEffect(() => {
    handleAsyncApis();
  }, []);

  const handleAsyncApis = async () => {
    const resAreas = await fetchAreas();
    let settings = await _retrieveData('bins_settings');
    setAreas(resAreas.areas);
    settings = JSON.parse(settings);
    setPercentage(parseFloat(settings.percentage));
    setAreaSelected(settings.areaSelected);
  };

  const onAreaChange = area => {
    setAreaSelected(area);
  };
  const handleClickSave = async () => {
    const data = {
      percentage,
      areaSelected,
    };
    console.log('Amir', areaSelected);
    const res = await _storeData('bins_settings', JSON.stringify(data));
    if (res) {
      // eslint-disable-next-line no-alert
      alert('Settings saved!');
    } else {
      alert('Some error occurred saving settings, please try again later.');
    }
  };
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
              value={percentage}
              onValueChange={value => {
                console.log(value);
                setPercentage(parseFloat(value.toFixed(1)));
              }}
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
              {areas &&
                areas.map(areaObj => (
                  <Picker.Item label={areaObj.area} value={areaObj.areaId} />
                ))}
            </Picker>
          </Item>
          <Button style={styles.saveBtn} onPress={handleClickSave}>
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
