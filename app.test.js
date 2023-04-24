// werite line above using require syntax
const supertest = require('supertest')

const app = require('./app')

const dummyGuesses = require('./dummyData1.json')

// write a test to make sure a POST to /add has a name and guesses
describe('POST /add', () => {
    describe('Given a name and guesses object', () => {
        // should save the name and guesses to the database
        // should return a 201 status code
        test('Should return a 201', async () => {
            const response = await supertest(app).post('/add').send({
                name: 'Joe Bloggs',
                guesses: JSON.stringify(dummyGuesses)
            })
            expect(response.statusCode).toBe(201)
        })
    })

    // describe('Name or guesses is empty', () => {
    //     // should return a 400 status code

    // })

})