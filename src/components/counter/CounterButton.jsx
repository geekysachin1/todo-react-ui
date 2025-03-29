// import { useState } from 'react';

export default function CounterButton({ by, incrementMethod, decrementMethod, totalCount }) {

    // const [count, setCount] = useState(0);

    // function incrementCounter() {
    //     //setCount(totalCount + by);
    //     incrementMethod(by);
    // }

    // function decrementCounter() {
    //     if (totalCount > 0) {
    //         //setCount(totalCount - by);
    //         decrementMethod(by);
    //     }
    // }



    return (
        <>
            <div className="Counter">
                {/* <span className="count">{count}</span> */}
                <div>
                    <button className="counterButton"
                        // onClick={incrementCounter}
                        onClick={() => incrementMethod(by)}
                    >
                        +{by}
                    </button>
                    <button className={totalCount < 1 ? "disabledButton" : "counterButton"}
                        // onClick={decrementCounter} 
                        onClick={() => decrementMethod(by)}
                        disabled={totalCount < 1}>
                        -{by}
                    </button>

                </div>
            </div>
        </>
    );
}
