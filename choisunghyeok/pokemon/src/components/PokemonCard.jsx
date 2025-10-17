// PokemonCard.jsx
import { Link } from "react-router-dom";

function getIdFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

function PokemonCard({ pokemon }) {
  const id = getIdFromUrl(pokemon.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="flex justify-center">
      <Link 
        to={`/pokemon/${pokemon.name}`}
        className="flex flex-col items-center bg-slate-50 border border-gray-400 rounded-xl shadow-md p-4
                    hover:scale-105 transition-transform duration-200 w-40">
        <img src={imageUrl} alt={pokemon.name} className="w-25 h-25 mb-2"/>
        <div className="text-center capitalize text-sm">{pokemon.name}</div>
      </Link>
    </div>
  );
}

export default PokemonCard;