import axios from "axios";

export function getServerCity(name) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=eb6c91f9d28891fd806549e1a5fd6d22&units=metric`
    // axios.get(url)
    //   .then(function (response) {
    //     console.log(response)
    //     return response
    //   }).catch((error)=>{
    //     console.log(error.response.status)
    //     return false
    //   });


    // return new Promise((resolve,reject)=>{
    //     resolve({ 
    //         "data": {
    //             "coord": {
    //                 "lon": -0.1257,
    //                 "lat": 51.5085
    //             },
    //             "weather": [
    //                 {
    //                     "id": 804,
    //                     "main": "Clouds",
    //                     "description": "overcast clouds",
    //                     "icon": "04d"
    //                 }
    //             ],
    //             "base": "stations",
    //             "main": {
    //                 "temp": 20.69,
    //                 "feels_like": 20.77,
    //                 "temp_min": 17.85,
    //                 "temp_max": 23.47,
    //                 "pressure": 1013,
    //                 "humidity": 75
    //             },
    //             "visibility": 10000,
    //             "wind": {
    //                 "speed": 3.09,
    //                 "deg": 50
    //             },
    //             "clouds": {
    //                 "all": 100
    //             },
    //             "dt": 1662113459,
    //             "sys": {
    //                 "type": 2,
    //                 "id": 268730,
    //                 "country": "GB",
    //                 "sunrise": 1662095676,
    //                 "sunset": 1662144380
    //             },
    //             "timezone": 3600,
    //             "id": 2643743,
    //             "name": name,
    //             "cod": 200
    //         },
    //         "status": 200,
    //         "statusText": "OK",
    //         "headers": {
    //             "content-length": "473",
    //             "content-type": "application/json; charset=utf-8"
    //         },
    //         "config": {
    //             "transitional": {
    //                 "silentJSONParsing": true,
    //                 "forcedJSONParsing": true,
    //                 "clarifyTimeoutError": false
    //             },
    //             "transformRequest": [
    //                 null
    //             ],
    //             "transformResponse": [
    //                 null
    //             ],
    //             "timeout": 0,
    //             "xsrfCookieName": "XSRF-TOKEN",
    //             "xsrfHeaderName": "X-XSRF-TOKEN",
    //             "maxContentLength": -1,
    //             "maxBodyLength": -1,
    //             "env": {
    //                 "FormData": null
    //             },
    //             "headers": {
    //                 "Accept": "application/json, text/plain, */*"
    //             },
    //             "method": "get",
    //             "url": "https://api.openweathermap.org/data/2.5/weather?q=London&appid=eb6c91f9d28891fd806549e1a5fd6d22&units=metric"
    //         },
    //         "request": {}
    //     })
    // })
    

    return axios.get(url)
}

export function getUserCity(lat, lon){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eb6c91f9d28891fd806549e1a5fd6d22&units=metric`
    return axios.get(url)
}
