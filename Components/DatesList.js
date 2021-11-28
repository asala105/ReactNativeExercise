import React, {useRef, useEffect} from 'react'
import { Animated,StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import Date from './Date';
const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = '100%';

export default function Dates(props) {
    const List =
    React.forwardRef(
      ({ color, showText, style, onScroll, onItemIndexChange }, ref) => {
        return (
          <Animated.FlatList
          horizontal={true}
            ref={ref}
            data={props.dates}
            style={style}
            keyExtractor={(item) => item.index}
            bounces={false}
            scrollEnabled={!showText}
            scrollEventThrottle={16}
            onScroll={onScroll}
            decelerationRate='fast'
            snapToInterval={ITEM_HEIGHT}
            showsVerticalScrollIndicator={false}
            renderToHardwareTextureAndroid
            contentContainerStyle={{
              paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
              paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
              paddingHorizontal: 20,
            }}
            renderItem={({ item, index }) => (
             <Date 
              date={item}
              index={index}
              isActive={index === props.currentDateIndex}
              onPress={(index)=>props.onSelectDay(index)}
              showsHorizontalScrollIndicator={false}
              onRender={props.onRenderDay}
              key={index}/>)}
            onMomentumScrollEnd={(ev) => {
              const newIndex = Math.round(
                ev.nativeEvent.contentOffset.x / ITEM_HEIGHT
              );
  
              if (onItemIndexChange) {
                onItemIndexChange(newIndex);
              }
            }}
          />
        );
      }
    );
    const yellowRef = React.useRef();
    const whiteRef = React.useRef();
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: true }
    );
    React.useEffect(() => {
      scrollX.addListener((v) => {
        if (whiteRef?.current) {
          whiteRef.current.scrollToOffset({
            offset: v.value,
            animated: false,
          });
        }
      });
    });
    return (<>
    <List
        ref={yellowRef}
        color={'#fcf188'}
        // style={StyleSheet.absoluteFillObject}
        onScroll={onScroll}
        onItemIndexChange={props.onItemIndexChange}
      />
      <List
        ref={whiteRef}
        color={'#fff'}
        showText
        style={{
        //   position: 'absolute',
          backgroundColor: "#fcf188",
          width,
          height: ITEM_HEIGHT,
          top: height / 2 - ITEM_HEIGHT / 2,
        }}
      /></>
    )
      }

const styles = StyleSheet.create({
  list:{
    maxWidth: Dimensions.get('window').width,
  }
});