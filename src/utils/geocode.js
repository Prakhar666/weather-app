const request = require('request')

// const geocode = (address, callback) => {
//     const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicHJha2hhcjA2IiwiYSI6ImNrcXVqeTlldTA1N3kydm8xOGRzbWRsdXgifQ.LwGmNHFys5CRDG11AtuTVQ&limit=1'

//     request({ url: geoCodeUrl, json: true }, (error, response) => {
//         if (error) {
//             console.log('unable to connect');
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[0],
//                 longitude: response.body.features[0].center[1],
//                 location: response.body.features[0].place_name
//             })
//             console.log('unable tto find locations');
//         }
//     })

// }

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    request({ url: url, json: true }, (error, response) => {
        console.log('response', response.body);
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features && response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features && response.body.features[0].center[0],
                longitude: response.body.features && response.body.features[0].center[1],
                location: response.body.features && response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode