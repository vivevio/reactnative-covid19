import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import { Config } from '../Config'
import { Helper } from './Helper'

const date = new Date();
const STATISTIC = [
    {
        title: 'Confirmed Case',
        value: '0'
    },
    {
        title: 'Death',
        value: '0'
    },
    {
        title: 'Recovered',
        value: '0'
    }
]

const ApiClient = axios.create({
    baseURL: Config.STATISTIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 3000,
})

function fetchFromServer() {
    return ApiClient.get(`Indonesia`).then((response) => {
        return response.data
    })
} 

function fetchStatistic(generate=false) {

    return new Promise( async(resolve, reject) => {
        let current_time = date.getHours().toString()
        var result = {}
        const time_stored = await AsyncStorage.getItem(Config.KEY_STATISTIC)
    
        if(time_stored == null || time_stored != current_time ) {
            console.log('fetch from server')
            const data = await fetchFromServer()
            await AsyncStorage.setItem(Config.KEY_STATISTIC, current_time)
            await AsyncStorage.setItem(Config.STATISTIC_DATA, JSON.stringify(data))
            result = data
        } else {
            console.log('fetch from local')
            const statistic_data = await AsyncStorage.getItem(Config.STATISTIC_DATA)
            var result  = (statistic_data != null ) ? JSON.parse(statistic_data) : {}
        }
        resolve(result)
    })
}

function generateData( {confirmed, recovered, deaths} ) {
    var master = [...STATISTIC]

    master[0].value = Helper.formatNumber(confirmed.value)
    master[1].value = Helper.formatNumber(recovered.value)
    master[2].value = Helper.formatNumber(deaths.value)
    return master;
}

export const statisticService = {
    fetchStatistic,
    generateData
}