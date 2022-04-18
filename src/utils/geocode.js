const request = require('request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZ3VhbngiLCJhIjoiY2wxc3pqem90MDNpOTNscGYxdmoyMmg0YiJ9.8M9KLLtUnJwpgycV4OuiWw&limit=1"
    request({url: url, json: true}, (error, {body}) =>{
        
        if (error){
            callback('Unable to connect to location service!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location, Try another searth', undefined)
        }
        else{
            const geoInfo = body
            //console.log(geoInfo)
            callback(undefined, {lat:geoInfo.features[0].center[0] ,
                lon:geoInfo.features[0].center[1],
                location: geoInfo.features[0].place_name
                })
        }
    })
} 
module.exports = geocode