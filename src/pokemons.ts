const pokeAPI: string = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonUrl = (id: number): string => {
    return `${pokeAPI}${id}`;
}

const pokemons : number[] = [
    1, 4, 7, 10, 13, 16, 19, 21, 23, 25
];

const pokemonCount: number = pokemons.length;

export { pokemons, pokemonUrl, pokemonCount };