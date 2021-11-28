import React, {useState, useEffect, useCallback} from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import AvailableTimes from './AvailableTimes';

const { height: screenHeight } = Dimensions.get('window');
export default function MyTimePicker(props) {
  const [currentTimeIndex,setCurrentTimeIndex] = useState(props.showDaysBeforeCurrent);
  const [scrollPositionY, setScrollPositionY] = useState(0);
  const [timeHeights, setTimeHeights] = useState(undefined);

  function onSelectTime (index){
    setCurrentTimeIndex(index);
    // props.onSelectDate(dates[index]);
  };

  const onItemIndexChange = useCallback(setCurrentTimeIndex,[]);
  const onScroll = useCallback((event) => {
    let yPos = event.nativeEvent.contentOffset.y;
    setScrollPositionY(yPos);
  }, []);
  function scrollToCurrentTime (){
    if (currentTimeIndex === undefined || currentTimeIndex === null) {
      return;
    }
    // Put all day height values into a simple array $FlowFixMe
    const timeHeightsArray = Object.values(timeHeights);
    // Total height all days take
    const allTimesHeight = timeHeightsArray.reduce((total, height) => height + total, 0);
    // Current day button height
    const currentTimeHeight = timeHeightsArray[currentTimeIndex];
    // Minimal possible X position value to prevent scrolling before the first day
    const minY = 0;
    // Maximum possible X position value to prevent scrolling after the last day
    const maxY = allTimesHeight > screenHeight
      ? allTimesHeight - screenHeight
      : 0; // no scrolling if there's nowhere to scroll

    let scrollToY;

    scrollToY = timeHeightsArray
      // get all days before the target one
      .slice(0, currentTimeIndex + 1)
      // and calculate the total height
      .reduce((total, height) => height + total, 0)
      // Subtract half of the screen height so the target day is centered
      - screenHeight / 2 - currentTimeHeight / 2;

    // Do not scroll over the left edge
    if (scrollToY < minY) {
      scrollToY = 0;
    }
    // Do not scroll over the right edge
    else if (scrollToY > maxY) {
      scrollToY = maxY;
    }
    console.log(scrollToY);
    _flat_list.current.scrollToIndex({
      animated: true,
      index: currentTimeIndex
   });
  };
  useEffect(()=>{
    scrollToCurrentTime();
  }
  , [currentTimeIndex, timeHeights]);
  return (
      <AvailableTimes
      times={props.timeSlots}
      currentTimeIndex={currentTimeIndex}
      onSelectTime={onSelectTime}
      onScroll={onScroll}
      onItemIndexChange={onItemIndexChange}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
