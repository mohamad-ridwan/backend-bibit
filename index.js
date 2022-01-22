const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const multer = require('multer')

const app = express()

app.use(cors())

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const navbarRoutes = require('./src/routes/navbar')
const categoryRoutes = require('./src/routes/category')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images')
    },
    filename: (req, file, cb)=>{
        cb(null, `${new Date().getTime()}` + '-' + file.originalname)
    }
})

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage}).single('image'))

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credential", "true")
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})

app.use('/v1/navbar', navbarRoutes)
app.use('/v2/category', categoryRoutes)

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