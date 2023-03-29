
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid')
const Person = require('../models/Person')



const s3_client = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})



exports.getPeople = async (req, res, next) => {
    try {
        const people = await Person.find()
        if (!people.length) {
            console.log('Success, but there are no people to return')
        }
        res.json(people)
    } catch (err) {
        console.log(err)
        next('Getting people just didn\'t work mate')
    }
}


exports.getPerson = async(req, res, next) => {
    try {
        console.log('trying to grab person')
        const person = await Person.findOne({ _id: req.params.id })

        const params = {
            Key: `${person.guessFileKey}.json`,
            Bucket: process.env.BUCKET_NAME
        }

        const command = new GetObjectCommand(params)
        const result = await s3_client.send(command)
        const guesses = await result.Body.transformToString()
        person.guesses = guesses

        res.send({
            _id: person._id,
            name: person.name,
            guesses
        })
    } catch(err) {
        next(err)
    }
}



exports.addPersonToDB = async(req, res, next) => {
    try {
        // generate file key and tack on to body
        req.body.guessFileKey = uuidv4();
        const person = await (new Person(req.body)).save()

        // res.json(`${person.name} added to DB.`)
        next()
    } catch (err) {

        // Send specific message if the username is already taken
        if (err.code === 11000) {
            return next({
                stack: err,
                status: 409,
                message: 'That name is already taken. Please use another.'
            })
        }
        next(err)
    }

    
}



exports.guessesToS3 = async(req, res, next) => {
    try {
        const { guesses, guessFileKey } = req.body
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${guessFileKey}.json`,
            Body: JSON.stringify(guesses),
            ContentType: 'application/json; charset=utf-8'

        }
        const command = new PutObjectCommand(params)
        await s3_client.send(command)

        res.json(`${req.body.name}. Your guesses have been added.`)
    } catch(err) {
        console.log(err)
        next(err)
    }
}



exports.deleteOnePerson = async(req, res, next) => {
    try {
        const result = await Person.findOneAndDelete({ _id: req.params.id })
        res.json(`${result.name} deleted. Bye Bye.`)
    } catch (err) {
        next(err)
    }
}