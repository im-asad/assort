import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import Settings from './Settings';
import Routes from './Routes';
import Bins from './Bins';
import {fetchAreas, fetchBins} from '../../actions/bins';
import {_retrieveData, _storeData} from '../../utils/asyncStorage';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areas: null,
      bins: null,
      fillPercentage: 0.0,
      areaSelected: '',
    };
  }

  async componentDidMount() {
    const resAreas = await fetchAreas();
    const resBins = await fetchBins();
    console.log('res bins', resBins.bins);
    let settings = await _retrieveData('bins_settings');
    if (settings) {
      settings = JSON.parse(settings);
      this.setState({
        fillPercentage: parseFloat(settings.fillPercentage),
        areaSelected: settings.areaSelected,
      });
    }
    this.setState({
      areas: resAreas.areas,
      bins: resBins.bins,
    });
  }
  handleAreaChange = areaSelected => {
    this.setState({areaSelected});
  };
  handlePercentageChange = fillPercentage => {
    this.setState({fillPercentage: parseFloat(fillPercentage.toFixed(1))});
  };
  handleSaveClick = async () => {
    const {fillPercentage, areaSelected} = this.state;
    const res = await _storeData(
      'bins_settings',
      JSON.stringify({
        fillPercentage,
        areaSelected,
      }),
    );
    if (res) {
      const resBins = await fetchBins();
      this.setState({bins: resBins.bins});
      // eslint-disable-next-line no-alert
      alert('Settings saved!');
    } else {
      alert('Some error occurred saving settings, please try again later.');
    }
  };
  render() {
    const {areas, bins, fillPercentage, areaSelected} = this.state;
    console.log('dashb', bins);
    return (
      <Container>
        <Tabs
          tabBarUnderlineStyle={{width: 0}}
          tabContainerStyle={styles.tabContainerStyle}
          locked={Platform.OS === 'android'}>
          <Tab
            heading={'Bins'}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            activeTextStyle={styles.activeTextStyle}>
            <Bins bins={bins} areas={areas} />
          </Tab>
          <Tab
            heading={'Settings'}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            activeTextStyle={styles.activeTextStyle}>
            <Settings
              fillPercentage={fillPercentage}
              areaSelected={areaSelected}
              areas={areas}
              onAreaChange={this.handleAreaChange}
              onSaveClick={this.handleSaveClick}
              onPercentageChange={this.handlePercentageChange}
            />
          </Tab>
          <Tab
            heading={'Routes'}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            activeTextStyle={styles.activeTextStyle}>
            <Routes bins={bins} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  tabContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#85C872',
    elevation: 0,
  },
  tabBarUnderlineStyle: {
    backgroundColor: '#85C872',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    height: 0,
  },
  tabsContainer: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'white',
  },

  tabStyle: {
    backgroundColor: '#85C872',
  },
  activeTabStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  textStyle: {
    color: '#fff',
  },
  activeTextStyle: {
    color: '#505560',
    fontWeight: 'bold',
  },
});
