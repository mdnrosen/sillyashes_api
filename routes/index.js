const express = require('express')
const router = express.Router()


router.get('/test', async(req, res) => {
    res.json({ it: 'works' })
})






router.post('/test', async(req, res) => {
    try {
        res.json({ post: 'successfully'})
    } catch (err) {
        console.log(err)
    }
})


module.exports = router




