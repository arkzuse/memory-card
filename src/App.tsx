import React, {useState} from 'react';
import './App.css';
import Card from "./components/Card";

const selected = new Set<number>();

function getCards() {
    const cards : number[] = [];

    while (cards.length < 5) {
        const random = Math.floor(Math.random() * 10);
        if (!cards.includes(random)) {
            cards.push(random);
        }
    }

    let used = 0;
    cards.forEach(x => {
        if (selected.has(x)) {
            used++;
        }
    });
    if (used === 5) {
        const remove = Math.floor(Math.random() * 5);

        while (true) {
            const newCard = Math.floor(Math.random() * 10);

            if (!selected.has(newCard)) {
                cards[remove] = newCard;
                break;
            }
        }
    }

    return cards;
}

function App() {
    const [score, setScore] = useState(0);

    function handleCardClick(index: number) {
        if (selected.size === 10) {
            console.log('game over');
            return;
        }

        if (!selected.has(index)) {
            selected.add(index);
            setScore(score + 1);
        }
        else {
            setScore(score - 1);
        }

        console.log(selected)
    }

    return (
        <>
            <h2>Memory Game</h2>
            {selected.size !== 10 && (<div>Score: {score}</div>)}
            <div className='card-grid'>
                {selected.size !== 10 && getCards().map((index) => (
                    <Card key={index} index={index} onClick={handleCardClick}/>
                ))}
                {selected.size === 10 && (
                    <div>
                        <h2>Game Over</h2>
                        <h2>Score: {score}</h2>
                    </div>
                )}
            </div>
        </>
    )
}

export default App;
