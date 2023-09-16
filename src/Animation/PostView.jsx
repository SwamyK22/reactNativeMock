import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import {GestureDetector, Gesture} from 'react-native-gesture-handler'

const PostView = ({navigation, route}) => {

    const { url, id } = route.params;

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);


    const gesture = Gesture.Pan().onUpdate((value) => {
        translateX.value = value.translationX * 0.8;
        translateY.value = value.translationY * 0.8;
        const distance = Math.sqrt(
            value.translationX * value.translationX + value.translationY * value.translationY,
        )
        const scaleValue = Math.min(Math.max(distance/100, 1), 0.9);
        scale.value = withTiming(scaleValue, {duration: 300}) 
    }).onEnd(() =>{
        if(translateY.value > 50){
            opacity.value = 0;
            runOnJS(navigation.goBack)();
        } else {
        translateX.value = withTiming(0,{duration: 300});
        translateY.value = withTiming(0,{duration: 300});
        scale.value = withTiming(1,{duration:500})
     }
    });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}, {translateY: translateY.value}, {scale:scale.value}],
        backgroundColor: interpolateColor(opacity.value, [0, 1], ['transparent', 'white']),
        borderRadius: 20,
        overflow:'hidden'
    }))
    
  return (
    <GestureDetector gesture={gesture}>
    <Animated.View 
    shearedTransitionsTag={id.toString()}
    style={[styles.conatainer, animatedStyle]}
    >
      <Animated.Image source={{uri:url}} 
      style={styles.img}
      shearedTransitionsTag={id.toString()+1}
      />
    </Animated.View>
    </GestureDetector>
  )
}

export default PostView

const styles = StyleSheet.create({
    conatainer: {
        flex:1,
    },
    img:{
        width: Dimensions.get('window').width,
        height: '100%',
    }
})