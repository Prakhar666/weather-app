const request = require('request')

 const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=77ce662e156714a892b693b0bea85549&query=' + lat + ',' + long + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log('unable to connect', undefined);
        } else if(response.body.error) {
            callback('undefined')
        }
    })
 }

 module.exports = forecast