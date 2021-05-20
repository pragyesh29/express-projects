// In this file we will create different routes across our application.
var express = require('express')
var router = express.Router();

// This value is just used for testing purpose, otherwise we will get the data from the database.
var credential = {
    email: 'admin@gmail.com',
    password: 'admin123'
}

// login user route
router.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email
        res.redirect('/route/dashboard')
    }else{
        res.end('Invalid Credentials')
    }
})

// dashboard route
router.get('/dashboard', (req, res)=>{
    if(req.session.user) res.render('dashboard', {user: req.session.user})
    else res.send('Unauthorized User')
})

// logout route
router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error')
        }else{
            res.render('base', {title: "Express", logout: "Successfully Logged out...!!"})
        }
    })
})

module.exports = router;