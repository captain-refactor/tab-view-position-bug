import React, {useCallback} from 'react';
import {Animated, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#42b73a' }} />
);
const FourthRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#d7ac25' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
    { key: 'fourth', title: 'Fourth' },
  ]);
  const layout = useWindowDimensions();
  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (<TabBar {...props} indicatorStyle={{backgroundColor: 'black', height: '100%'}}/>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 100
  },
  tabView: {
    backgroundColor: '#f55'
  },
  indicator: {
    backgroundColor: 'black',
    width: 50,
    height: 50
  }
});
