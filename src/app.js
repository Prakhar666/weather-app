const express = require('express')
const path = require('path')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const { request } = require('express')

const pathName = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(pathName))
app.get('', (req, res) => {
    res.render('index')
})
app.get('/help', (req, res) => {
    res.render('help', {
        customerservice: "customer Service"
    })
})
app.get('', (req, res) => {
    res.send("Hello Express!!!")
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return req.send({
            error: 'Please provide address'
        })
    }
    geocode(req.params.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'New York',
    //     address: req.query.address
    // })
})



// app.get('/products', (req, res) => {
//     console.log(req.query);
//     if(!req.query.search) {
//         return res.send({
//             error: 'You must provide search term'
//         })
//     }
//     res.send({
//         products: []
//     })
// })

app.get('/about', (req, res) => {
    res.send("About this app!")
})

app.get('*', (req, res) => {
    res.send('My 404 Page')
})

app.listen(3000, () => {
    console.log('Server is up on 3000');
})