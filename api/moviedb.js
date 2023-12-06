import axios from "axios";

const apiKey= 'c04f1817b837efc479ad897083c3b888'

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

// dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const movieSimilarEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


export const image500= path => path? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342= path => path? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185= path => path? `https://image.tmdb.org/t/p/w185/${path}` : null;


const apiCall= async (endpoint, params) => {
    const options = {
        method : 'GET',
        url : endpoint,
        params : params? params:{}
    }
    try{
        const response = await axios.request(options);
        return response.data;

    }catch(error){
        console.log('error: ', error);
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndPoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndPoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndPoint)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = id => {
    return apiCall(movieSimilarEndpoint(id))
}
export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}