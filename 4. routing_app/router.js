const express = require('express')
const route = express.Router()
var accounts = require('./database')

// GET request
route.get('/accounts',(req,res)=>{
    res.json({userData: accounts})
})

// POST request
route.post('/accounts', (req,res)=>{
    const incomingAccount = req.body
    accounts.push(incomingAccount)
    res.json(accounts)
})

// GET request to get the data of particular user
// Passing id variable in the request which will contain the data from database for which user requested for.
route.get('/accounts/:id', (req, res)=>{
    // Extracting the id's data from url and converting it to number then storing into accountId variable.
    const accountId = Number(req.params.id)
    // Finding the correct desired accound from database on the basis of passed id parameter.
    const getAccount = accounts.find((account) => account.id == accountId )
    if(!getAccount) res.status(500).send('Account Not Found')
    else res.json({userData: [getAccount]})
})

// PUT request
route.put('/accounts/:id', (req, res)=>{
    const accountId = Number(req.params.id)
    const body = req.body
    const getAccount = accounts.find((account)=> account.id == accountId)
    const index = accounts.indexOf(getAccount)

    if(!getAccount){
        res.status(500).send('Account Not Found!')
    }else{
        const updatedAccount = {...getAccount, ...body}
        accounts[index] = updatedAccount
        res.send(updatedAccount)
    }
})

// DELETE request
route.delete('/accounts/:id', (req,res)=>{
    const accountId = Number(req.params.id)
    const getAccount = accounts.filter((account)=>account.id != accountId)
    if(!getAccount){
        res.status(500).send('Account Not Found!')
    }else{
        // eighter update the database array itself or use splice method
        accounts = getAccount
        res.send(accounts)
    }
})

module.exports = route