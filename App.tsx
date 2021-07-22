import React, {Props, useCallback, useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {TabView, SceneMap, TabBar, TabViewProps} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{flex: 1, backgroundColor: '#ff4081'}}/>
);

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}}/>
);

const ThirdRoute = () => (
  <View style={{flex: 1, backgroundColor: '#42b73a'}}/>
);
const FourthRoute = () => (
  <View style={{flex: 1, backgroundColor: '#d7ac25'}}/>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

const MyBar: TabViewProps<any>['renderTabBar'] = props => {
  console.log(props)
  const l = useCallback(p => console.log(p.value), []);
  const current = props.navigationState.index;
  // const [current, setCurrent] = useState(props.navigationState.index);
  const [next, setNext] = useState(props.navigationState.index);
  useEffect(() => {
  
  }, [props.navigationState.index])
  
  const diff = next - current;
  console.log(diff)
  const nextToCurrent = current + (diff / Math.abs(diff || 1));
  console.log('nextToCurrent', nextToCurrent)
  const lastIndex = props.navigationState.routes.length - 1;
  const inputRange = [0, Math.min(current, next), Math.max(current, next), lastIndex];
  console.log('inputRange', inputRange)
  const position = props.position.interpolate({
    inputRange: inputRange,
    outputRange: [0, Math.min(current, next), Math.max(current, next), lastIndex],
    // extrapolate: "extend"
  })
  // @ts-ignore
  position.addListener(l)
  console.log(position);
  const jumpTo = useCallback(key => {
    const index = props.navigationState.routes.findIndex(r => r.key === key)
    setNext(index)
    props.jumpTo(key)
  }, [props.jumpTo])
  return <TabBar {...props} indicatorStyle={styles.indicator} position={props.position} jumpTo={jumpTo}/>
}

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
    {key: 'fourth', title: 'Fourth'},
  ]);
  const layout = useWindowDimensions();
  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={MyBar}
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
  indicator: {
    backgroundColor: 'black',
    height: '100%'
  }
});
