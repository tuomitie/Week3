const mongoose = require('mongoose')

const url = 'mongodb://kokopino:verkonpaino@ds227858.mlab.com:27858/puhuttelu'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person
