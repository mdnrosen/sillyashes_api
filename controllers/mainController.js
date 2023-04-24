
const Person = require('../models/Person')


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

        const person = await Person.findOne({ _id: req.params.id })


        res.status(200).send({
            _id: person._id,
            name: person.name,
            guesses: JSON.parse(person.guesses)
        })
    } catch(err) {
        next(err)
    }
}



exports.addPersonToDB = async(req, res, next) => {
    try {
        req.body.guesses = JSON.stringify(req.body.guesses)
        const person = await (new Person(req.body)).save()

        res.status(201).send({
            message: `${person.name} added to DB`,
            data: person,
        })


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



exports.deleteOnePerson = async(req, res, next) => {
    try {
        const result = await Person.findOneAndDelete({ _id: req.params.id })
        res.json(`${result.name} deleted. Bye Bye.`)
    } catch (err) {
        next(err)
    }
}




