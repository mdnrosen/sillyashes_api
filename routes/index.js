const express = require('express')
const router = express.Router()

const mc = require('../controllers/mainController')

router.get('/test', async(req, res) => {
    res.json({ it: 'works' })
})


router.get('/people', mc.getPeople)
router.get('/:id', mc.getPerson)



router.post('/add', mc.addPersonToDB)


// I don't even need an update cos i made the frontend a wanker yay
router.delete('/person/:id', mc.deleteOnePerson)




module.exports = router





