const express = require('express')
const morgan = require('morgan')
const { v4:uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Defining custom morgan token
morgan.token('id', (req)=>{
    return req.id
})

// Middleware function to specify unique id to every request through uuid module
app.use((req, res, next)=>{
    // Creating random id
    req.id = uuidv4()
    next()
})

// Creating a log file to store the morgan log into it.
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// Getting type of request method, status, url, http version by passing predefined tokens in morgan function
// To know more about morgan module visit : (https://github.com/expressjs/morgan/blob/master/README.md)
app.use(morgan(':id :method :status :url "HTTP/:http-version"'))
// Passing log data into file by selecting the file as output stream
app.use(morgan(':id :method :status :url "HTTP/:http-version"', {stream: accessLogStream}))

// Creating route to display the / root of application
app.get('/', (req,res)=>{
    res.end("Morgan Logger App")
})

app.listen(PORT, ()=>{console.log('Server is running on http://localhost:'+PORT)})