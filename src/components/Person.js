import React from 'react'

const Person = ({ person, poistaNumero }) => {
    if (person.name != null) {
    return (
        <tr key={person.id}><td className="nimisarake">{person.name}</td><td className="numerosarake">{person.number}</td><td><button onClick={poistaNumero}>poista</button></td></tr>
    )}
    else {  // This is to remove the button when user has been removed
        return (
            <tr key={person.id}><td>{person.name}</td><td>{person.number}</td></tr>
        )
    }
}

export default Person