const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const Person = require("./models/person")

app.use(express.static("build"))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan("tiny"))

const formatPerson = (person) => {
	return {
		name: person.name,
		number: person.number,
		id: person.id
	}
}

app.get("/api/people", (request, response) => {
	Person
		.find({})
		.then(persons => {
			response.json(persons.map(formatPerson))
		})
})

app.get("/api/people/:id", (request, response) => {
	Person
		.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(formatPerson(person))
			} else {
				response.status(404).end()
			}
		})
		.catch(error => {
			console.log(error)
			response.status(400).send({ error: "malformatted id" })
		})
})

app.post("/api/people", (request, response) => {
	const body = request.body

	if (body.name === undefined) {
		return response.status(400).json({ error: "name missing" })
	}
	if (body.number === undefined) {
		return response.status(400).json({ error: "number missing" })
	}
	/*    if (tarkistaLoytyyko(body.name)) {
            return response.status(400).json({error: 'person is already listed'})
    }*/

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person
		.save()
		.then(savedPerson => {
			response.json(formatPerson(savedPerson))
		})
		.catch(error => {
			console.log(error)
			response.status(400).send({ error: "malformatted id" })
		})
})

app.put("/api/people/:id", (request, response) => {
	const body = request.body
	const person = {
		name: body.name,
		number: body.number
	}

	Person
		.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => {
			response.json(formatPerson(updatedPerson))
		})
		.catch(error => {           // Not effective in catching unhandled promise rejection :(
			console.log(error)
			response.status(400).send({ error: "Duplicate name" })
		})
})

app.delete("/api/people/:id", (request, response) => {
	Person
		.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => {
			response.status(400).send({ error: "malformatted id" })
		})
})


app.get("/info", (req, res) => {
	Person
		.find({}).count()
		.then(result => {
			const aika = new Date()
			res.send(`<p>puhelinluettelossa on ${result} henkilön tiedot</p><p>${aika}</p>`)
		}).catch(error => {
			console.log(error)
		})
})

/*
function tarkistaLoytyyko(nimi) {
    const person = persons.find(person => person.name === nimi)
    return person
}
*/

/*function arvoTunnus() {       // Ei enää käytössä tietokannan huolehtiessa id:istä
    min = Math.ceil(10000);
    max = Math.floor(1);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}*/

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})