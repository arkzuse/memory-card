import {useEffect, useState} from 'react';
import {pokemons, pokemonUrl} from '../pokemons';
import '../styles/Card.css';

interface CardProps {
    index: number;
    onClick: (index: number) => void;
}

export default function Card({index, onClick}: CardProps) {
    const pokeId: number = pokemons[index];
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');

    useEffect(() => {
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
    })

    return (
        <div onClick={() => onClick(index)} className='card'>
            <img src={image} alt={"pokemon"} className='card-img'/>
            <div className='card-text'>{name}{index}</div>
        </div>
    )
}

