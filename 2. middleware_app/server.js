const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 3000;

// Middleware function
app.use((req, res, next)=>{
    console.log('Request Date: '+ new Date());
    // res.sendFile('./static/cool.txt')
    next()
})

// Second Middleware
app.use((req, res, next)=>{
    // using path module's join() function to join the different chunks of pahts to create virtual path to the requested static file.
    // __dirname is the root of folder, static is folder name, and req.url is the url or name of the file user requested.
    // The resultant path will be something like 'middleware_app/static/abc.exe'
    var filepath = path.join(__dirname, 'static', req.url)
    fs.stat(filepath, (err, fileinfo)=>{
        // If error found then move to the next middleware in the stack.
        if(err){
            next();
            return;
        }
        // If user is not requesting a valid file then move to next middleware in the stack. 
        // If everything is right then just return that particular file as a response to the user.
        if(fileinfo.isFile()){
            res.sendFile(filepath);
        }else{
            next();
        }
    })
})

// 404 Middleware Function, since this will the last middleware function, we are not passing next parameter.
// This Middleware will only execute if the file is not found in the url.
app.use((req, res)=>{
    res.status(404)
    res.send('File Not Found!')
})

app.listen(PORT, ()=>{console.log('application running on port :'+PORT);})