import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';






const ios = Platform.OS == 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [toprated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation= useNavigation();


  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log('got trending movies' , data)
    if (data  && data.results) setTrending(data.results);
    setLoading(false);
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log('got upcoming movies' , data)
    if (data  && data.results) setUpcoming(data.results);
    
  }
  
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log('got TopRated movies' , data)
    if (data  && data.results) setTopRated(data.results);
    
  }

  return (
    <View className="flex-1 bg-slate-950">
      {/* Search bar and logo  */}
      <SafeAreaView className={ios? "mb-2" : "mb-3"}>
        <StatusBar style='light'/>
        <View className= "flex-row justify-between items-center mx-4">
            <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white"/>
            <Text className=" text-white text-2xl font-bold"> <Text className="text-yellow-400">C</Text>elilensar</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('Search') } >
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white"/>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    
    {
      loading? (
        <Loading />
      ) : (
        <ScrollView 
        showsVerticalIndicator= {false}
        contentContainerStyle= {{paddingBottom: 10}}
       >
           {/* Trending Movies */}
          {<TrendingMovies data={trending}/> }
           {/* Upcoming */}
           <MovieList title="Upcoming" data={upcoming} />
           {/* TopRated */}
           <MovieList title="TopRated" data={toprated} />
       </ScrollView>
      )
    }
    
    



    </View>
  )
}