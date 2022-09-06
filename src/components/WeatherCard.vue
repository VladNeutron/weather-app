<template>
  <div class="wp-card">
    <div class="wp-card__city">
        {{ weather.data.name }}, {{ weather.data.sys.country }}
    </div>
    <div class="wp-card-temperature">
        <img :src="'http://openweathermap.org/img/wn/'+weather.data.weather[0].icon+'@2x.png'" alt="">
        <div>
            {{weather.data.main.temp}} °C
        </div>
    </div>
    <div class="wp-card__feels">
       Feels like: {{weather.data.main.feels_like}} °C
    </div>
    <div class="wp-card-description">
        <div class="wp-card__wind">
            <img src="@/assets/images/home/Wind.png" alt="">
            <span>{{weather.data.wind.speed}} m/s {{weather.data.wind.deg}} deg</span>
        </div>
        <div class="wp-card__preasure">
            <img src="@/assets/images/home/Pressure.png" alt="">
            <span>{{weather.data.main.pressure}} hPa</span>
        </div>
        <div class="wp-card__humidity">
            <span>Humidity: {{weather.data.main.humidity}} %</span>
        </div>
        <div class="wp-card__dew">
            <span>Dew point: {{weather.data.main.temp}} °C</span>
        </div>
        <div class="wp-card__visability">
            <span>Visability: {{weather.data.visibility/1000}} km</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        weather: Object,
    }
}
</script>

<style scoped lang="scss">
    .wp-card{
        margin-top: 15px;
        margin-bottom: 30px;
        font-size: 18px;
        color: #3a3a3a;

        .wp-card__city{
            font-size: 22px;
            font-weight: 700;
        }

        width: 100%;
        display: flex;
        flex-direction: column;

        .wp-card-temperature{
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 20px;
            margin-bottom: 10px;

            img{
                width: 70px;
            }
        }

        .wp-card__feels{
            margin-top: 10px;
        }
    }

    .wp-card-description{
        display: grid;
        grid-template-columns: 1fr 1fr;

        div{
            margin-top: 20px;
        }
    }

    .wp-card__wind{
        display: flex;

        img{
            width: 20px;
            height: 20px;
        }
    }

    .wp-card__preasure{
        display: flex;

        img{
            width: 20px;
            height: 20px;
        }
    }
</style>