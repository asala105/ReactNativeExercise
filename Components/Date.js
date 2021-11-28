import React, {useState,useEffect} from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

export default function Date(props) {
  
    // Call `onRender` and pass component's with when rendered
    const onLayout = (event) => {
      let Width = event.nativeEvent.layout.width;
      props.onRender(props.index, Width);
    };
    
      // Call `onPress` passed from the parent component when date is pressed
    const onPress = () => {
      props.onPress(props.index);
    };

    return (
    <TouchableOpacity
        style={[styles.container,props.isActive ? styles.containerActive : {}]}
        onLayout={(event) => onLayout(event)}
        onPress={onPress}
    >
        <Text style={[styles.text,styles.day,props.isActive ? styles.textActive : {}]}>{props.date.format('dddd')}</Text>
        <Text style={[styles.text,styles.date,props.isActive ? styles.textActive : {}]}>{props.date.format('MMM DD')}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      borderBottomColor: 'transparent',
      borderBottomWidth: 2,
      paddingHorizontal: 5,
      paddingVertical: 5,
      width: Dimensions.get('window').width/3,
    },
    containerActive: {
      borderBottomColor: '#fcf188',
    },
    date: {
      fontSize: 12,
    },
    day: {
      fontSize: 20,
    },
    text: {
      color: '#fff',
      textAlign: 'center',
    },
    textActive: {
      color: '#fcf188',
    },
  });