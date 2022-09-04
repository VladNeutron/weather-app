export function createStore(){
    if(!localStorage.getItem('cities')){
        localStorage.setItem('cities', '');
    }
}

export function getCities(){
    let cities = []
    if(localStorage.getItem('cities').length > 0){
        cities = localStorage.getItem('cities').split(',');
    }
    return cities;
}

export function orderCities(incomeCities){
    let cities = incomeCities
    localStorage.setItem('cities', cities.join(','));
}

export function checkCity(name){
    if(localStorage.getItem('cities').includes(name)){
        return true
    }
    else{
        return false
    }
}

export function addCity(city){
    let cities = []
    if(localStorage.getItem('cities').length > 0){
        cities = localStorage.getItem('cities').split(',');
    }
    console.log(cities)
    if(cities.indexOf(city) < 0){
        cities.push(city);
        localStorage.setItem('cities', cities.join(','))
    }
}

export function deleteCity(city){
    let cities = localStorage.getItem('cities').split(',');
    cities.splice(cities.indexOf(city),1)
    localStorage.setItem('cities', cities.join(','))
    console.log(localStorage.getItem('cities').split(','));
}