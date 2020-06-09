import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import Settings from './Settings';
import Routes from './Routes';
import Bins from './Bins';
export default class Dashboard extends Component {
  render() {
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
            <Bins />
          </Tab>
          <Tab
            heading={'Settings'}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            activeTextStyle={styles.activeTextStyle}>
            <Settings />
          </Tab>
          <Tab
            heading={'Routes'}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            activeTextStyle={styles.activeTextStyle}>
            <Routes />
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
