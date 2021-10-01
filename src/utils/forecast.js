const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=a0984b817bc160c2664f071229ae5929&query=' + latitude + ',' + longitude + '&units=f';

    //API request - Current weather
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!')
        }else if(body.error){
            callback('Unable to find location')
        } else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + '. There is a ' + body.current.precip + '% chance of rain today.')
        }
    
        
    })

}


module.exports = forecast