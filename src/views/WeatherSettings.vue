<template>
  <div class="wp-setings">
    <div class="wp-setting-header">
        Settings
        <img src="@/assets/images/home/Close.png" alt="" @click="this.$emit('changePage')">
    </div>
    <ul id="tasks__list">
        <weather-plank v-for="(city, ind) in cities" :key="city" :city="city" @deleteCity="deleteCitySettings" :id="'wplank'+ ind"></weather-plank>
    </ul>
    <div class="wp-setings-add">
        Add Location:
        <div class="wp-input-container">
            <input type="text" v-model="newCity" @keyup.enter="addCityCheck()">
            <img src="@/assets/images/home/Done.png" alt="" @click="addCityCheck()">
        </div>
    </div>

  </div>
</template>

<script>
import WeatherPlank from '@/components/WeatherPlank.vue'
import { addCity, checkCity } from '@/services/storage.js'
import { getServerCity } from '@/api/api.js'

export default {
    data(){
        return{
            newCity: '',
        }
    },
    props: {
        cities: Array,
    },
    emits:{
        changePage: null,
        addCity: null,
        deleteCity: null,
        changePosition: null,
    },
    methods:{
        addCityCheck(){
            if(!checkCity(this.newCity)){
                getServerCity(this.newCity).then(res=>{
                    if(res){
                    addCity(this.newCity)
                    this.$emit('addCity', res)
                    this.newCity = '';
                }
                })
                .catch(err=>{
                    console.log('asd')
                    alert("Wrong citie's name!")
                    this.newCity = '';
                })
                
            }
        },
        deleteCitySettings(name){
            this.$emit('deleteCity', name)
        }
    },
    components: { WeatherPlank },
    mounted(){
        const tasksListElement = document.querySelector(`#tasks__list`);
        const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);

        // Перебираем все элементы списка и присваиваем нужное значение
        for (const task of taskElements) {
        task.draggable = true;
        }

        tasksListElement.addEventListener(`dragstart`, (evt) => {
            evt.target.classList.add(`selected`);
        })

        tasksListElement.addEventListener(`dragend`, (evt) => {
            evt.target.classList.remove(`selected`);
        });

        tasksListElement.addEventListener(`dragover`, (evt) => {
        // Разрешаем сбрасывать элементы в эту область
        evt.preventDefault();

        // Находим перемещаемый элемент
        const activeElement = tasksListElement.querySelector(`.selected`);
        // Находим элемент, над которым в данный момент находится курсор
        let currentElement = evt.target;
        // Проверяем, что событие сработало:
        // 1. не на том элементе, который мы перемещаем,
        // 2. именно на элементе списка
        if(currentElement.classList.contains('burger-img')){
            currentElement = currentElement.parentElement
        }
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`tasks__item`);

        // Если нет, прерываем выполнение функции
        if (!isMoveable) {
            return;
        }
        
        //Проверяем последний ли элемент

        let lastElement = false

        let activeInd = Number(activeElement.id.match(/\d+/)[0]);
        let nextInd = 0;

        if(currentElement.nextElementSibling == null){
            lastElement = true;
        }
        else{
            // Находим элемент, перед которым будем вставлять
            const nextElement = (currentElement === activeElement.nextElementSibling) ?
                currentElement.nextElementSibling :
                currentElement;
            nextInd = Number(nextElement.id.match(/\d+/)[0]);
        }

        

        // console.log(activeInd);
        // console.log(nextInd);

        this.$emit('changePosition', activeInd, nextInd, lastElement)
        // Вставляем activeElement перед nextElement
        // tasksListElement.insertBefore(activeElement, nextElement);
        });
    },
}
</script>

<style lang="scss" scoped>
    ul{
        padding: 0;
        margin: 0;
    }
    .wp-setting-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 22px;
        font-weight: 700;

        img{
            cursor: pointer;
            width: 30px;
        }
    }

    .wp-setings-add{
        width: 100%;
        margin-top: 15px;
        font-size: 18px;
        font-weight: 600;
    }

    .wp-input-container{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        input{
            width: 80%;
        }

        img{
            width: 30px;
        }
    }
    
</style>

<style>
    .selected{
        background-color: bisque;
    }
    .tasks__list{
        margin: 0;
        padding: 0;
    }
</style>