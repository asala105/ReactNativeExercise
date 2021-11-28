import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Header(props) {
    return (
        <View>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      marginVertical:20,
    },
    title: {
        flex: 1,
        color: '#fff',
        fontSize: 30,
        fontWeight:'bold',
      },
  });