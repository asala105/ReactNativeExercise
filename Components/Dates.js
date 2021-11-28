import React, {useRef, useEffect} from 'react'
import { Animated,StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import Date from './Date';

export default function Dates(props) {
  const _flat_list = useRef();
  useEffect(() => {
    _flat_list.current.scrollToIndex({
      animated: true,
      index: props.currentDateIndex,
      viewPosition: 0.5
   });},[props.currentDateIndex]);
    return (
      <Animated.FlatList
      ref={_flat_list}
      bounces={false}
        horizontal={true}
        style={styles.list}
        data={props.dates}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        renderItem={({ item, index, separators }) => (
            <Date
              date={item}
              index={index}
              isActive={index === props.currentDateIndex}
              onPress={(index)=>props.onSelectDay(index)}
              showsHorizontalScrollIndicator={false}
              onRender={props.onRenderDay}
              key={index}
            />)}
            scrollEventThrottle={16}
        onScroll={(event)=>props.onScroll(event)}
        onItemIndexChange={props.onItemIndexChange}
        onMomentumScrollEnd={(event)=>{
          const slideSize = event.nativeEvent.layoutMeasurement.width;
          const index = event.nativeEvent.contentOffset.x / slideSize;
          const roundIndex = Math.round(index);
            props.onItemIndexChange(roundIndex);
        }}
      />
    )
      }

const styles = StyleSheet.create({
  list:{
    width: Dimensions.get('window').width,
  }
});