import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useReducer } from 'react'
import DigitBtn from '../components/DigitBtn';
import OperationBtn from '../components/OperationBtn';

export const ACTIONS = {
    ADD_DIGIT : 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    EVALUATE: 'evaluate',
    PERCENTAGE: 'percentage',
    SIGN_CONVERT: 'sign-convert',
    DELETE_DIGIT: 'delete-digit',
};


//Evaluate Function
const evaluate = ({current, previouse, operation}) => {
    const p = parseFloat(previouse);
    const c = parseFloat(current);
    if(isNaN(p) && isNaN(c)) return "";
    let computation =''
    switch (operation) {
      case "+":
        computation = p + c;
        break;
      case "-":
        computation = p - c;
        break;
        case '×':
          computation = p * c;
          break;
        case '÷':
          computation = p / c;
          break;
      default:
        break;
    }
    return computation.toString();
}


//Reducer
const reducer = (state, {type, payload}) => {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if(state.overwrite) {
          return {
            ...state,
            current: payload.digit,
            overwrite: false
          }
        }
        if(payload.digit === '0' && state.current === '0') return state;
        if(payload.digit === '.' && state.current?.includes('.')) return state;
        return {
          ...state,
          current: `${state.current || ''}${payload.digit}`
        }
      case ACTIONS.CHOOSE_OPERATION:
        if(state.current == null && state.previouse == null) return state;
  
        if(state.current == null){
          return {
            ...state,
            operation: payload.operation
          }
        }
        if(state.previouse == null ){
          return {
            ...state,
            operation: payload.operation,
            previouse: state.current,
            current: null
          }
        }
  
          return {
            ...state,
            previouse: evaluate(state),
            operation: payload.operation,
            current: null
          }
      case ACTIONS.CLEAR:
          return {}
      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite){
          return {
            ...state,
            current: null,
            overwrite: false
          }
        }
        if(state.current == null) return state;
        if(state.current.length === 1){
          return {
            ...state,
            current: null,
          }
        }
          return {
            ...state,
            current: state.current.slice(0,-1)
          }
      case ACTIONS.EVALUATE:
        if(state.operation == null || state.previouse == null || state.current == null) return state;
        return {
          ...state,
          overwrite: true,
          operation: null,
          previouse: null,
          current: evaluate(state),
        }
      case ACTIONS.PERCENTAGE:
        if(state.current == null) return state;
        return {
          ...state,
          current: (state.current / 100).toString(),
        }
      case ACTIONS.SIGN_CONVERT:
        if(state.current == null) return state;
        if(state.current > 0) {
          return {
            ...state,
            current: '-'+state.current,
          }
        }
        if(state.current[0] === '-'){
          return {
            ...state,
            current: state.current.slice(1),
          }
        }
        return {
          ...state,
          current: '+'+state.current,
        }
      default:
    }
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})
function formatOperand(operand) { 
    if(operand == null) return 
    const [integer, decimal] = operand.split(".")
    if( decimal == null ) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}


const Calculator = () => {
    const [{current, previouse, operation}, dispatch] = useReducer(reducer, {});

    //Button values list
    const btn = [
        'AC',
        '+/-',
        '%',
        '÷',
        7,
        8,
        9,
        '×',
        4,
        5,
        6,
        '-',
        1,
        2,
        3,
        '+',
        0,
        '.',
        '=',
      ];
    const digit = [1,2,3,4,5,6,7,8,9,0,'.'];
    const sign = ['÷','×','-','+','='];
  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{current ? formatOperand(current) : formatOperand(previouse)}</Text>
      </View>
      <View style={{alignSelf:'center'}}>
        <FlatList 
        numColumns={4}
        key={4}
        data={btn}
        keyExtractor={(index) => index}
        renderItem={({item}) => (
            digit.includes(item) ? 
            (<DigitBtn dispatch={dispatch} 
              style={item === 0 ? 
              [styles.btn, styles.zeroBtn] : 
              item === "." ? [styles.btn, { justifyContent: 'flex-start'}] 
              : styles.btn } digit={item}/>)
            : sign.includes(item) ? 
            (<OperationBtn 
              dispatch={item === '='? () => dispatch({type: ACTIONS.EVALUATE}) : dispatch} 
              style={item === operation ? [styles.btn, {backgroundColor:'#ffff'}]:[styles.btn, {backgroundColor:'#fc7f03'}]} 
              textStyle={item === operation ? [styles.btnTxt, { color: '#fc7f03'}] : styles.btnTxt} operation={item}/>)
            :<TouchableOpacity onPress={item === 'AC' ? () => dispatch({type: ACTIONS.CLEAR}) : item === '%' ? () => dispatch({type: ACTIONS.PERCENTAGE}) : () => dispatch({type:ACTIONS.SIGN_CONVERT,})} 
              style={[styles.btn, { backgroundColor:'#fff'}]} >
                <Text style={[styles.btnTxt, { color: '#000'}]}>{item}</Text>
            </TouchableOpacity>
        )}
        />
      </View>
    </View>
  )
}

export default Calculator

const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width,
        backgroundColor: '#000',
        flex:1
    },
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
    zeroBtn:{
        flexGrow: 1,
        alignItems: 'flex-start',
        paddingLeft: 25
    },
    valueContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 0.9,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    value: {
        color: '#fff',
        fontSize: Dimensions.get('window').width * 0.2,
        marginRight: Dimensions.get('window').width * 0.1,
        marginBottom: Dimensions.get('window').width * 0.05
    },
    operand: {
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: Dimensions.get('window').width * 0.1,
        marginRight: Dimensions.get('window').width * 0.1,
    }
})