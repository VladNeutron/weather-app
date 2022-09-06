import axios from "axios";
const URL = 'https://api.openweathermap.org/data/2.5/weather'
const APIKEY = '&appid=eb6c91f9d28891fd806549e1a5fd6d22&units=metric'

export function getServerCity(name) {
    let url = URL+`?q=${name}`+APIKEY
    return axios.get(url)
}

export function getUserCity(lat, lon){
    // let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eb6c91f9d28891fd806549e1a5fd6d22&units=metric`
    let url = URL+`?lat=${lat}&lon=${lon}`+APIKEY
    return axios.get(url)
}
