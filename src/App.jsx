import './App.css'
import Die from './components/Die'

function App() {

    const dice = Array.from({length:10}, (_, i) => (<Die key={'die' + i} number={i+1} />))  

    return (
        <main>
            <div className="diceSection">
                {dice}
            </div>
        </main>
    )
}

export default App
