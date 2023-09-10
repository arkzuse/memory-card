import React, {useState} from 'react';
import './App.css';
import Card from "./components/Card";
import {CardProvider} from "./Context";
import DifficultySelector from "./components/DifficultySelector";

const selected = new Set<number>();
const difficulties: Map<string, number[]> = new Map<string, number[]>([
    ['easy', [10, 5]],
    ['medium', [15, 6]],
    ['hard', [20, 7]]
]);
let n = (difficulties.get('easy') as number[])[0];
let choices = (difficulties.get('easy') as number[])[1];

function getCards() {
    const cards: number[] = [];

    while (cards.length < choices) {
        const random = Math.floor(Math.random() * n);
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
        const remove = Math.floor(Math.random() * choices);

        while (true) {
            const newCard = Math.floor(Math.random() * n);

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
    const [level, setLevel] = useState('easy');
    const [cards, setCards] = useState(getCards());

    function handleCardClick(index: number) {
        if (selected.size === n) {
            console.log('game over');
            return;
        }

        if (!selected.has(index)) {
            selected.add(index);
            setScore(score + 1);
        } else {
            setScore(score - 1);
        }

        setCards(getCards());

        console.log(selected)
    }

    function handleDifficultyChange(level: string) {
        setLevel(level);
        n = (difficulties.get(level) as number[])[0];
        choices = (difficulties.get(level) as number[])[1];
        selected.clear();
        setScore(0);
        setCards(getCards());
    }

    console.log(cards)


    return (
        <>
            <header>
                <h1>Memory Card</h1>
            </header>
            <div className="info">
                {selected.size !== n && (<div>Score: {score}</div>)}
                <DifficultySelector difficulties={Array.from(difficulties.keys())} level={level}
                                    handleChange={handleDifficultyChange}/>
            </div>
            <CardProvider>
                <div className='card-grid'>
                    {selected.size !== n && cards.map((index) => (
                        <Card key={index} index={index} onClick={handleCardClick}/>
                    ))}
                    {selected.size === n && (
                        <div>
                            <h2>Game Over</h2>
                            <h2>Score: {score}</h2>
                        </div>
                    )}
                </div>
            </CardProvider>
        </>
    )
}

export default App;