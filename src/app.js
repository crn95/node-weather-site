const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Cody Neal'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Cody Neal' 
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
       message: "This is the help page.",
       title: 'Help',
       name: 'Cody Neal'
    })
})


app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address term must be provided'
        })

    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
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

    // res.send({
    //     forecast: 'Expect rain today.',
    //     location: 'Houston',
    //     address: req.query.address
    // })
})

app.get('/products',  (req,res) => {

    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
     console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Cody Neal',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Cody Neal',
        errorMessage: 'Error 404: Page not found.'
    })
})

app.listen(3000,() => {
    console.log('Server listening on port 3000...')
})