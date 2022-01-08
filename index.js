const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

app.use(cors())

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// const navbarRoutes

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credential", "true")
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})

app.use((error, req, res, next)=>{
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

const uri = process.env.MONGO_DB_URI

const PORT = process.env.PORT || 6500

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(PORT, ()=>console.log(`server connect on ${PORT}`))
})
.catch(err=>console.log(err))