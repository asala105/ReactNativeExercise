import React, {useRef,useState, useEffect} from 'react'
import { Animated,StyleSheet, SafeAreaView, FlatList,View, Dimensions } from 'react-native';
import Time from './Time';

const ITEM_HEIGHT = 42;

export default function AvailableTimes(props) {
  const _flat_list1 = useRef();
  const _flat_list2 = useRef();
  const [layout, setLayout] = useState({width:0, height:0});
  const [index, setIndex] = React.useState(0);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );
  const onItemIndexChange = React.useCallback(setIndex, []);
  React.useEffect(() => {
    scrollY.addListener((v) => {
      if (_flat_list2?.current) {
        _flat_list2.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });
  });
  const onPageLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({width: width, height: height});
  };
    return (<View style={styles.list} onLayout={onPageLayout}>
      <Animated.FlatList
      ref={_flat_list1}
        data={props.times}
        contentContainerStyle={{ 
          paddingTop:0,
          alignItems: 'center',
          justifyContent: 'center',
        paddingHorizontal: 20,
      paddingBottom:3*ITEM_HEIGHT}}
        renderItem={({ item, index, separators }) => (
          <Time
              time={item}
              index={index}
              isActive={index === props.currentTimeIndex}
              // onPress={(index)=>props.onSelectTime(index)}
              key={index}
            />)}
        style={[{backgroundColor: '#252e5e'},]}
        keyExtractor={(item) => item.index}
        bounces={false}
        scrollEnabled={true}
        scrollEventThrottle={16}
        onScroll={onScroll}
        decelerationRate='fast'
        snapToInterval={ITEM_HEIGHT}
        showsVerticalScrollIndicator={false}
        renderToHardwareTextureAndroid
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.round(
            ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
          );
          if (onItemIndexChange) {
            onItemIndexChange(newIndex);
          }
        }}
      />
      <Animated.FlatList
      ref={_flat_list2}
        style={{
          position: 'absolute',
          backgroundColor: "#fcf188",
          width: layout.width,
          height: ITEM_HEIGHT,
          top: 0,
        }}
        data={props.times}
        contentContainerStyle={{
          paddingTop:0,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
          paddingHorizontal:20
      }}
        renderItem={({ item, index, separators }) => (
          <Time
              time={item}
              index={index}
              isActive={index === props.currentTimeIndex}
              // onPress={(index)=>props.onSelectTime(index)}
              showsVerticalScrollIndicator={false}
              key={index}
            />)}
            keyExtractor={(item) => item.index}
            bounces={false}
            scrollEnabled={false}
            decelerationRate='fast'
            snapToInterval={ITEM_HEIGHT}
            showsVerticalScrollIndicator={false}
            renderToHardwareTextureAndroid
      /></View>
    )
}

const styles = StyleSheet.create({
  list:{
    maxHeight: 4*ITEM_HEIGHT,
  }
});