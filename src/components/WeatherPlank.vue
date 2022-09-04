<template>
    <div class="wp-settings-card tasks__item" draggable="true">
        <img class="burger-img" src="@/assets/images/home/Menu.png" alt="" draggable="false">
        <span>{{city.data.name}}, {{city.data.sys.country}}</span>
        <img src="@/assets/images/home/Delete.png" alt="" @click="this.$emit('deleteCity', city.data.name)">
    </div>
</template>

<script>
export default {
    props: {
        city: Object,
    },
    emits:{
        deleteCity: null,
    },
    mounted(){

    },
}
</script>

<style lang="scss">
    .wp-settings-card{
        width: 100%;
        background-color: lightgrey;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        img{
            width: 20px;
            padding: 10px;
            cursor: pointer;
        }
    }
    
</style>