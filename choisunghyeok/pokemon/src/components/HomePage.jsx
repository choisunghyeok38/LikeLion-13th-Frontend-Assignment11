// HomePage.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PokemonCard from "./PokemonCard";

function HomePage() {
  const [search, setSearch] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { data: pokemonList = [], isLoading, isFetching } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=151`);
      return response.data.results;
    },
  });

  const filtered = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 font-pretendard ">포켓몬 도감</h1>

      <input
        type="text"
        placeholder="포켓몬 이름 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border  border-gray-400 rounded-lg p-2 w-60 mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-pretandard"
      />

      {isLoading || isFetching ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={60} color="#3b4cca" />
        </div>
      ) : (
        <ul className="grid gird-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-8 bg-slate-50 rounded-2xl font-pretendard">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon}  className=""/>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;