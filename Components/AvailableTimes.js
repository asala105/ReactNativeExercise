import React, {useRef, useEffect} from 'react'
import { StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import Time from './Time';


export default function AvailableTimes(props) {
  const _flat_list = useRef();
  // useEffect(() => 
  //   _flat_list.current.scrollToIndex({
  //     animated: true,
  //     index: props.currentTimeIndex,
  //     viewPosition: 0.5
  //  }),[props.currentTimeIndex]);
    return (
      <FlatList
        ref={_flat_list}
        // style={styles.list}
        data={props.times}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        renderItem={({ item, index, separators }) => (
          <Time
              time={item}
              index={index}
              isActive={index === props.currentTimeIndex}
              onPress={(index)=>props.onSelectTime(index)}
              showsVerticalScrollIndicator={false}
              key={index}
            />)}
        onScroll={(event)=>{props.onScroll(event)}}
      />
    )
}

const styles = StyleSheet.create({
  // list:{
  //   maxWidth: Dimensions.get('window').width,
  // }
});