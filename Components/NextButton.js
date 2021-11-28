import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function NextButton() {
    return (
    <View container>
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      margin: 10
     
    },
    btn: {
        backgroundColor: '#fcf188',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textAlign: 'center',
        padding: 18,
      },
    btnText: {
        color: '#39417b',
        fontSize: 20,
        fontWeight: '400',
    },
  });