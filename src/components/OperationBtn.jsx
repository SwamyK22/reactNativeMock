import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ACTIONS } from '../screen/Calculator'

const OperationBtn = ({dispatch, operation, style, textStyle}) => {
  return (
    <TouchableOpacity style={style} onPress={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}>
      <Text style={textStyle}>{operation}</Text>
    </TouchableOpacity>
  )
}

export default OperationBtn
