import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Posts from './Posts';
import PostView from './PostView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stack = createStackNavigator();


const StackNav = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                presentation: 'transparentModal',
            }}
        >
            <Stack.Screen name='Posts' component={Posts} />
            <Stack.Screen name='View' component={PostView}  options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default StackNav