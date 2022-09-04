import { Pokemon } from '../pages/MainPage';
import '../index.css';

const PokemonCards = ({ ...pokemon }: Pokemon): JSX.Element => {
  const backgroundStyle = pokemon.type + ' card-container';

  return (
    <div className={backgroundStyle}>
      <div className="pokemon-stats">
        <p className="pokemon-hp">🩸HP {pokemon.hp}</p>
        <p className="pokemon-attack">💥Attack {pokemon.attack}</p>
      </div>
      <div className="number">
        <small>#{pokemon?.id}</small>
      </div>
      <img src={pokemon?.img} alt={pokemon.name} />
      <div className="detail-wrapper">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <small className="type-icon">Type - {pokemon?.type}</small>
      </div>
      <div className="pokemon-abilities">
        <ul>
          ✨Abilities
          <em>
            <li>*{pokemon?.ability1}</li>
            <li>*{pokemon?.ability2}</li>
          </em>
        </ul>
      </div>
    </div>
  );
};

export default PokemonCards;
