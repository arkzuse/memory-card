const imgPath: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

const getImgPath = (id: number): string => {
    return `${imgPath}${id}.png`
}

const pokemons : number[] = [
    1, 4, 7, 10, 13, 16, 19, 21, 23, 25
]

export { pokemons, getImgPath }