import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const Posts = ({navigation}) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const res = await fetch('https://dummyjson.com/products')
        const value = await res.json();
        setData(value.products)
    }
    useEffect(() => {
        fetchData()
    }, [])
  return (
    <View>
      <FlatList 
      data={data}
      numColumns={4}
      key={4}
      keyExtractor={(item,index) => item.id.toString()}
      renderItem={({item}) => (
        <TouchableOpacity 
        onPress={() => navigation.navigate('View',{ url: item.thumbnail, id:item.id})}
        >
            <Animated.View
            shearedTransitionsTag={item.id.toString()}
            >
                <Animated.Image source={{uri:item.thumbnail}} style={styles.img} 
                shearedTransitionsTag={item.id.toString() + 1}
                />
            </Animated.View>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({
    img:{
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width /4,
    }
})