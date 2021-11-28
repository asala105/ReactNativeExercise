import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

export default function Time(props) {
  // Call `onRender` and pass component's with when rendered
  // const onLayout = (event) => {
  //   let Width = event.nativeEvent.layout.height;
  //   props.onRender(props.index, Width);
  // };
  
    // Call `onPress` passed from the parent component when date is pressed
  const onPress = () => {
    props.onPress(props.index);
  };

    return (
    <TouchableOpacity
        style={[styles.container,props.isActive ? styles.containerActive : {}]}
        // onLayout={onLayout}
        onPress={onPress}
    >
        <Text style={[styles.text,styles.day,props.isActive ? styles.textActive : {}]}>{props.time.from + '-' + props.time.till}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      borderBottomColor: 'transparent',
      borderBottomWidth: 2,
      paddingHorizontal: 15,
      paddingVertical: 10,
      height: '20%',
    },
    date: {
      fontSize: 12,
    },
    day: {
      fontSize: 22,
    },
    text: {
      color: '#7c86b3',
      textAlign: 'center',
    },
    textActive: {
      color: '#fff',
    },
    textSelected:{
      color: '#252e52',
    }
  });