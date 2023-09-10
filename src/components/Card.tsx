import {useEffect, useState} from 'react';
import {pokemons, pokemonUrl} from '../pokemons';
import '../styles/Card.css';
import backside from '../assets/images/cardback.png';
import {useCardContext} from "../Context";

interface CardProps {
    index: number;
    onClick: (index: number) => void;
}

export default function Card({index, onClick}: CardProps) {
    const pokeId: number = pokemons[index];
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const {isFlipped, toggleFlip} = useCardContext();

    useEffect(() => {
        setTimeout(() => {
            if (isFlipped) {
                toggleFlip();
            }
        }, 800);

        fetch(pokemonUrl(pokeId))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                setName((data.name).toUpperCase());
                setImage(data.sprites.other['official-artwork'].front_default)
            })
    });

    function handleClick() {
        toggleFlip();

        setTimeout(() => {
            onClick(index);
        }, 500);
    }

    return (
        <div onClick={handleClick} className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-inner">
                <div className='card-front'>
                    <img src={image} className='card-img'/>
                    <div className='card-text'>{name}</div>
                </div>
                <div className='card-back'>
                    <img src={backside}/>
                </div>
            </div>
        </div>
    )
}

