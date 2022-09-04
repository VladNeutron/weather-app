<template>
    <div class="wp__home">
        <img src="@/assets/images/home/Settings.png" alt="" @click="changePage()">
        <weather-card v-for="city in cities" :key="city" :weather="city"></weather-card>
    </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
export default {
    data(){
        return {

        }
    },
    components: {
        WeatherCard,
    },
    props: {
        cities: Array,
    },
    emits:{
        changePage: null,
    },
    methods:{
        changePage(){
            this.$emit('changePage')
        }
    },
}
</script>

<style lang="scss" scoped>
    .wp__home{
        width: 100%;
        position: relative;

        img{
            cursor: pointer;
            position: absolute;
            top: 5px;
            right: 5px;
            width: 30px;
        }
    }
</style>