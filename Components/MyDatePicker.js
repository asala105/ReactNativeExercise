import React, {useState, useEffect, useCallback} from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import moment from 'moment'
import Dates from './Dates'

const { width: screenWidth } = Dimensions.get('window');
export default function MyDatePicker(props) {
  const [allDatesHaveRendered, setAllDatesHaveRendered] = useState(false);
  const [currentDateIndex,setCurrentDateIndex] = useState(props.showDaysBeforeCurrent);
  const [dates, setDates] = useState(getDates);
  const [scrollPositionX, setScrollPositionX] = useState(0);
  const [dayWidths, setDayWidths] = useState(undefined);

  function getDates (){
    const startDay = moment(props.currentDate || undefined)
      .subtract(props.showDaysBeforeCurrent + 1, 'days');
    const totalDaysCount = props.showDaysBeforeCurrent + props.showDaysAfterCurrent + 1;
    return [...Array(totalDaysCount)]
      .map(_ => startDay.add(1, 'day').clone());
  };
  function onSelectDay (index){
    setCurrentDateIndex(index);
    props.onSelectDate(dates[index]);
  };

  const onItemIndexChange = useCallback(setCurrentDateIndex,[]);
  function onRenderDay (index, width){
    // Check whether all date have been rendered already
    const allDatesHaveRendered = dayWidths
      && Object.keys(dayWidths).length >= props.showDaysBeforeCurrent + props.showDaysAfterCurrent;
    setAllDatesHaveRendered(allDatesHaveRendered);
    setDayWidths({...dayWidths,[index]: width});
  };
  const onScroll = useCallback((event) => {
    let xPos = event.nativeEvent.contentOffset.x;
    setScrollPositionX(xPos);
  }, []);
  function scrollToCurrentDay (){
    if (!allDatesHaveRendered || currentDateIndex === undefined || currentDateIndex === null) {
      return;
    }
    console.log("scroll failed");
    // Put all day width values into a simple array $FlowFixMe
    const dayWidthsArray = Object.values(dayWidths);
    // Total width all days take
    const allDaysWidth = dayWidthsArray.reduce((total, width) => width + total, 0);
    // Current day button width
    const currentDayWidth = dayWidthsArray[currentDateIndex];
    // Minimal possible X position value to prevent scrolling before the first day
    const minX = 0;
    // Maximum possible X position value to prevent scrolling after the last day
    const maxX = allDaysWidth > screenWidth
      ? allDaysWidth - screenWidth
      : 0; // no scrolling if there's nowhere to scroll

    let scrollToX;

    scrollToX = dayWidthsArray
      // get all days before the target one
      .slice(0, currentDateIndex + 1)
      // and calculate the total width
      .reduce((total, width) => width + total, 0)
      // Subtract half of the screen width so the target day is centered
      - screenWidth / 2 - currentDayWidth / 2;

    // Do not scroll over the left edge
    if (scrollToX < minX) {
      scrollToX = 0;
    }
    // Do not scroll over the right edge
    else if (scrollToX > maxX) {
      scrollToX = maxX;
    }
    console.log(scrollToX);
    _flat_list.current.scrollToIndex({
      animated: true,
      index: currentDateIndex
   });
  };
  useEffect(()=>{
    if(allDatesHaveRendered){
    scrollToCurrentDay();
    }
  }
  , [currentDateIndex, allDatesHaveRendered, dayWidths]);
  return (
    <Dates
      dates={dates}
      currentDateIndex={currentDateIndex}
      onSelectDay={onSelectDay}
      onRenderDay={onRenderDay}
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
