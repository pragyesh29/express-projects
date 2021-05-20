const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const {v4: uuidv4} = require('uuid')

const router = require('./router')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.use(session({
    // uuid4() is used to generate random hash code in order to make session secure.
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

// setting the directory where the templete files are located. Default is views directory in applcation root directory.
// setting the view engine we are using, here ejs is used hence it has been set as view engine.
app.set('views', './views')
app.set('view engine', 'ejs')

// Creating virtual paths or alias to the static directory, using path module, here __dirname is the project directory name.
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// Useing middleware to add all the routes from imported router module.
app.use('/route', router);

// home route
app.get('/', (req, res)=>{
    res.render('base', {title: "Login System"})
})

app.listen(PORT, ()=>{console.log(`Application started on http://localhost:${PORT}`)})