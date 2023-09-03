import React, {useState} from 'react';
import './App.css';
import Card from "./components/Card";

function App() {
    const [selected, setSelected] = useState<Set<number>>(new Set<number>());

    function handleCardClick(index: number) {
        console.log(index);
    }

    return (
        <>
            <h2>Memory Game</h2>
            <div className='card-grid'>
                <Card index={0} onClick={handleCardClick}/>
                <Card index={1} onClick={handleCardClick}/>
                <Card index={2} onClick={handleCardClick}/>
                <Card index={3} onClick={handleCardClick}/>
                <Card index={9} onClick={handleCardClick}/>
            </div>
        </>
    )
}

export default App;
