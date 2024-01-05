import createInstance from '@/utils/request.ts'
let requestInstance = new createInstance(import.meta.env.VITE_APP_WEATHER_BASE_URL);

export function getWeather(data) {
    return requestInstance({
        url: '/weather/v001/now',
        method: 'get',
        params:data
    })
}
