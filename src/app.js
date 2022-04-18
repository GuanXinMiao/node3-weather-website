const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

console.log(__dirname)

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set hadnlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// app.com

// setup static directroy to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Guanxin Miao"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Guanxin Miao"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Guanxin Miao'
    }
    )
})
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:"You must provide a seach location"
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lon, lat, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // console.log(req.query.address)
    // res.send({
    //     location: 'sydney',
    //     forecast: 'sunny',
    //     address: req.query.address
    // })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Guanxin'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        errorMessage:'404 not found',
        name:'Guanxin'
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000. ')
})