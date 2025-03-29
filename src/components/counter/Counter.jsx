import { useState } from 'react'
import './Counter.css'
import CounterButton from './CounterButton'

export default function Counter() {
    const [totalCount, setCount] = useState(0);

    function incrementCounterParent(by) {
        setCount(totalCount + by)
    }

    function decrementCounterParent(by) {
        let tot = totalCount - by
        if (tot < 0)
            setCount(0)
        else
            setCount(totalCount - by)
    }

    function resetCounter() {
        setCount(0)
    }

    return (
        <>
            <span className="totalCount">{totalCount}</span>
            <CounterButton by={1} incrementMethod={incrementCounterParent} decrementMethod={decrementCounterParent} totalCount={totalCount} />
            <CounterButton by={2} incrementMethod={incrementCounterParent} decrementMethod={decrementCounterParent} totalCount={totalCount} />
            <CounterButton by={3} incrementMethod={incrementCounterParent} decrementMethod={decrementCounterParent} totalCount={totalCount} />
            <button className="resetButton" onClick={resetCounter}>Reset</button>
        </>
    )
}

