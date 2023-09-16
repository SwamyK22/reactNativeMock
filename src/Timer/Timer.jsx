import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React,{ useState } from 'react'

const Timer = () => {
    const [digit, setDigit] = useState(0);
    const [timer, setTimer] = useState(null);

    const increment = () => {
        if(timer === null) {
            const increment = setInterval(() => setDigit((d) => d + 1), 1000);
            setTimer(increment);
        } else {
            clearInterval(timer);
            const increment = setInterval(() => setDigit((d) => d + 1), 1000);
            setTimer(increment);
        }
    };

    const decrement = () => {
        if(timer === null) {
            const decrement = setInterval(() => setDigit((d) => {
                if(d === 1) {
                    clearInterval(decrement);
                    setTimer(null);
                    return 0;
                }
                
                else return d - 1;
            }), 1000);
            setTimer(decrement);
        } else {
            clearInterval(timer);
            const decrement = setInterval(() => setDigit((d) => {
                if(d === 1) {
                    clearInterval(decrement);
                    setTimer(null);
                    return 0;
                };
                return d - 1;
            }), 1000);
            setTimer(decrement);
        }
    }

    const stop = () => {
        clearInterval(timer);
        setTimer(null)
    }
    const clear = () => {
        clearInterval(timer);
        setTimer(null)
        setDigit(0)
    }
    

  return (
    <View style={styles.container}>
      <View style={styles.digitContainer}>
        <Text style={styles.digit}>{digit}</Text>
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={increment} style={styles.btn}>
            <Text style={styles.btnText}>Increment</Text>
        </Pressable>
        <Pressable onPress={decrement} style={styles.btn}>
            <Text style={styles.btnText}>Decrement</Text>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={stop} style={styles.btn}> 
            <Text style={styles.btnText}>Stop</Text>
        </Pressable>
        <Pressable onPress={clear} style={styles.btn}>
            <Text style={styles.btnText}>Clear</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('window').width,
        alignItems:'center',
        justifyContent: 'space-evenly',
        flex:1,
        backgroundColor: '#123'

    },
    digitContainer:{
        height: Dimensions.get('window').width * 0.7,
        justifyContent:'center'
    },
    digit:{
        // fontWeight: "bold",
        fontSize: 110,
        textAlign: "center",
        color:'#4deeea'
    },
    btn:{
        width: Dimensions.get('window').width * 0.4,
        height:45,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#74ee15',
        borderRadius: 15
    },
    btnText:{
        fontSize: 18,
        fontWeight:'500'
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent: 'space-evenly',
        width: '100%',
    }
})