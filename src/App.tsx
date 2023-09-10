import React, {useState} from 'react';
import './styles/app.css';
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
    if (used === choices) {
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
    }

    function handleDifficultyChange(level: string) {
        setLevel(level);
        n = (difficulties.get(level) as number[])[0];
        choices = (difficulties.get(level) as number[])[1];
        selected.clear();
        setScore(0);
    }

    function restart() {
        selected.clear();
        setScore(0);
    }

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
                    {selected.size !== n && getCards().map((index) => (
                        <Card key={index} index={index} onClick={handleCardClick}/>
                    ))}
                    {selected.size === n && (
                        <div className="game-over">
                            <h2>Game Over</h2>
                            <h2>Score: {score}</h2>
                            <button className="restart" onClick={restart}>↻</button>
                        </div>
                    )}
                </div>
            </CardProvider>
        </>
    )
}

export default App;