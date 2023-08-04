import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react'
import { ACTIONS } from '../screen/Calculator';

const DigitBtn = ({ dispatch, digit, style }) => {
  return (
    <TouchableOpacity style={style} onPress={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }})}>
      <Text style={styles.btnTxt}>{digit}</Text>
    </TouchableOpacity>
  )
}

export default DigitBtn

const styles = StyleSheet.create({
    btn:{
        width: Dimensions.get('window').width / 5,
        height: Dimensions.get('window').width / 5,
        borderRadius: Dimensions.get('window').width / 10,
        backgroundColor: '#1d2b3a',
        alignItems: 'center',
        justifyContent:'center',
        margin: 5
    },
    btnTxt: {
        color:'#fff',
        fontSize: Dimensions.get('window').width * 0.1,
    },
})