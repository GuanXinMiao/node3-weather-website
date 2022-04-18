const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=9b8b5c201d4222f6fbb3c9764b631813&query=37/8267,-122.4233'

// request({ url: url, json: true}, (error, response) =>{
//     if (error){
//         console.log('Unable to connect to weather service')
//         console.log(error)
//     }else if (response.body.error){
//         console.log("ubable to find location")
//     }
    
//     else{
//     const currInfo = response.body.current
//     console.log(currInfo.weather_descriptions[0] + " It is currently " + currInfo.temperature.toString()+ " degrees out. It feels like " + currInfo.feelslike + " degress out.")
//     }
// }) 

const forecast = (lat, lon, callback) =>{
    url = 'http://api.weatherstack.com/current?access_key=9b8b5c201d4222f6fbb3c9764b631813&query=' +lat+ ',' + lon
    
    request({url:url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('ubable to find location', undefined)
        }else{
            const currInfo = body.current
            callback(undefined, {weather: currInfo.weather_descriptions[0],
            temp: currInfo.temperature.toString(),
            feelslike: currInfo.feelslike
        })
        }
    })
}

module.exports = forecast