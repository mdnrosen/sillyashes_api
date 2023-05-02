require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT
const db = require('./db')
const routes = require('./routes/index')

app.use(express.json())
app.set('port', 7777)
app.use(cors({
    origin: '*'
}))


app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`)
})


app.use('/', routes)

app.use((err, req, res, next) => {
    console.log('*** CAUGHT THE ERROR ***')
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Something broke!')

})


module.exports = app


