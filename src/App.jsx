import { useState } from 'react'

import './App.css'

import Die from './components/Die'

function App() {

    function randomRoll() {
        return Math.floor( Math.random() * 6 + 1)    
    }

    function genNewDice() {
        return Array.from({length:10}, (i) => ({ 
                value: randomRoll(),
                isHeld: false,
                id: i, 
            })
        )
    }

    function rollDice() {
        setDice( (prev) => prev.map( (die) => ( die.isHeld === false ? {...die, value:randomRoll()} : die)))
    }

    function toggleHold(index) {
        setDice( (prev) => prev.map( (die, idx) => idx === index ? {...die, isHeld: !die.isHeld} : die ) )
    }

    const [dice, setDice] = useState( genNewDice())

    function setAllDice() {
        setDice( genNewDice() )
    }


    const diceComponents = dice.map( (dieObj, i) => ( 
        <Die key={`die ${i}`} 
             number={dieObj.value}
             isHeld={dieObj.isHeld}
             toggleHold={toggleHold}
             index={i}
             />))  

    return (
        <main>
            <div className="diceSection">
                {diceComponents}
            </div>
            <button className="rollButton" onClick={rollDice}>roll</button>
        </main>

    )
}

export default App
