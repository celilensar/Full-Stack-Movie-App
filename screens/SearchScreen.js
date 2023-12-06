import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TextInput } from 'react-native'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { Image } from 'react-native'
import Loading from '../components/Loading'
import { debounce } from 'lodash'
import { image185, searchMovies } from '../api/moviedb'

export default function SearchScreen() {

    var {width, height} = Dimensions.get('window')
    const navigation = useNavigation();
    const [results, setResults]= useState([])
    const [loading, setLoading] = useState(false)

    let movieName= "Ant-Man and the Wasp: Quantumania";
    const handleSearch = value =>{
        if(value && value.length>2) {
            setLoading(true)
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data=> {
                setLoading(false);
                // console.log('got movies ::', data)
                if(data && data.results) setResults(data.results)       
             })
        }else {
            setLoading(false)
            setResults([])
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
  return (
    <SafeAreaView className=" bg-slate-950 flex-1">
      <View className=" mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
            <TextInput
                onChangeText= {handleTextDebounce}
                placeholder='Search Movie'
                placeholderTextColor={'lightgray'}
                className=' pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
            />
            <TouchableOpacity onPress={ () => { navigation.navigate('Home')}}
            className=" rounded-full p-3 m-1 bg-neutral-500">
                <XMarkIcon size={25} color="white"/>
            </TouchableOpacity>
      </View>
        {/* results */}
        {
            loading? (
                <Loading />
            ) : 
            results.length>0? (
                <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:12}}
        className="space-y-3">
            <Text className="text-white font-semibold ml-1 "> Results ({ results.length})</Text>
            <View className=" flex-row justify-between flex-wrap">
                {
                    results.map((item,index) => {
                        return (
                            <TouchableWithoutFeedback key={index}
                            onPress={() => navigation.push("Movie", item)}
                            >
                                <View className="space-y-2 mb-4">
                                    <Image className="rounded-3xl"
                                    source={{uri: image185(item?.poster_path)}}
                                    style={{width: width*0.40, height: height*0.3}}/>

                                    <Text className="text-neutral-300 ml-1">
                                        {
                                    item?.title.length>22? item.title.slice(0,22)+ '...' : item.title
                                    }
                                    </Text>

                                </View>

                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>

        </ScrollView>
            ) : ( 
                <View className="flex-row flex-1 justify-center items-center ">
                    <Image source={require('../assets/images/watching.png')}
                    className="h-40 w-40 items-center "/>
                </View>
            )
        }




        
    </SafeAreaView>
  )
}