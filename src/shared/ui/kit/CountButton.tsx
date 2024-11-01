import {useEffect, useState} from "react";

const CountButton = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if(count > 5) {
            setCount(0);
        }
    }, [count]);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>increment</button>
            <span>{count}</span>
        </div>
    );
};

export default CountButton;