import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window')

export default function TrendingMovies({data}) {
    navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }


  return (
    <View>
      <Text className="mx-4 text-xl text-bold text-white mt-8 mb-5">Trending</Text>
      <Carousel
      data={data}
      renderItem={({item}) => <MovieCard item= {item} handleClick={handleClick} />}
      firstItem={1}
      inactiveSlideOpacity={0.5}
      sliderWidth={width}
      itemWidth={width*0.58}
      slideStyle={{display: "flex", alignItems : "center"}}
      />
    </View>
  )
}

const MovieCard = ({item, handleClick}) => {
  console.log('item.poster_path: ', item.poster_path)
    return (
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <Image
            // source={require('../assets/images/moviePoster1.png')} 
            source= {{uri : image500(item.poster_path)}}
            
            style={{
                width: width*0.52,
                height: height*0.4
            }} className="rounded-3xl" />
        </TouchableWithoutFeedback>
    )
}