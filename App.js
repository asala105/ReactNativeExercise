import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, _ScrollView } from 'react-native';
import Header from './Components/Header';
import Instructions from './Components/Instructions';
import MyDatePicker from './Components/MyDatePicker';
import MyTimePicker from './Components/MyTimePicker';
import NextButton from './Components/NextButton';

const fakeData = [
  {date: '11/27/2021',
  availableTimeSlots:
  [{from:'1:00',till:'2:00', taken:false},
  {from:'1:00',till:'2:00', taken:false},
  {from:'3:00',till:'4:00', taken:false},
  {from:'5:00',till:'6:00', taken:false},
  {from:'7:00',till:'8:00', taken:true},
  {from:'9:00',till:'10:00', taken:false},],
},
{
  date: '11/28/2021',
  availableTimeSlots:
  [{from:'1:00',till:'2:00', taken:false},
  {from:'3:00',till:'4:00', taken:false},
  {from:'5:00',till:'6:00', taken:true},
  {from:'7:00',till:'8:00', taken:false},
  {from:'9:00',till:'10:00', taken:true},],
}
,{
  date: '11/2/2021',
  availableTimeSlots:
  [{from:'1:00',till:'2:00', taken:false},
  {from:'3:00',till:'4:00', taken:false},
  {from:'5:00',till:'6:00', taken:false},
  {from:'7:00',till:'8:00', taken:false},
  {from:'9:00',till:'10:00', taken:false}]
}];


export default function App() {
  const [timeSlots, setTimeSlots] = useState([]);
  function onSelectDate (date){
    let newDateFormat = date.format('MM') + '/' + date.format('DD') + '/' + date.format('YYYY');
    console.log(newDateFormat);
    filterEvents(newDateFormat);
  };
  function filterEvents (date){
    
    fakeData.forEach((data)=>{
      if(data.date == date){
        console.log('getting events')
        setTimeSlots(data.availableTimeSlots);
      }
    });
  }
  return (
    <View style={styles.container}>
      <Header title="lugg"/>
      <View style={{ flex: 10}}>
        <Instructions />
        <MyDatePicker onSelectDate={onSelectDate} showDaysBeforeCurrent={0} showDaysAfterCurrent={30} />
        <View style={{ flex:5, backgroundColor:'#252e5e' }}>
          <MyTimePicker timeSlots = {timeSlots}/>
        </View>
        <NextButton />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39417b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
