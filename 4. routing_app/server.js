const express = require('express')
const app = express()
const route = require('./router')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}))

// Middleware function to use the route in route module
app.use('/api', route)

// Home (Root) route
app.get('/',(req,res)=>{
    res.send('Routing app')
})

app.listen(PORT, ()=>{console.log(`Application running on http://localhost:${PORT}`)})