import { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import './App.css'

import Die from './components/Die'

function App() {
    const {width, height} = useWindowSize();

    function randomRoll() {
        return Math.floor( Math.random() * 6 + 1)    
    }

    function gameWon() {
        let diceState = dice.reduce( (prev, die) => {
            if (prev.value === 0) {
                prev.value = die.value;
            }

            return ({
                ...prev,
                same: prev.same && (die.value === prev.value),
                isHeld: prev.isHeld && die.isHeld,
            })
        }, {value: 0, same: true, isHeld: true})

        return (diceState.same === true) && (diceState.isHeld === true)
    }

    function altGameWon() {
         return dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)
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

    const [dice, setDice] = useState( () => genNewDice())


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

    console.log(`Game Won: ${altGameWon()}`)

    return (
        <>
        { gameWon() ? <Confetti width={width} height={height} /> : null}
        <main>
            <div className="text">
            <h1>Tenzies</h1>
            <p>
                {gameWon() ? (<b>You Won!</b>) : "Roll the dice until they are all the same."}
                <br />
                {gameWon() ? "Would you like to play again?" : "Click the dice to lock in their values."}
            </p>
            </div>
            <div className="diceSection">
                {diceComponents}
            </div>
            <button className="rollButton" onClick={(altGameWon()) ? setAllDice : rollDice}>
                { (altGameWon()) ? "Play Again" : "Roll"}
            </button>
        </main>
        </> 
    )
}

export default App
