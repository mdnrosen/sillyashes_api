
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const Person = require('../models/Person')
const dummy = {
    name: 'Billy bob',
    guessFileKey: '1a2b3c4d'
}

const data_A = require('../dummyData1.json')


console.log(data_A)
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


exports.addPerson = async(req, res, next) => {
    try {
        const person = (new Person(dummy)).save()
        res.json(`${person.name} added to DB.`)
    } catch {
        next(err)
    }
}