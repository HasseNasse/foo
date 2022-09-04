import { useEffect, useRef, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import '../index.css';

export interface Pokemon {
  name: string;
  id: number;
  img?: string;
  type?: string;
  stat?: number;
  hp?: number;
  attack?: number;
  ability1?: any;
  ability2?: any;
}

function MainPage() {
  const url: string = 'https://pokeapi.co/api/v2/pokemon/';
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [allPokemons, setAllPokemons] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllPokemons = async () => {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      await createPokemonObject(data.results);
      setLoading(false);
    } catch (error) {
      throw new Error('Error while fetching the data');
    }
  };

  const createPokemonObject = async (results: Pokemon[]) => {
    results.forEach(async () => {
      try {
        const response = await fetch(`${url}${inputValue.toLocaleLowerCase()}`);
        const data = await response.json();
        setAllPokemons([data]);
      } catch (error) {
        throw new Error("Couldn't find what you searched for");
      }
    });
  };

  useEffect(() => {
    !loading && getAllPokemons();
    autoFocus();
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    setInputValue(currentValue.trim());
  };

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputValue && getAllPokemons();
    clearInput();
    autoFocus();
  };

  const capitalizeFirstLetter = (string: string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const clearInput = () => (inputRef.current!.value = '');

  const autoFocus = () => {
    inputRef.current!.focus();
  };

  return (
    <div className="app-container">
      <h1>PokeDex</h1>
      <div className="pokemon-container">
        <div className="all-containers">
          {allPokemons.map((pokemon: any) =>
            !loading ? (
              <PokemonCard
                name={capitalizeFirstLetter(pokemon.name)}
                id={pokemon.id}
                img={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types?.[0].type.name}
                hp={pokemon.stats?.[0].base_stat}
                attack={pokemon.stats?.[1].base_stat}
                ability1={capitalizeFirstLetter(
                  pokemon.abilities?.[0].ability.name
                )}
                ability2={capitalizeFirstLetter(
                  pokemon.abilities?.[1].ability.name
                )}
                key={pokemon.id}
              />
            ) : (
              <p className="error-message">Loading...</p>
            )
          )}
        </div>
        {!inputValue ? (
          <p className="error-message">Please enter a Pokemon name or id</p>
        ) : (
          ''
        )}
        {}
        <form action="" onSubmit={(e) => e.preventDefault()} className="form">
          <input
            className="search-field"
            type="text"
            placeholder="Search for a pokemon"
            onChange={handleChange}
            maxLength={100}
            ref={inputRef}
          />
          <button className="search-button" onClick={handleClick} type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainPage;
