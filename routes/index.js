const express = require('express')
const router = express.Router()

const mc = require('../controllers/mainController')

router.get('/test', async(req, res) => {
    res.json({ it: 'works' })
})



router.get('/people', mc.getPeople)
router.post('/add', mc.addPerson)




router.post('/test', async(req, res) => {
    try {
        res.json({ post: 'successfully'})
    } catch (err) {
        console.log(err)
    }
})


module.exports = router




