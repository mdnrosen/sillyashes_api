
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid')
const Person = require('../models/Person')



const s3_client = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})


const dummy = {
    name: 'Billy bob',
}

const data_A = require('../dummyData1.json')


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
            Key: guessFileKey,
            Body: Buffer.from(JSON.stringify(guesses))
        }
        const command = new PutObjectCommand(params)
        const result = await s3_client.send(command)

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