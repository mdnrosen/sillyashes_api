require('dotenv').config()
const express = require('express')
const app = express()
const AWS = 'aws-sdk'
const PORT = process.env.PORT
const routes = require('./routes/index')



app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`)
})


app.use('/', routes)


