const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.use(morgan('tiny'))

app.get('/info', (req, res) => {
    const lkm = persons.length
    const aika = new Date()
    res.send(`<p>puhelinluettelossa on ${lkm} henkilön tiedot</p><p>${aika}</p>`)
})

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person.id
    }
}

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons.map(formatPerson))
        })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

if ( person ) {
    response.json(person)
} else {
    response.status(404).end()
}
})

const generateId = () => {
    const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
}

function arvoTunnus() {
    min = Math.ceil(10000);
    max = Math.floor(1);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function tarkistaLoytyyko(nimi) {
    const person = persons.find(person => person.name === nimi)
    return person
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'})
}
    if (body.number === undefined) {
    return response.status(400).json({error: 'number missing'})
}
    if (tarkistaLoytyyko(body.name)) {
    return response.status(400).json({error: 'person is already listed'})
    }

const person = {
    name: body.name,
    number: body.number,
    id: Number(arvoTunnus())
}

persons = persons.concat(person)

response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})