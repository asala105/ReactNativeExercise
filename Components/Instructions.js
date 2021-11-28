import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Instructions() {
    return (
        <View style={styles.container}>
            <Text style={styles.instructions}>Set a time where you would like to arrive at your pickup location</Text>
            <Text style={styles.subtitle}>IKEA Emeryville</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 30,
    },
    instructions: {
        color: '#7c86b3',
        fontSize: 16,
        marginBottom: 5,
    },
    subtitle: {
        color: '#fff',
        fontSize: 20,
      },
  });