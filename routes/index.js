const express = require('express')
const router = express.Router()

const mc = require('../controllers/mainController')

router.get('/test', async(req, res) => {
    res.json({ it: 'works' })
})


router.get('/people', mc.getPeople)

router.post('/add', 
    // add them to the DB, generate a fileKey and check for duplicate username
    mc.addPersonToDB

    // handle the guesses JSON and put that into an S3 bucket
)


router.post('/s3test', mc.JSONtoS3)

// I don't even need an update cos i made the frontend a wanker yay
router.delete('/person/:id', mc.deleteOnePerson)




module.exports = router





