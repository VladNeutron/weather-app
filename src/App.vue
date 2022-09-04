<template>
  <div class="wp__container">
    <weather-home :cities="cities" v-if="page=='home'" @changePage="changePages"></weather-home>
    <weather-settings 
      :cities="cities" 
      @changePage="changePages" 
      @addCity="addCity" 
      @deleteCity="deleteCityApp"
      @changePosition="changeOrder" 
      v-else>
    </weather-settings>
  </div>
</template>

<script>
import WeatherHome from './views/WeatherHome.vue'
import WeatherSettings from './views/WeatherSettings.vue'
import {createStore, getCities, deleteCity, orderCities, addCity} from './services/storage.js'
import { getServerCity, getUserCity } from './api/api.js'


export default {
  data(){
    return {
      page: 'home',
      cities: [],
      weather : [{
          "data": {
              "coord": {
                  "lon": -0.1257,
                  "lat": 51.5085
              },
              "weather": [
                  {
                      "id": 804,
                      "main": "Clouds",
                      "description": "overcast clouds",
                      "icon": "04d"
                  }
              ],
              "base": "stations",
              "main": {
                  "temp": 20.69,
                  "feels_like": 20.77,
                  "temp_min": 17.85,
                  "temp_max": 23.47,
                  "pressure": 1013,
                  "humidity": 75
              },
              "visibility": 10000,
              "wind": {
                  "speed": 3.09,
                  "deg": 50
              },
              "clouds": {
                  "all": 100
              },
              "dt": 1662113459,
              "sys": {
                  "type": 2,
                  "id": 268730,
                  "country": "GB",
                  "sunrise": 1662095676,
                  "sunset": 1662144380
              },
              "timezone": 3600,
              "id": 2643743,
              "name": "London",
              "cod": 200
          },
          "status": 200,
          "statusText": "OK",
          "headers": {
              "content-length": "473",
              "content-type": "application/json; charset=utf-8"
          },
          "config": {
              "transitional": {
                  "silentJSONParsing": true,
                  "forcedJSONParsing": true,
                  "clarifyTimeoutError": false
              },
              "transformRequest": [
                  null
              ],
              "transformResponse": [
                  null
              ],
              "timeout": 0,
              "xsrfCookieName": "XSRF-TOKEN",
              "xsrfHeaderName": "X-XSRF-TOKEN",
              "maxContentLength": -1,
              "maxBodyLength": -1,
              "env": {
                  "FormData": null
              },
              "headers": {
                  "Accept": "application/json, text/plain, */*"
              },
              "method": "get",
              "url": "https://api.openweathermap.org/data/2.5/weather?q=London&appid=eb6c91f9d28891fd806549e1a5fd6d22&units=metric"
          },
          "request": {}
      }]
    }
  },
  methods:{
    changePages(){
      this.page == 'home' ? this.page = 'settings' : this.page = 'home'
    },
    addCity(info){
      this.cities.push(info)
    },
    getOnLoad(){
      let localCities = getCities();
      let reloadedCities = []
      let resulted = localCities.reduce((accum, item)=>{
        
        console.log(accum)
        return accum.then(res=>{
          return getServerCity(item).then((result)=>{reloadedCities.push(result)})
        })
      }, Promise.resolve())
      resulted.then(r=>{this.cities = reloadedCities})
      
    },
    deleteCityApp(name){
      deleteCity(name)
      this.getOnLoad();
    },
    changeOrder(active, next, lastElement){

      let localCities = getCities();
      let appCities = this.cities;
      console.log(localCities)

      let endArrLocal = this.changeOrderF(localCities, active, next, lastElement)
      orderCities(endArrLocal)

      let endArrApp = this.changeOrderF(appCities, active, next, lastElement)
      this.cities = endArrApp;
    },
    changeOrderF(arr, active, next, lastElement){

      if(lastElement){
        let activeEl = arr[active];

        let firstPart = arr.slice(0,active)
        let secondPart = arr.slice(active+1)
        
        let midd = firstPart.concat(secondPart);

        midd.push(activeEl);
        
        return midd
      }

      if(active<next){
        next=next-1
      }

      let activeEl = arr[active];

      let firstPart = arr.slice(0,active)
      let secondPart = arr.slice(active+1)
      
      let midd = firstPart.concat(secondPart);

      firstPart = midd.slice(0,next)
      secondPart = midd.slice(next)
      firstPart.push(activeEl);

      let endArr = firstPart.concat(secondPart)

      return endArr
    },
  },
  name: 'App',
  components: {
    WeatherHome,
    WeatherSettings,
    WeatherHome,
    WeatherHome
},
  mounted(){
    createStore();
    if(getCities().length > 0){
      this.getOnLoad();
    }
    else{
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          let userCity = getUserCity(position.coords.latitude, position.coords.longitude);
          userCity.then(
            (res)=>{
              addCity(res.data.name)
              this.cities.push(res);
            }
          )
        });
      } else {
        alert('Allow access to your location, to see weather in your region')
      }
    }
    
  },
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wp__container{
  max-width: 340px;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
